const LamaticClient = require("./client");

class Lamatic {
  /**
   * Constructor to initialize the Lamatic SDK with configuration options
   * @param {Object} config - Configuration object
   * @param {string} [config.endpoint] - The endpoint URL for the Lamatic API
   * @param {string} [config.apiKey] - The API key for the Lamatic API (or use config.api)
   */

  constructor(config) {
    if (!config || typeof config !== 'object') {
      throw new Error('Configuration object is required');
    }

    this.endpoint = config.endpoint;
    // Support both apiKey and api property names
    this.apiKey = config.apiKey || config.api || '';
    this.name = "Lamatic SDK";
    this.client = new LamaticClient(this.apiKey, this.endpoint);
  }

  /**
   * Returns the name of the SDK.
   * @returns {string} The name of the SDK.
   */
  getName() {
    return this.name;
  }

  async executeFlow(projectId, flowID, payload) {
    return await this.client.executeFlow(projectId, flowID, payload);
  }

  init() {
    console.log("Lamatic SDK initialized");
  }
}

module.exports = Lamatic;