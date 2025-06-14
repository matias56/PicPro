// server.js

// 1. Import necessary packages
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// 2. Initialize the Express app
const app = express();
const PORT = 3000; // The port our server will run on

// 3. Use middleware
app.use(cors()); // Allow cross-origin requests
app.use(bodyParser.json()); // Parse JSON bodies from incoming requests

// 4. Simulate a database
// In a real app, this would be a connection to a real database (e.g., MongoDB, PostgreSQL, Firebase).
// For now, we'll store users in an array.
let users = [];

// --- API Endpoints ---

// Endpoint for User Registration
app.post('/api/register', (req, res) => {
    // Get email and password from the request body
    const { email, password } = req.body;

    // Basic validation
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }

    // Check if the user already exists
    const userExists = users.find(user => user.email === email);
    if (userExists) {
        return res.status(409).json({ message: 'An account with this email already exists.' });
    }

    // Create and store the new user
    const newUser = { email, password }; // In a real app, you would HASH the password here
    users.push(newUser);

    console.log('User registered:', newUser);
    console.log('All users:', users);

    // Send a success response
    res.status(201).json({ message: 'Account created successfully!' });
});

// Endpoint for User Login
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }

    // Find the user in our simulated database
    const user = users.find(u => u.email === email);

    // Check if user exists and password matches
    if (!user || user.password !== password) {
        // Use a generic error for security
        return res.status(401).json({ message: 'Mail o contraseña incorrectos' });
    }

    // Send a success response
    res.status(200).json({ message: 'Login successful!' });
});

// Endpoint for Password Reset
app.post('/api/reset-password', (req, res) => {
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
        return res.status(400).json({ message: 'Email and new password are required.' });
    }

    // Find the user
    let user = users.find(u => u.email === email);

    if (!user) {
        return res.status(404).json({ message: 'No hay ninguna cuenta registrada con esa dirección.' });
    }

    // Update the user's password
    user.password = newPassword;

    console.log('Password reset for:', email);
    console.log('All users:', users);

    res.status(200).json({ message: 'Password has been updated successfully.' });
});


// 5. Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
