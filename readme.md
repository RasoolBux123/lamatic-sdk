# Lamatic SDK

The Lamatic SDK provides an easy way to integrate with Lamatic.ai, enabling seamless access to its AI-powered automation and data integration capabilities.

## Installation
To install the SDK, use npm:
```bash
npm install lamatic-ai
```

## Usage
Here's a basic example to get started:
```javascript
const { Lamatic } = require("lamatic-ai");

// Initialize with API key
const lamatic = new Lamatic("your-api-key-here");

// Call a method (example: Fetch user data)
async function fetchUserData() {
  try {
    const userData = await lamatic.getUserData();
    console.log("User Data:", userData);
  } catch (error) {
    console.error("Error:", error.message);
  }
}

fetchUserData();
```

# Support
For help and support, visit our documentation or contact support@lamatic.ai.

