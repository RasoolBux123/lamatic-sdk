const LamaticClient = require("./client");

class Lamatic {
  constructor(apiKey) {
    this.name = "Lamatic SDK";
    this.client = new LamaticClient(apiKey);
  }

  getName() {
    return this.name;
  }

  async getUserData() {
    return await this.client.request("users/me");
  }

  init() {
    console.log("Lamatic SDK initialized");
  }
}


module.exports = {
  Lamatic,
};
