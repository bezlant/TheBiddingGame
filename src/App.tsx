import { Web3Button } from '@web3modal/react';
import { FC } from 'react';
import { useAccount } from 'wagmi';

import Germany from '@/assets/svg/flag-icons/de.svg';
import France from '@/assets/svg/flag-icons/fr.svg';

import BidInput from './components/BidInput';
import Countdown from './components/Countdown';
import withWagmi from './components/withWagmi';

const App: FC = () => {
  const { isConnected } = useAccount();

  return (
    <div className="bg-primary-900 flex h-screen items-center justify-center">
      {isConnected ? (
        <div>
          <Countdown />
          <Flags Left={Germany} Right={France} />
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
