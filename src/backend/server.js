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

const blogFilePath = path.join(__dirname, '..', 'jsonFiles', 'blog.json');

const menuFilePath = path.join(__dirname, '..', 'jsonFiles', 'menuData.json')

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

                res.status(200).json({ message: 'Login successful', token, user: { id: user.id, firstName: user.firstName, lastName: user.lastName, email: user.email, role: user.role } });
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

app.get('/api/blog', (req, res) => {
    // Read the blog posts from the JSON file
    fs.readFile(blogFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading blog file:', err);
            return res.status(500).json({ message: 'Error reading blog file' });
        }

        const blogPosts = JSON.parse(data);
        res.status(200).json(blogPosts);
    });
});

app.post('/api/blog/create', (req, res) => {
    const newPost = req.body;
    console.log(newPost);
    // Read the blog posts from the JSON file
    fs.readFile(blogFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading blog file:', err);
            return res.status(500).json({ message: 'Error reading blog file' });
        }

        let blogPosts = JSON.parse(data);

        // Determine the next available ID
        const nextId = blogPosts.reduce((maxId, post) => Math.max(maxId, post.id || 0), 0) + 1;
        newPost.id = nextId; // Assign the new ID to the post

        blogPosts.push(newPost); // Add the new post to the array

        // Write the updated blog posts back to the file
        fs.writeFile(blogFilePath, JSON.stringify(blogPosts, null, 2), (err) => {
            if (err) {
                console.error('Error writing blog file:', err);
                return res.status(500).json({ message: 'Error writing blog file' });
            }

            res.status(201).json({ message: 'Post created successfully' });
        });
    });
});

// Endpoint to update a blog post
app.put('/api/blog/update/:id', (req, res) => {
    const postId = parseInt(req.params.id); // Get the ID from the URL
    const updatedPost = req.body; // Get the updated post data from the request body

    // Read the existing blog posts from the file
    fs.readFile(blogFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading blog file:', err);
            return res.status(500).json({ message: 'Error reading blog file' });
        }

        let blogPosts = [];
        try {
            blogPosts = JSON.parse(data); // Parse the JSON data
        } catch (parseError) {
            console.error('Error parsing blog file:', parseError);
            return res.status(500).json({ message: 'Error parsing blog file' });
        }

        // Find the index of the blog post to update
        const postIndex = blogPosts.findIndex((post) => post.id === postId);
        if (postIndex === -1) {
            return res.status(404).json({ message: 'Blog post not found' });
        }

        // Update the blog post
        blogPosts[postIndex] = { ...blogPosts[postIndex], ...updatedPost };

        // Write the updated blog posts back to the file
        fs.writeFile(blogFilePath, JSON.stringify(blogPosts, null, 2), (err) => {
            if (err) {
                console.error('Error writing to blog file:', err);
                return res.status(500).json({ message: 'Error writing to blog file' });
            }

            res.status(200).json({ message: 'Blog post updated successfully' });
        });
    });
});

// Endpoint to like a blog post
app.put('/api/blog/like/:id', (req, res) => {
    const postId = parseInt(req.params.id);

    // Read the blog posts from the JSON file
    fs.readFile(blogFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading blog file:', err);
            return res.status(500).json({ message: 'Error reading blog file' });
        }

        let blogPosts = JSON.parse(data);

        // Find the blog post by ID
        const postIndex = blogPosts.findIndex(post => post.id === postId);
        if (postIndex === -1) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Increment the likes count
        blogPosts[postIndex].likes += 1;

        // Write the updated blog posts back to the file
        fs.writeFile(blogFilePath, JSON.stringify(blogPosts, null, 2), (err) => {
            if (err) {
                console.error('Error writing blog file:', err);
                return res.status(500).json({ message: 'Error writing blog file' });
            }

            res.status(200).json({ message: 'Post liked successfully', post: blogPosts[postIndex] });
        });
    });
});

// Endpoint to dislike a blog post
app.put('/api/blog/dislike/:id', (req, res) => {
    const postId = parseInt(req.params.id);

    // Read the blog posts from the JSON file
    fs.readFile(blogFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading blog file:', err);
            return res.status(500).json({ message: 'Error reading blog file' });
        }

        let blogPosts = JSON.parse(data);

        // Find the blog post by ID
        const postIndex = blogPosts.findIndex(post => post.id === postId);
        if (postIndex === -1) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Increment the dislikes count
        blogPosts[postIndex].dislikes += 1;

        // Write the updated blog posts back to the file
        fs.writeFile(blogFilePath, JSON.stringify(blogPosts, null, 2), (err) => {
            if (err) {
                console.error('Error writing blog file:', err);
                return res.status(500).json({ message: 'Error writing blog file' });
            }

            res.status(200).json({ message: 'Post disliked successfully', post: blogPosts[postIndex] });
        });
    });
});

// Endpoint to remove a like
app.put('/api/blog/unlike/:id', (req, res) => {
    const postId = parseInt(req.params.id);

    fs.readFile(blogFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading blog file:', err);
            return res.status(500).json({ message: 'Error reading blog file' });
        }

        let blogPosts = JSON.parse(data);
        const postIndex = blogPosts.findIndex(post => post.id === postId);
        if (postIndex === -1) {
            return res.status(404).json({ message: 'Post not found' });
        }

        blogPosts[postIndex].likes = Math.max(0, blogPosts[postIndex].likes - 1);

        fs.writeFile(blogFilePath, JSON.stringify(blogPosts, null, 2), (err) => {
            if (err) {
                console.error('Error writing blog file:', err);
                return res.status(500).json({ message: 'Error writing blog file' });
            }

            res.status(200).json({ message: 'Like removed successfully', post: blogPosts[postIndex] });
        });
    });
});

// Endpoint to remove a dislike
app.put('/api/blog/undislike/:id', (req, res) => {
    const postId = parseInt(req.params.id);

    fs.readFile(blogFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading blog file:', err);
            return res.status(500).json({ message: 'Error reading blog file' });
        }

        let blogPosts = JSON.parse(data);
        const postIndex = blogPosts.findIndex(post => post.id === postId);
        if (postIndex === -1) {
            return res.status(404).json({ message: 'Post not found' });
        }

        blogPosts[postIndex].dislikes = Math.max(0, blogPosts[postIndex].dislikes - 1);

        fs.writeFile(blogFilePath, JSON.stringify(blogPosts, null, 2), (err) => {
            if (err) {
                console.error('Error writing blog file:', err);
                return res.status(500).json({ message: 'Error writing blog file' });
            }

            res.status(200).json({ message: 'Dislike removed successfully', post: blogPosts[postIndex] });
        });
    });
});

app.delete('/api/blog/delete/:id', (req, res) => {
    const postId = req.params.id;

    // Read the blog posts from the JSON file
    fs.readFile(blogFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading blog file:', err);
            return res.status(500).json({ message: 'Error reading blog file' });
        }

        let blogPosts = JSON.parse(data);

        // Find the index of the post to delete
        const postIndex = blogPosts.findIndex(post => post.id === parseInt(postId));

        if (postIndex === -1) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Remove the post from the array
        blogPosts.splice(postIndex, 1);

        // Write the updated blog posts back to the file
        fs.writeFile(blogFilePath, JSON.stringify(blogPosts, null, 2), (err) => {
            if (err) {
                console.error('Error writing blog file:', err);
                return res.status(500).json({ message: 'Error writing blog file' });
            }

            res.status(200).json({ message: 'Post deleted successfully' });
        });
    });
});

app.get('/api/menu', (req, res) => {
    // Read the menu items from the JSON file
    fs.readFile(menuFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading menu file:', err);
            return res.status(500).json({ message: 'Error reading menu file' });
        }

        const menuItems = JSON.parse(data);
        res.status(200).json(menuItems);
    });
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});