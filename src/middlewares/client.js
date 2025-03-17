const Auth = require("./auth");
const { handleError } = require("../utils/utils");

class LamaticClient {
  // Constructor to initialize the LamaticClient with an API key
  constructor(apiKey = null, endpoint, projectID = null, accessToken = null) {
    // API Key or Access Token Initialization
    if (!apiKey && !accessToken) throw new Error("API key or Access Token is required for the Lamatic Client");
    if(apiKey && accessToken) throw new Error("API key and Access Token cannot be used together, use either");

    if(apiKey){
      this.apiKey = apiKey;
    }
    
    if(accessToken){
      this.accessToken = accessToken;
    }

    // Endpoint URL Initialization
    if (!endpoint) throw new Error("Endpoint URL is required for the Lamatic Client");
    this.endpoint = endpoint;

    // Project ID Initialization
    if(!projectID && !accessToken) throw new Error("Project ID is required for the Lamatic Client or use Access Token");
    if(projectID && accessToken) throw new Error("Project ID and Access Token cannot be used together, use either");

    if(projectID){
      this.projectID = projectID;
    }

    // Authorization Initialization
    if(this.apiKey){
      this.auth = new Auth(this.apiKey, this.projectID, null);
    }

    if(this.accessToken){
      this.auth = new Auth(null, null, this.accessToken);
    }
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
  async executeFlowRequest(flowId, payload) {
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
        headers: await this.auth.getHeaders(),
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
  async executeFlow(flowId, data) {
    if (!flowId) throw new Error("The Flow ID is required");
    if (!data) throw new Error("The payload is required");

    return await this.executeFlowRequest(flowId, data);
  }
}

module.exports = LamaticClient;
