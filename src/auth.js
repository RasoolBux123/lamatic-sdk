class Auth {
    constructor(apiKey) {
      if (!apiKey) {
        throw new Error("API key is required for authentication");
      }
      this.apiKey = apiKey;
    }
  
    getHeaders() {
      return {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      };
    }
  }
  
  module.exports = Auth;
  