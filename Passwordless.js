// Passwordless
// With passwordless authentication, the user does not need login credentials, but rather, they gain access to the system by demonstrating
// they possess a factor that proves their identity. Common factors include biometrics such as a fingerprint, a "magic link" sent to 
//their email address, or a one-time passcode sent to a mobile device. Password recovery systems now commonly use passwordless authentication.

// Passwordless authentication is achieved using Public Key and Private Key Encryption. In this method, when a user registers for the app, 
//the user's device generates a private key/public key pair that utilizes a factor that proves their identity, as noted above.

// The public key is used to encrypt messages, and the private key is used to decrypt them. The private key is stored on the user's device, 
//and the public key is stored with the application and registered with a registration service.

// Anyone may access the public key, but the private key is only known to the client. When the user signs into the application, 
//the application generates a login challenge, such as requesting biometrics, sending a "magic link", or sending a special code via SMS, 
//encrypting it with the public key. The private key allows the message to be decrypted. The app then verifies the sign-in challenge and accepts the response to authorize the user.

const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const app = express();
app.use(bodyParser.json());
const users = {}; // In-memory storage for demo purposes
// Endpoint to request access and send verification code via email
app.post('/request-access', (req, res) => {
  const { email } = req.body;
  // Generate a 6-digit verification code
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  
  // Store the code in memory (users object)
  users[email] = code;
  // Simulated email sending (for demonstration)
  console.log(`Sending code ${code} to ${email}`);
  res.send('Code sent to your email');
});
// Endpoint to verify the received code
app.post('/verify-code', (req, res) => {
  const { email, code } = req.body;
  // Compare the received code with stored code for the email
  if (users[email] === code) {
    // Code matches, access granted
    res.send('Access granted');
  } else {
    // Code does not match, access denied
    res.send('Invalid code');
  }
});
// Start the Express server
app.listen(3000, () => console.log('Server running on port 3000'));

// Explanation:
// Express Setup: Sets up an Express application with middleware to parse JSON requests (body-parser).

// Request Access (/request-access): Handles POST requests where users provide their email to request access. 
// Generates a 6-digit verification code (code) and stores it in an in-memory object (users[email] = code).

// Verify Code (/verify-code): Handles POST requests to verify the received code against the stored code (if (users[email] === code)). 
// If matched, it grants access; otherwise, it denies access.