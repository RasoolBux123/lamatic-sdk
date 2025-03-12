// Function to check if the provided API key is valid.
// It checks if the key is a string and if its length is greater than 20.
const isValidApiKey = (key) => typeof key === "string" && key.length > 20;

// Function to handle errors.
// It logs the error message to the console and then throws a new error with the same message.
const handleError = (error) => {
  console.error("[Lamatic SDK Error]:", error.message);
  throw new Error(error.message);
};

// Function to introduce a delay in the execution.
// It returns a promise that resolves after the specified number of milliseconds.
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Exporting the utility functions.
module.exports = { isValidApiKey, handleError, delay };
