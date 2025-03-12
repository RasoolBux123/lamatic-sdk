const fetch = require("node-fetch");
const Auth = require("./auth");
const { handleError } = require("./utils");

class LamaticClient {
  // Constructor to initialize the LamaticClient with an API key
  constructor(apiKey) {
    // Check if the API key is provided
    if (!apiKey) throw new Error("API key is required");
    this.apiKey = apiKey;
    // Base URL for the Lamatic API
    this.baseUrl = "https://api.lamatic.ai";
  }

  // Call APIs
  async request(endpoint, method = "GET", data = null) {
    try {
      const options = {
        method,
        headers: this.auth.getHeaders(),
        body: data ? JSON.stringify(data) : null,
      };

      /** Uncomment this section to make real api calls
      const response = await fetch(`${this.baseUrl}/${endpoint}`, options);
      if (!response.ok) throw new Error(`API Error: ${response.statusText}`);
      return await response.json();
      */

      // Mock response for testing purposes
      return {
        success: true,
        data: {
          name: "Username",
          email: "example@gmail.com",
        },
      };
    } catch (error) {
      handleError(error);
    }
  }

  // 1️⃣ Call a flow execution
  async callFlow(flowId, inputData) {
    return await this.request(`flows/${flowId}/execute`, "POST", inputData);
  }

  // 2️⃣ Get available models
  async getModels() {
    return await this.request("models");
  }
}

module.exports = LamaticClient;
