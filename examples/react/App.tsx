import { lamaticClient } from './utils'

function Page() {
  const executeFlow = async () => {
    const response = await lamaticClient.executeFlow(process.env.LAMATIC_FLOW_ID, {
      prompt: 'hello',
    })
    console.log(response)
  }

  return (
    <div>
      <button onClick={executeFlow}>Execute Flow</button>
    </div>
  )
}
export default Page
