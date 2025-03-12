class Auth {
    /**
     * @param {string} apiKey - The API key for authentication.
     * @throws {Error} If the API key is not provided.
     */
    constructor(apiKey) {
      if (!apiKey) {
        throw new Error("API key is required for authentication");
      }
      this.apiKey = apiKey;
    }
    /**
     * @returns {object} - The headers for API requests.
     */
    getHeaders() {
      return {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      };
    }
  }
  
  module.exports = Auth;
  
