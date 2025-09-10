import { Lamatic } from "./dist/index.js";

// Configuration - Replace with your actual values
const config = {
  endpoint: "your-endpoint-url", // e.g., "https://api.lamatic.ai/graphql"
  projectId: "your-project-id",
  apiKey: "your-api-key", // or use accessToken instead
  // accessToken: "your-access-token" // alternative to apiKey
};

async function testSDK() {
  console.log("🚀 Starting Lamatic SDK Local Tests\n");

  // Initialize the SDK
  let lamatic;
  try {
    lamatic = new Lamatic(config);
    console.log("✅ SDK initialized successfully");
    console.log(`   Endpoint: ${lamatic.endpoint}`);
    console.log(`   Project ID: ${lamatic.projectId}`);
    console.log(`   Auth Method: ${lamatic.apiKey ? 'API Key' : 'Access Token'}\n`);
  } catch (error) {
    console.error("❌ Failed to initialize SDK:", error.message);
    return;
  }

  // Test 1: Execute Flow
  console.log("📋 Test 1: Execute Flow");
  try {
    const flowId = "your-flow-id";
    const payload = {
      prompt: "Hello, this is a test message for flow execution"
    };
    
    console.log(`   Flow ID: ${flowId}`);
    console.log(`   Payload:`, payload);
    
    const flowResponse = await lamatic.executeFlow(flowId, payload);
    console.log("✅ Flow executed successfully:");
    console.log("   Response:", JSON.stringify(flowResponse, null, 2));
  } catch (error) {
    console.error("❌ Flow execution failed:", error.message);
  }
  console.log("");

  // Test 2: Execute Agent
  console.log("🤖 Test 2: Execute Agent");
  try {
    const agentId = "your-agent-id";
    const payload = {
      query: "Generate a creative tweet about AI and automation"
    };
    
    console.log(`   Agent ID: ${agentId}`);
    console.log(`   Payload:`, payload);
    
    const agentResponse = await lamatic.executeAgent(agentId, payload);
    console.log("✅ Agent executed successfully:");
    console.log("   Response:", JSON.stringify(agentResponse, null, 2));
  } catch (error) {
    console.error("❌ Agent execution failed:", error.message);
  }
  console.log("");

  // Test 3: Check Status (new function)
  console.log("🔍 Test 3: Check Status");
  try {
    const requestId = "your-request-id";
    
    console.log(`   Request ID: ${requestId}`);
    console.log("   Using default polling (15s interval, 900s timeout)");
    
    const statusResponse = await lamatic.checkStatus(requestId);
    console.log("✅ Status check completed:");
    console.log("   Response:", JSON.stringify(statusResponse, null, 2));
  } catch (error) {
    console.error("❌ Status check failed:", error.message);
  }
  console.log("");

  // Test 4: Check Status with Custom Polling
  console.log("⏱️ Test 4: Check Status with Custom Polling");
  try {
    const requestId = "your-request-id";
    const pollInterval = 5; // 5 seconds
    const pollTimeout = 60; // 1 minute
    
    console.log(`   Request ID: ${requestId}`);
    console.log(`   Poll Interval: ${pollInterval}s`);
    console.log(`   Poll Timeout: ${pollTimeout}s`);
    
    const customStatusResponse = await lamatic.checkStatus(requestId, pollInterval, pollTimeout);
    console.log("✅ Custom status check completed:");
    console.log("   Response:", JSON.stringify(customStatusResponse, null, 2));
  } catch (error) {
    console.error("❌ Custom status check failed:", error.message);
  }
  console.log("");

  // Test 5: Update Access Token (if using access token auth)
  console.log("🔄 Test 5: Update Access Token");
  try {
    const newToken = "new-access-token";
    lamatic.updateAccessToken(newToken);
    console.log("✅ Access token updated successfully");
    console.log(`   New token: ${newToken.substring(0, 10)}...`);
  } catch (error) {
    console.error("❌ Access token update failed:", error.message);
  }
  console.log("");

  console.log("🏁 All tests completed!");
}

// Run the tests
testSDK().catch(console.error);
