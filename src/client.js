const Auth = require("./auth");
const { handleError } = require("./utils");

class LamaticClient {
  // Constructor to initialize the LamaticClient with an API key
  constructor(apiKey, endpoint) {
    // Check if the API key is provided
    if (!apiKey) throw new Error("API key is required");
    this.apiKey = apiKey;

    // Endpoint URL for the Lamatic API
    if (!endpoint) throw new Error("Endpoint URL is required");
    this.endpoint = endpoint;

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

  // Flow Request with GraphQL
  async executeFlowRequest(projectId, flowId, payload) {
    try {

      const graphqlQuery = {
        query: `query ExecuteWorkflow(
                $workflowId: String!  
                $payload: JSON!
              ) 
              {   
                executeWorkflow( 
                  workflowId: $workflowId   
                  payload: $payload
                ) 
                {  
                  status       
                  result   
                } 
              }`,
        variables: {
          workflowId: flowId,
          payload : payload,
        },
      };

      const options = {
        method: "POST",
        headers: await this.auth.getHeaders(projectId),
        body: JSON.stringify(graphqlQuery),
      };
      
      const response = await fetch(this.endpoint, options);
      const responseText = await response.text();

      let responseData = JSON.parse(responseText);
    
      if (!response.ok) {
        throw new Error(
          `API Error: ${response.status} ${response.statusText} - ${responseText}`
        );
      }

      return responseData;

    } catch (error) {
      handleError(error);
    }
  }

  // Execute a flow with the GraphQL API
  async executeFlow(projectId, flowId, data) {
    if (!projectId) throw new Error("The Project ID is required");
    if (!flowId) throw new Error("The Flow ID is required");
    if (!data) throw new Error("The payload is required");

    return await this.executeFlowRequest(projectId, flowId, data);
  }
}

module.exports = LamaticClient;
