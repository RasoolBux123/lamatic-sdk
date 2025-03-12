const isValidApiKey = (key) => typeof key === "string" && key.length > 20;

const handleError = (error) => {
  console.error("[Lamatic SDK Error]:", error.message);
  throw new Error(error.message);
};

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

module.exports = { isValidApiKey, handleError, delay };
