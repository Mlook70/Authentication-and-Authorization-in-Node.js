// Authentication
// The authentication process confirms a user's identity using credentials by validating who they claim to be. Authentication assures an application's security by guaranteeing that only those with valid credentials can access the system. Authentication is the responsibility of an application's backend.

// Three popular authentication methods in Node.js include:

// Session-based
// Token-based
// Passwordless

// Authentication is the process of confirming a user's identity using credentials by validating who they claim to be.
// Session-based authentication uses credentials to create a session ID stored in a database and the client's browser. When the user logs out, the session ID is destroyed.
// Token-based authentication uses access tokens, often JWTs, that get passed between server and client with the data that is passed between the two.
// Passwordless authentication uses public/private key pairs to encrypt and decrypt data passed between client and server without the need for a password.


// Session-based
// Session-based authentication is the oldest form of authentication technology. Typically, the flow of a session is as follows:

// The user uses their credentials to log in.
// The login credentials are verified against the credentials in a database. The database is responsible for storing which resources can be accessed based on the session ID.
// The server creates a session with a session ID that is a unique encrypted string. The session ID is stored in the database.
// The session ID is also stored in the browser as a cookie.
// When the user logs out or a specified amount of time has passed, the session ID is destroyed on both the browser and the database.
// Below is a code snippet demonstrating session-based authentication in an Express application:

const express = require('express');
const session = require('express-session');
const app = express();
// Middleware to set up session management
app.use(session({
    secret: 'secret-key',      // Replace with a strong secret key
    resave: false,             // Whether to save the session data if there were no modifications
    saveUninitialized: true,   // Whether to save new but not modified sessions
    cookie: { secure: false }  // Set to true in production with HTTPS
}));
// POST endpoint for handling login
app.post('/login', (req, res) => {
const { username, password } = req.body;
// Simulated user authentication (replace with actual logic)
if (username === 'user' && password === 'password') {
req.session.user = username;  // Store user information in session
res.send('Logged in successfully');
} else {
res.send('Invalid credentials');
}
});
// GET endpoint for accessing dashboard
app.get('/dashboard', (req, res) => {
if (req.session.user) {
res.send(`Welcome ${req.session.user}`);  // Display welcome message with user's name
} else {
res.send('Please log in first');
}
});
// Start the server on port 3000
app.listen(3000, () => console.log('Server running on port 3000'));


// Explanation:
// Express Setup: This code sets up an Express application and configures session management using express-session.
// Session Configuration: express-session middleware is configured with a secret key (secret: 'secret-key') for encrypting the session data, and other options like resave and saveUninitialized.
// Login Endpoint (/login): Handles POST requests for user login. If the provided username and password match, it stores the username (req.session.user) in the session.
// Dashboard Endpoint (/dashboard): Checks if the user is authenticated (req.session.user exists). If authenticated, it welcomes the user; otherwise, it prompts them to log in.