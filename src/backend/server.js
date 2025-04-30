import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';

const app = express();
const PORT = 5000;

// Enable CORS
app.use(cors());

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware to parse JSON
app.use(express.json());

// Path to the users.json file
const usersFilePath = path.join(__dirname, '..', 'jsonFiles', 'users.json');

// Endpoint to add a new user
app.post('/api/users', (req, res) => {
    const newUser = req.body;

    console.log(newUser);

    // Read the existing users from the file
    fs.readFile(usersFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Error reading users file' });
        }

        const users = JSON.parse(data);
        users.push(newUser); // Add the new user to the array

        // Write the updated users back to the file
        fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Error writing to users file' });
            }

            res.status(201).json({ message: 'User added successfully' });
        });
    });
});

// Endpoint to handle user login
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    // Read the existing users from the file
    fs.readFile(usersFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Error reading users file' });
        }

        let users = [];
        try {
            users = JSON.parse(data) || [];
        } catch (parseError) {
            console.error('Error parsing users file:', parseError);
            return res.status(500).json({ message: 'Invalid users file format' });
        }

        // Find the user with the matching email and password
        const user = users.find((u) => u.email === email && u.password === password);

        if (user) {
            res.status(200).json({ message: 'Login successful', user });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});