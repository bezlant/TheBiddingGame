import { Web3Button } from '@web3modal/react'
import Germany from 'public/svg/flag-icons/de.svg'
import France from 'public/svg/flag-icons/fr.svg'
import { FC } from 'react'
import { useAccount } from 'wagmi'

const App: FC = () => {
  const { isConnected } = useAccount()

  return (
    <div className='flex h-screen items-center justify-center bg-primary-900'>
      {isConnected ? <div>Welcome to TheEther.Bet!</div> : <Web3Button />}
      <div className='flex w-screen justify-between'>
        <Germany className='text-9xl' />
        <France className='text-9xl' />
      </div>
    </div>
  )
}

export default App
