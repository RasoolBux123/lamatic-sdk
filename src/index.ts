import { LamaticConfig, LamaticAPIResponse, LamaticResponse } from "./types";

class Lamatic {
  name: string = "Lamatic SDK";
  endpoint: string = "";
  projectId: string = "";
  apiKey?: string | null | undefined;
  accessToken?: string | null | undefined;
  /**
   * Constructor to initialize the Lamatic SDK with configuration options
   * @param {Object} config - Configuration object
   * @param {string} [config.endpoint] - The endpoint URL for the Lamatic API
   * @param {string} [config.apiKey] - The API key for the Lamatic API
   * @param {string} [config.projectId] - The project ID for the Lamatic API
   * @param {string} [config.accessToken] - The access token for the Lamatic API
   */

  constructor(config : LamaticConfig) {
    if (!config) {
      throw new Error('Configuration object is required');
    }

    if(!config.endpoint) {
      throw new Error('Endpoint URL is required');
    }

    if(!config.projectId) {
      throw new Error('Project ID is required');
    }

    if(!(config.apiKey) && !config.accessToken) {
      throw new Error('API key or Access Token is required');
    }
    this.endpoint = config.endpoint;
    this.projectId = config.projectId;
    this.apiKey = config.apiKey;
    this.accessToken = config.accessToken;
  }


  /**
   * Execute a workflow with the given flow ID and payload
   * @param {string} flowId - The ID of the workflow to execute
   * @param {Object} payload - The payload to pass to the workflow
   * @returns {Promise<LamaticResponse>} The response from the workflow
   */
  async executeFlow(flowId : string, payload : Object): Promise<LamaticResponse> {
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

      const headers = this.getHeaders();
      const options = {
        method: "POST",
        headers: headers,
        body: JSON.stringify(graphqlQuery),
      };
      
      const response = await fetch(this.endpoint, options);
      const responseText = await response.text();
      let responseData : LamaticAPIResponse = JSON.parse(responseText);
      if (responseData.errors) {
        return {
          status: "error",
          result: null,
          message: responseData.errors[0].message,
          statusCode: response.status
        }
      }
      return {
        ...responseData.data.executeWorkflow,
        statusCode: response.status
      };

    } catch (error : Error | any) {
      console.error("[Lamatic SDK Error] : ", error.message);
      throw new Error(error.message);
    }
  }

  /**
   * Get the headers for the API request
   * @returns {Record<string, string>} The headers for the API request
   */
  getHeaders(): Record<string, string> {
    if(this.accessToken){
      return {
        "Content-Type" : "application/json",
        "X-Lamatic-Signature" : this.accessToken,
        "x-project-id": this.projectId
      }
    }
    return {
      "Content-Type" : "application/json",
      "Authorization": `Bearer ${this.apiKey}`,
      "x-project-id": this.projectId
    };  
  }

  /**
   * Update the access token for the Lamatic SDK
   * @param {string} accessToken - The new access token
   */
  updateAccessToken(accessToken : string) {
    this.accessToken = accessToken;
  }
}

export { Lamatic };
