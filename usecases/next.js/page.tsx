import { lamaticClient } from './utils'

export default async function Page() {
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
