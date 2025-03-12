// const fetch = require("node-fetch");
const Auth = require("./auth");
const { handleError } = require("./utils");

class LamaticClient {
  constructor(apiKey) {
    if (!apiKey) throw new Error("API key is required");
    this.apiKey = apiKey;
    this.baseUrl = "https://api.lamatic.ai";
  }

  async request(endpoint, method = "GET", data = null) {
    try {
      const options = {
        method,
        headers: this.auth.getHeaders(),
        body: data ? JSON.stringify(data) : null,
      };

      /**
      const response = await fetch(`${this.baseUrl}/${endpoint}`, options);
      if (!response.ok) throw new Error(`API Error: ${response.statusText}`);
      return await response.json();
      */
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
}

module.exports = LamaticClient;
