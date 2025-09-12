import { lamaticClient } from './utils'

function Page() {
  const executeFlow = async () => {
    const response = await lamaticClient.executeFlow(process.env.LAMATIC_FLOW_ID, {
      prompt: 'hello',
    })
    console.log(response)
  }

  const executeAgent = async () => {
    const response = await lamaticClient.executeAgent(process.env.LAMATIC_AGENT_ID, {
      topic: 'generating a tweet for learning lamatic AI',
    })
    console.log(response)
  }

  const checkStatus = async () => {
    //In case of async flow executeFlow will return a request id, you can use checkStatus to check it's status.
    // 15 is the polling interval in seconds
    // 900 is the timeout duration in seconds (15 minutes)
    const response = await lamaticClient.checkStatus("your-request-id", 15, 900)
    console.log(response)
  }

  return (
    <div>
      <button onClick={executeFlow}>Execute Flow</button>
      <button onClick={executeAgent}>Execute Agent</button>
    </div>
  )
}
export default Page
