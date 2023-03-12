import { Web3Button } from '@web3modal/react';
import { FC } from 'react';
import { useAccount } from 'wagmi';

import Germany from '@/flag-icons/de.svg';
import France from '@/flag-icons/fr.svg';

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
export default App;
