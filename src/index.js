const LamaticClient = require("./client");

class Lamatic {
  /**
   * Constructor to initialize the Lamatic SDK with an API key
   * @param {string} endpoint - The endpoint URL for the Lamatic API.
   * @param {string} apiKey - The API key for the Lamatic API.
   */

  constructor(endpoint,apiKey) {
    this.endpoint = endpoint;
    this.name = "Lamatic SDK";
    this.client = new LamaticClient(apiKey,endpoint);
  }

  /**
   * Returns the name of the SDK.
   * @returns {string} The name of the SDK.
   */
  getName() {
    return this.name;
  }
  // Fetches the current user's data
  async getUserData() {
    return await this.client.request("users/me");
  }

  // Call a flow
  async callFlow(flowId, inputData) {
    return await this.client.callFlow(flowId, inputData);
  }

  // Get available models
  async getModels() {
    return await this.client.getModels();
  }

  async executeFlow(projectId, flowID, payload) {
    return await this.client.executeFlow(projectId,flowID, payload);
  }

  init() {
    console.log("Lamatic SDK initialized");
  }
}

module.exports = Lamatic;