import { Web3Button } from '@web3modal/react';
import { useAccount } from 'wagmi';

import BidInput from '@/components/BidInput';
import Countdown from '@/components/Countdown';
import Flags from '@/components/Flags';
import SubmitBidButton from '@/components/SubmitBidButton';
import withWagmi from '@/components/withWagmi';

const App = () => {
  const { isConnected } = useAccount();

  return (
    <div className="flex h-screen items-center justify-center bg-primary-900">
      {isConnected ? (
        <div>
          <Countdown />
          <Flags />
          <BidInput />
          <SubmitBidButton />
        </div>
      ) : (
        <Web3Button />
      )}
    </div>
  );
};
export default withWagmi(App);
