import { Web3Button } from '@web3modal/react'
import Germany from 'public/svg/flag-icons/de.svg'
import France from 'public/svg/flag-icons/fr.svg'
import { FC } from 'react'
import { useAccount, useContractRead } from 'wagmi'

import { thegameAbi } from '@/data/thegameABI'

import { contractAddress } from '@/constant/env'

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
      <div className='flex w-screen '>
        <div className='flex w-1/3 flex-1 items-center'>
          <Germany
            preserveAspectRatio='none'
            width='100%'
            height='100%'
            className='clip-right h-1/3 rounded-r-md transition-all duration-300 ease-linear'
          />
        </div>
        <div className='flex w-1/3 flex-1 items-center justify-end'>
          <France
            preserveAspectRatio='none'
            width='100%'
            height='100%'
            className='clip-left h-1/3 rounded-l-md transition-all duration-300 ease-linear '
          />
        </div>
      </div>
    </div>
  )
}
export default App
