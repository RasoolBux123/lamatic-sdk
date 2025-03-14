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
    getHeaders(projectID) {
      const headers = {
        "Content-Type" : "application/json",
        "Authorization": `Bearer ${this.apiKey}`,
        "x-project-id": `${projectID}`
      };

      return headers;
    }
  }
  
  module.exports = Auth;
  
