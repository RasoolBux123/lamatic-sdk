const Auth = require("./auth");
const { handleError } = require("./utils");

class LamaticClient {
  // Constructor to initialize the LamaticClient with an API key
  constructor(apiKey,endpoint) {
    // Check if the API key is provided
    if (!apiKey) throw new Error("API key is required");
    this.apiKey = apiKey;

    // Endpoint URL for the Lamatic API
    if (!endpoint) throw new Error("Endpoint URL is required");
    this.endpoint = endpoint

    this.auth = new Auth(apiKey);
  }

  // Call APIs
  async request(method = "GET", data = null) {
    try {
      const options = {
        method,
        headers: this.auth.getHeaders(),
        body: data ? JSON.stringify(data) : null,
      };

      /** Uncomment this section to make real api calls
      const response = await fetch(`${this.endpoint}`, options);
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

  // Flow Request
  async executeFlowRequest(method = "POST", projectId, data = null) {
    try {

      const graphqlQuery = {
        query: `query ExecuteWorkflow {
          executeWorkflow(
            workflowId: "${data.flowID}",
            payload: ${JSON.stringify(data.payload)}
          ) {
            status
            result
          }
        }`
      };

      const options = {
        method,
        headers: this.auth.getHeaders(projectId),
        body: JSON.stringify(graphqlQuery)
      };

      const response = await fetch(`${this.endpoint}`, options);
      console.log(`Status: ${response.status} ${response.statusText}`);
  
      // Get the response content regardless of status
      const responseText = await response.text();
      console.log(`Response body: ${responseText}`);
      
      // Then try to parse it as JSON if it's valid
      let responseData;
      try {
        responseData = JSON.parse(responseText);
      } catch (e) {
        // Not JSON, leave as text
      }
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText} - ${responseText}`);
      }
      
      return responseData || responseText;

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

  async executeFlow(projectId,flowID,payload){
    if (!projectId) throw new Error("The Project ID is required");
    if (!flowID) throw new Error("The Flow ID is required");
    if (!payload) throw new Error("The payload is required");

    const data = {
      flowID,
      payload
    }

    return await this.executeFlowRequest("POST", projectId, data);
  }
}

module.exports = LamaticClient;
