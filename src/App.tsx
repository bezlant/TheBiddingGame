import { Web3Button } from '@web3modal/react'
import { useState } from 'react'
import { useAccount } from 'wagmi'

import BidInput from '@/components/BidInput'
import Countdown from '@/components/Countdown'
import Flags from '@/components/Flags'
import SubmitBidButton from '@/components/SubmitBidButton'
import withWagmi from '@/components/withWagmi'

import { TEAM } from './constants'

const App = () => {
  const { isConnected } = useAccount()
  const [teamChosen, setTeamChosen] = useState(TEAM.NONE)

  return (
    <div className="flex h-screen items-center justify-center bg-primary-900">
      {isConnected ? (
        <div>
          <Countdown />
          <Flags teamChosen={teamChosen} setTeamChosen={setTeamChosen} />
          <BidInput />
          <SubmitBidButton />
        </div>
      ) : (
        <Web3Button />
      )}
    </div>
  )
}

export default withWagmi(App)
