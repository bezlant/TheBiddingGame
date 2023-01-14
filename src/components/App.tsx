import { Web3Button } from '@web3modal/react'
import { FC } from 'react'
import { useAccount, useContractRead } from 'wagmi'

import { thegameAbi } from '@/data/thegameABI'

import { contractAddress } from '@/constant/env'
import Germany from 'public/svg/flag-icons/de.svg'
import France from 'public/svg/flag-icons/fr.svg'
import Flags from './Flags'

const thegameContractConfig = {
  address: contractAddress,
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
      {/* {isConnected ? <div>Welcome to TheEther.Bet!</div> : <Web3Button />} */}
      {/* <div>Time left: {isSuccess && <span>{Number(data)}</span>}</div> */}
      <Flags Left={Germany} Right={France} />
    </div>
  )
}
export default App
