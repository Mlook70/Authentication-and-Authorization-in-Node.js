# Authentication and Authorization in Node.js

Welcome to the **Authentication and Authorization in Node.js** project. This repository demonstrates different authentication techniques in a Node.js environment, including session-based, token-based, and passwordless authentication.

## Objectives
In this project, you will learn how to:
- Define authentication
- Explain session-based, token-based, and passwordless authentication
- Compare and contrast different types of authentications

## Authentication Methods

### 1. Session-based Authentication
Session-based authentication is one of the oldest forms of authentication. In this method, the server creates a session when a user logs in, and a session ID is stored both on the server and in a cookie on the client side. The session persists until the user logs out or the session expires.

**Example Code:**
```javascript
const express = require('express');
const session = require('express-session');
const app = express();

app.use(session({
  secret: 'secret-key', // Replace with a strong secret key
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true in production with HTTPS
}));

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'user' && password === 'password') {
    req.session.user = username;
    res.send('Logged in successfully');
  } else {
    res.send('Invalid credentials');
  }
});

app.get('/dashboard', (req, res) => {
  if (req.session.user) {
    res.send(`Welcome ${req.session.user}`);
  } else {
    res.send('Please log in first');
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));
