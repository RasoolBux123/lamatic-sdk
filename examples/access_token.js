// This example shows how to use the Lamatic SDK with a token that expires, and how to update the access token.
import { Lamatic } from "lamatic-ts";

const lamatic = new Lamatic({
  accessToken: "your-access-token",
  projectId: "your-project-id",
  endpoint: "your-endpoint",
});

async function main() {
  const flowId = "your-flow-id";
  // sample payload
  const payload = {
    prompt: "hey, how are you?"
  }
  const response = await lamatic.executeFlow(flowId, payload);
    console.log(response);
}

main();