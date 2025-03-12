const LamaticClient = require("./client");

class Lamatic {
  constructor(apiKey) {
    this.name = "Lamatic SDK";
    this.client = new LamaticClient(apiKey);
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

  init() {
    console.log("Lamatic SDK initialized");
  }
}

module.exports = {
  Lamatic,
};
