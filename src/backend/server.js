import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const app = express();
const PORT = 5000;
const SALT_ROUNDS = 10; //number of salt rounds for bcrypt
const JWT_SECRET = process.env.JWT_SECRET || 'your-fallback-secret-key';

// Enable CORS
app.use(cors());

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware to parse JSON
app.use(express.json());

// Path to the users.json file
const usersFilePath = path.join(__dirname, '..', 'jsonFiles', 'users.json');

// Function to read users from the file
const readUsers = () => {
    try {
        const data = fs.readFileSync(usersFilePath, 'utf8');
        return JSON.parse(data) || [];
    } catch (err) {
        console.error('Error reading users file:', err);
        return [];
    }
};

// Endpoint to add a new user
app.post('/api/users', async (req, res) => {
    const newUser = req.body;
    console.log(newUser);
    const userEmail = newUser.email.toLowerCase();
    console.log(userEmail)
    const plainTextPassword = newUser.password;

    // Read existing users
    const users = readUsers();

    // Check if the email already exists
    const emailExists = users.some(user => user.email.toLowerCase() === userEmail);

    if (emailExists) {
        return res.status(409).json({ message: 'Email address is already registered.' });
    }

    try {
        //Hash Password

        const hashedPassword = await bcrypt.hash(plainTextPassword, SALT_ROUNDS);
        newUser.password = hashedPassword;


        //Determines the next available ID
        const nextId = users.reduce((maxId, user) => Math.max(maxId, user.id || 0), 0) + 1;
        newUser.id = nextId; // Assign the new ID to the user

        users.push(newUser); // Add the new user to the array

        // Write the updated users back to the file
        fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Error writing to users file' });
            }

            res.status(201).json({ message: 'User added successfully' });
        });
    } catch (error) {
        console.error('Error hashing password:', error);
        res.status(500).json({ message: 'Error during registration.' });
    }
});

// Endpoint to handle user login
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    // Read the existing users from the file
    fs.readFile(usersFilePath, 'utf8', async (err, data) => {
        const users = readUsers();

        const user = users.find(u => u.email && u.email.toLowerCase() === email.toLowerCase());

        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        try {
            // Compare the provided password with the hashed password
            const passwordMatch = await bcrypt.compare(password, user.password);

            if (passwordMatch) {
                // Create a JWT payload (contains user information)
                const payload = {
                    userId: user.id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    role: user.role,
                };

                // Generate the JWT
                const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' }); // Token expires in 1 hour

                res.status(200).json({ message: 'Login successful', token, user: { id: user.id, firstName: user.firstName, lastName: user.lastName, email: user.email } });
            }
         else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        console.error('Error comparing passwords:', error);
        res.status(500).json({ message: 'Error during login.' });
    }
});
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});