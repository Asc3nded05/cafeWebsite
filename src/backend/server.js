// Importing necessary components and libraries for the backend server
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
// Path to the blog.json file
const blogFilePath = path.join(__dirname, '..', 'jsonFiles', 'blog.json');
// Path to the menuData.json file
const menuFilePath = path.join(__dirname, '..', 'jsonFiles', 'menuData.json')
// Path to the orders.json file
const ordersFilePath = path.join(__dirname, '..', 'jsonFiles', 'orders.json');
// Path to the messages.json file
const messagesFilePath = path.join(__dirname, '..', 'jsonFiles', 'messages.json');

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
    const userEmail = newUser.email.toLowerCase();
    const plainTextPassword = newUser.password;

    // Read existing users
    const users = readUsers();

    // Check if the email already exists
    const emailExists = users.some(user => user.email.toLowerCase() === userEmail);

    if (emailExists) {
        return res.status(409).json({ message: 'Email address is already registered.' });
    }

    try {
        // Hash Password
        const hashedPassword = await bcrypt.hash(plainTextPassword, SALT_ROUNDS);
        newUser.password = hashedPassword;

        // Determine the next available ID
        const nextId = users.reduce((maxId, user) => Math.max(maxId, user.id || 0), 0) + 1;
        newUser.id = nextId; // Assign the new ID to the user

        users.push(newUser); // Add the new user to the array

        // Write the updated users back to the file
        fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Error writing to users file' });
            }

            // Generate a JWT token for the new user
            const payload = {
                userId: newUser.id,
                email: newUser.email,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                role: newUser.role,
            };

            const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

            res.status(201).json({
                message: 'User added successfully',
                token,
                user: {
                    id: newUser.id,
                    firstName: newUser.firstName,
                    lastName: newUser.lastName,
                    email: newUser.email,
                    role: newUser.role,
                },
            });
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

// Endpoint to retrieve blog posts
app.get('/api/blog', (req, res) => {
    // Read the existing blog posts from the file
    fs.readFile(blogFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading blog file:', err);
            return res.status(500).json({ message: 'Error reading blog file' });
        }

        const blogPosts = JSON.parse(data);
        res.status(200).json(blogPosts);
    });
});

// Endpoint to create a new blog post
app.post('/api/blog/create', (req, res) => {
    const newPost = req.body;
    console.log(newPost);
    // Read the existing blog posts from the file
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
    const userId = req.body.userId;

    // Read the existing blog posts from the file
    fs.readFile(blogFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading blog file:', err);
            return res.status(500).json({ message: 'Error reading blog file' });
        }

        let blogPosts = JSON.parse(data);
        const post = blogPosts.find(post => post.id === postId);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Check if the user is in the dislikedBy array and remove them
        if (post.dislikedBy.includes(userId)) {
            post.dislikedBy = post.dislikedBy.filter(id => id !== userId);
            post.dislikes -= 1; // Decrement dislikes count
        }

        // Add the user to the likedBy array if not already present
        if (!post.likedBy.includes(userId)) {
            post.likedBy.push(userId);
            post.likes += 1; // Increment likes count
        }

        fs.writeFile(blogFilePath, JSON.stringify(blogPosts, null, 2), (err) => {
            if (err) {
                console.error('Error writing blog file:', err);
                return res.status(500).json({ message: 'Error writing blog file' });
            }

            res.status(200).json({ message: 'Post liked successfully', post });
        });
    });
});

// Endpoint to dislike a blog post
app.put('/api/blog/dislike/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    const userId = req.body.userId;

    // Read the existing blog posts from the file
    fs.readFile(blogFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading blog file:', err);
            return res.status(500).json({ message: 'Error reading blog file' });
        }

        let blogPosts = JSON.parse(data);
        const post = blogPosts.find(post => post.id === postId);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Check if the user is in the likedBy array and remove them
        if (post.likedBy.includes(userId)) {
            post.likedBy = post.likedBy.filter(id => id !== userId);
            post.likes -= 1; // Decrement likes count
        }

        // Add the user to the dislikedBy array if not already present
        if (!post.dislikedBy.includes(userId)) {
            post.dislikedBy.push(userId);
            post.dislikes += 1; // Increment dislikes count
        }

        fs.writeFile(blogFilePath, JSON.stringify(blogPosts, null, 2), (err) => {
            if (err) {
                console.error('Error writing blog file:', err);
                return res.status(500).json({ message: 'Error writing blog file' });
            }

            res.status(200).json({ message: 'Post disliked successfully', post });
        });
    });
});

// Endpoint to remove a like from a blog post
app.put('/api/blog/unlike/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    const userId = req.body.userId;

    // Read the existing blog posts from the file
    fs.readFile(blogFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading blog file:', err);
            return res.status(500).json({ message: 'Error reading blog file' });
        }

        let blogPosts = JSON.parse(data);
        const post = blogPosts.find(post => post.id === postId);
        const postIndex = blogPosts.findIndex(post => post.id === postId);

        if (postIndex === -1) {
            return res.status(404).json({ message: 'Post not found' });
        }

        post.likedBy = post.likedBy.filter(id => id !== userId);
        if (post.likedBy.includes(userId)) {
            post.likes -= 1;
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

// Endpoint to remove a dislike from a blog post
app.put('/api/blog/undislike/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    const userId = req.body.userId;

    // Read the existing blog posts from the file
    fs.readFile(blogFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading blog file:', err);
            return res.status(500).json({ message: 'Error reading blog file' });
        }

        let blogPosts = JSON.parse(data);
        const post = blogPosts.find(post => post.id === postId); 
        const postIndex = blogPosts.findIndex(post => post.id === postId);
        
        if (postIndex === -1) {
            return res.status(404).json({ message: 'Post not found' });
        }

        post.dislikedBy = post.dislikedBy.filter(id => id !== userId);
        if (post.dislikedBy.includes(userId)) {
            post.dislikes -= 1;
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

// Endpoint to delete a blog post
app.delete('/api/blog/delete/:id', (req, res) => {
    const postId = req.params.id;

    // Read the existing blog posts from the file
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

// Endpoint to retrieve the menu items
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

// Endpoint to update a menu item
app.put('/api/menu/update/:id', (req, res) => {
    const itemId = parseInt(req.params.id); // Parse the item ID from the URL
    const updatedItem = req.body; // Get the updated item data from the request body

    // Read the existing menu items from the file
    fs.readFile(menuFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading menu file:', err);
            return res.status(500).json({ message: 'Error reading menu file' });
        }

        let menuData = JSON.parse(data);
        let itemFound = false;

        // Iterate through each category to find and update the item
        menuData.forEach((category) => {
            const itemIndex = category.items.findIndex((item) => item.id === itemId);
            if (itemIndex !== -1) {
                // Update the item
                category.items[itemIndex] = { ...category.items[itemIndex], ...updatedItem };
                itemFound = true;
            }
        });

        if (!itemFound) {
            return res.status(404).json({ message: 'Item not found' });
        }

        // Write the updated menu data back to the file
        fs.writeFile(menuFilePath, JSON.stringify(menuData, null, 2), (err) => {
            if (err) {
                console.error('Error writing menu file:', err);
                return res.status(500).json({ message: 'Error writing menu file' });
            }

            res.status(200).json({ message: 'Item updated successfully' });
        });
    });
});

// Endpoint to create a new menu item
app.post('/api/menu/create', (req, res) => {
    const newItem = req.body;

    // Read the existing menu items from the file
    fs.readFile(menuFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading menu file:', err);
            return res.status(500).json({ message: 'Error reading menu file' });
        }

        let menuData = JSON.parse(data);

        // Find the category to which the new item should be added
        const category = menuData.find((cat) => cat.category === newItem.category);

        if (!category) {
            return res.status(400).json({ message: 'Category not found' });
        }

        // Generate a unique ID for the new item
        const nextId = menuData.reduce((maxId, cat) => {
            const categoryMaxId = cat.items.reduce((maxItemId, item) => Math.max(maxItemId, item.id || 0), 0);
            return Math.max(maxId, categoryMaxId);
        }, 0) + 1;

        // Add the new item to the category's items array
        const itemToAdd = {
            id: nextId,
            title: newItem.title,
            price: parseFloat(newItem.price),
            selectBagel: newItem.selectBagel || false,
            selectButterOrJelly: newItem.selectButterOrJelly || false,
            selectToasted: newItem.selectToasted || false,
            selectCreamCheese: newItem.selectCreamCheese || false,
            selectMultipleBagels: newItem.selectMultipleBagels || false,
            selectSandwichToppings: newItem.selectSandwichToppings || false,
            selectSausageBaconOrHam: newItem.selectSausageBaconOrHam || false,
            selectWrapOrPanini: newItem.selectWrapOrPanini || false,
            selectDrinkFlavor: newItem.selectDrinkFlavor || false,
            selectSmoothieFlavor: newItem.selectSmoothieFlavor || false,
        };

        category.items.push(itemToAdd);

        // Write the updated menu data back to the file
        fs.writeFile(menuFilePath, JSON.stringify(menuData, null, 2), (err) => {
            if (err) {
                console.error('Error writing menu file:', err);
                return res.status(500).json({ message: 'Error writing menu file' });
            }

            res.status(201).json({ message: 'Menu item created successfully', item: itemToAdd });
        });
    });
});

//Endpoint to delete a menu item
app.delete('/api/menu/delete/:id', (req, res) => {
    const itemId = parseInt(req.params.id); // Parse the item ID from the URL

    // Read the existing menu items from the file
    fs.readFile(menuFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading menu file:', err);
            return res.status(500).json({ message: 'Error reading menu file' });
        }

        let menuData = JSON.parse(data);
        let itemFound = false;

        // Iterate through each category to find and delete the item
        menuData.forEach((category) => {
            const itemIndex = category.items.findIndex((item) => item.id === itemId);
            if (itemIndex !== -1) {
                category.items.splice(itemIndex, 1); // Remove the item from the array
                itemFound = true;
            }
        });

        if (!itemFound) {
            return res.status(404).json({ message: 'Item not found' });
        }

        // Write the updated menu data back to the file
        fs.writeFile(menuFilePath, JSON.stringify(menuData, null, 2), (err) => {
            if (err) {
                console.error('Error writing menu file:', err);
                return res.status(500).json({ message: 'Error writing menu file' });
            }

            res.status(200).json({ message: 'Item deleted successfully' });
        });
    });
});

// Endpoint to create a new order
app.post('/api/orders', (req, res) => {
    const newOrder = req.body;

    // Read the existing orders from the file
    fs.readFile(ordersFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading orders file:', err);
            return res.status(500).json({ message: 'Error reading orders file' });
        }

        let orders = JSON.parse(data);

        // Determine the next available order ID
        const nextOrderId = orders.reduce((maxId, order) => Math.max(maxId, order.orderId || 0), 0) + 1;
        newOrder.orderId = nextOrderId; // Assign the new ID to the order

        // Add the new order to the array
        orders.push(newOrder);

        // Write the updated orders back to the file
        fs.writeFile(ordersFilePath, JSON.stringify(orders, null, 2), (err) => {
            if (err) {
                console.error('Error writing orders file:', err);
                return res.status(500).json({ message: 'Error writing orders file' });
            }

            res.status(201).json({ message: 'Order created successfully', orderId: nextOrderId });
        });
    });
});

// Endpoint to retrieve all the orders
app.get('/api/orders', (req, res) => {
    // Read the existing orders from the file
    fs.readFile(ordersFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading menu file:', err);
            return res.status(500).json({ message: 'Error reading menu file' });
        }

        const menuItems = JSON.parse(data);
        res.status(200).json(menuItems);
    });
});

// Endpoint to mark an order as complete
app.put('/api/orders/complete/:id', (req, res) => {
    const orderId = parseInt(req.params.id); // Parse the order ID from the URL

    // Read the orders from the JSON file
    fs.readFile(ordersFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading orders file:', err);
            return res.status(500).json({ message: 'Error reading orders file' });
        }

        let orders = JSON.parse(data);
        const orderIndex = orders.findIndex((order) => order.orderId === orderId);

        if (orderIndex === -1) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Mark the order as completed
        orders[orderIndex].completed = true;

        // Write the updated orders back to the file
        fs.writeFile(ordersFilePath, JSON.stringify(orders, null, 2), (err) => {
            if (err) {
                console.error('Error writing orders file:', err);
                return res.status(500).json({ message: 'Error writing orders file' });
            }

            res.status(200).json({ message: 'Order marked as completed' });
        });
    });
});

// Endpoint to retrieve all of the contact messages
app.get('/api/contact/messages', (req, res) => {   
    // Read the messages from the JSON file
    fs.readFile(messagesFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading messages file:', err);
            return res.status(500).json({ message: 'Error reading messages file' });
        }

        const messages = JSON.parse(data);
        res.status(200).json(messages);
    });
});

// Endpoint to send a new contact message
app.post('/api/contact/sendMessage', (req, res) => {
    const newMessage = req.body;
    console.log(newMessage);
    // Read the existing messages from the file
    fs.readFile(messagesFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading blog file:', err);
            return res.status(500).json({ message: 'Error reading blog file' });
        }

        let messages = JSON.parse(data);

        // Determine the next available ID
        const nextId = messages.reduce((maxId, message) => Math.max(maxId, message.id || 0), 0) + 1;
        newMessage.id = nextId; // Assign the new ID to the message

        // Add the new message to the array
        messages.push(newMessage);

        // Write the updated messages back to the file
        fs.writeFile(messagesFilePath, JSON.stringify(messages, null, 2), (err) => {
            if (err) {
                console.error('Error writing blog file:', err);
                return res.status(500).json({ message: 'Error writing blog file' });
            }

            res.status(201).json({ message: 'Message sent successfully' });
        });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});