import { Web3Button } from '@web3modal/react'
import Germany from 'public/svg/flag-icons/de.svg'
import France from 'public/svg/flag-icons/fr.svg'
import { FC } from 'react'
import { useAccount, useContractRead } from 'wagmi'

import { thegameAbi } from '@/data/thegameABI'

const thegameContractConfig = {
  address: '0xf9772ca577617c86ef33a5e4725da4b960190787' as const,
  abi: thegameAbi,
}
const App: FC = () => {
  const { isConnected } = useAccount()

  const { data, isRefetching, isSuccess, refetch } = useContractRead({
    ...thegameContractConfig,
    functionName: 'EventEndTime',
  })

  return (
    <div className='flex h-screen items-center justify-center bg-primary-900'>
      {isConnected ? <div>Welcome to TheEther.Bet!</div> : <Web3Button />}
      {/* This will error out if you don't connect to a wallet (TODO: Polypane metamask) */}
      <div>Time left: {isSuccess && <span>{Number(data)}</span>}</div>
      <div className='flex w-screen justify-between'>
        <Germany className='text-9xl' />
        <France className='text-9xl' />
      </div>
    </div>
  )
}

export default App
