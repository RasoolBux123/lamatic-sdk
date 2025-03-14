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
const Lamatic = require("lamatic-ai");

// Initialize with API key
const lamatic = new Lamatic({
  endpoint: "YOUR END POINT",
  apiKey: "YOUR API KEY",
});

// Execute Flow
async function getResponse() {
  try {
    const resData = await lamatic.executeFlow(
      "YOUR ProjectID",
      "YOUR FlowId",
      {
        // Payload
      }
    );
    console.log("Data:", resData);
  } catch (error) {
    console.error("Error:", error);
  }
}

getResponse();
```

# Support
For help and support, visit our documentation or contact support@lamatic.ai.

