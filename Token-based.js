// Token-based

// Token-based security entails two parts: authentication and authorization. 
//Authentication is the process of providing credentials and 
//obtaining a token that proves the user's credentials. 
//Authorization refers to the process of using that token so the 
//resource server knows which resources the user should have access to.

// Token-based Authentication
// Token-based authentication uses access tokens to validate users. An access token is a small piece of code 
//that contains information about the user, their permissions, groups, and expirations that get passed from 
//a server to the client. An ID token is an artifact that proves that the user has been authenticated.

// The token contains three parts, the header, the payload, and the signature. The header contains information about the type 
//of token and the algorithm used to create it. The payload contains user attributes, called claims, such as permissions, groups, 
//and expirations. The signature verifies the token's integrity, meaning that the token hasn’t changed during transit. 
//A JSON web token, pronounced "jot" but spelled JWT, is an internet standard for creating encrypted payload data in JSON format.

// A user's browser makes a call to an authentication server and gets access to a web application. 
//The authentication server then passes back an ID token which is stored by the client as an encrypted cookie. 
//The ID token is then passed to the app on the web server as proof that the user has been authenticated.

// Token-based Authorization

// The authorization process gets executed when the web application wants to access a resource, for example, 
// an API that is protected from unauthorized access. The user authenticates against the Authorization server. 
// The Authorization server creates an access token (note that the ID token and access token are two separate objects) 
// and sends the access token back to the client, where the access token is stored. Then when the user makes requests or resources, 
// the token is passed to the resource, also called an API server. The token gets passed with every HTTP request. 
// The token contains embedded information about the user's permissions without the need to access those permissions from
//  the authorization server. Even if the token is stolen, the hacker doesn't have access to the user's credentials because the token is encrypted.

// Below is a code snippet demonstrating Token-based Authentication in an Express application:

const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
const secretKey = 'your-secret-key'; // Replace with a strong secret key
// POST endpoint for user login and JWT generation
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  // Simulated user authentication
  if (username === 'user' && password === 'password') {
    // Generate JWT with username payload
    const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
    res.json({ token }); // Send token as JSON response
  } else {
    res.send('Invalid credentials');
  }
});
// GET endpoint to access protected resource (dashboard)
app.get('/dashboard', (req, res) => {
  // Get token from Authorization header
  const token = req.headers['authorization'];
  if (token) {
    // Verify JWT token
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        res.send('Invalid token');
      } else {
        // Token is valid, send welcome message with username
        res.send(`Welcome ${decoded.username}`);
      }
    });
  } else {
    res.send('Token missing');
  }
});
// Start server
app.listen(3000, () => console.log('Server running on port 3000'));

// Explanation:
// Express Setup: Configures an Express application with middleware like body-parser to parse JSON requests.
// JWT Generation (/login): Handles POST requests for user login. If credentials are valid, it generates a JWT (token) 
// containing the username (jwt.sign({ username }, secretKey, { expiresIn: '1h' })).
// JWT Verification (/dashboard): Checks for a JWT in the Authorization header of incoming requests 
// (const token = req.headers['authorization']). If present, it verifies the token (jwt.verify(token, secretKey)) 
// and extracts the username (decoded.username) to grant access.