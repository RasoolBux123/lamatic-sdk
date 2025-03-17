const jwt = require("jsonwebtoken");

class Auth {
    /**
     * @param {string} apiKey - The API key for authentication.
     * @param {string} projectID - The project ID for the Lamatic API.
     * @param {string} accessToken - The access token for authentication.
     * @throws {Error} If the API key and Access Token are not provided.
     */
    constructor(apiKey = null, projectID = null, accessToken = null) {
      if (!apiKey && !accessToken) {
        throw new Error("API key or Access Token is required for the Lamatic API");
      }
      if (apiKey && accessToken) {
        throw new Error("API key and Access Token cannot be used together, use either");
      }
      if (apiKey) {
        this.apiKey = apiKey;
      }
      if (accessToken) {
        this.accessToken = accessToken;
      }

      if (!projectID && !accessToken) {
        throw new Error("Project ID is required for the Lamatic API or use Access Token");
      }
      if (projectID && accessToken) {
        throw new Error("Project ID and Access Token cannot be used together, use either");
      }

      if(projectID){
        this.projectID = projectID;
      }
    }
    /**
     * @returns {object} - The headers for API requests.
     */

    verifyToken(token) {
      try {
        const secret = process.env.JWT_SECRET;
        const decoded = jwt.verify(token, secret); 
        console.log('Decoded Access Token:', decoded);

        return decoded;
      } catch (error) {
        if (error.name === 'TokenExpiredError') {
          console.log('Access Token expired, regenerating...');
          const newToken = jwt.sign({ ...decoded }, secret, { expiresIn: '1h' });

          return this.verifyToken(newToken);
        } else {
          throw new Error('Invalid Access Token');
        }
      }
    }

    getHeaders() {
      let headers = {}

      if(this.apiKey){
        headers = {
          "Content-Type" : "application/json",
          "Authorization": `Bearer ${this.apiKey}`,
          "x-project-id": `${this.projectID}`
        };
      }

      if(this.accessToken){
        const decodedToken = this.verifyToken(this.accessToken);
        headers = {
          "Content-Type" : "application/json",
          "X-Lamatic-Signature" : this.accessToken,
          "x-project-id": `${decodedToken.projectID}`
        }
      }
        
      return headers;
    }
  }
  
  module.exports = Auth;
  
