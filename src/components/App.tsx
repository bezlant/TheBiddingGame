import { Web3Button } from '@web3modal/react'
import { FC } from 'react'
import { useAccount } from 'wagmi'

const App: FC = () => {
  const { isConnected } = useAccount()

  return (
    <div className='flex h-screen items-center justify-center bg-primary-900'>
      {isConnected ? <div>Welcome to TheEther.Bet!</div> : <Web3Button />}
    </div>
  )
}

export default App
