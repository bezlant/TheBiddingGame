import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from '@web3modal/ethereum';
import { Web3Modal } from '@web3modal/react';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { goerli } from 'wagmi/chains';

const projectId = import.meta.env.VITE_PROJECT_ID;
if (projectId === undefined) throw new Error('Please define the PROJECT_ID');

const chains = [goerli];

const { provider } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiClient = createClient({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, version: 1, chains }),
  provider,
});
const ethereumClient = new EthereumClient(wagmiClient, chains);

export function withWagmi(WrappedComponent: React.FC) {
  const ComponentWithWagmi = () => (
    <>
      <WagmiConfig client={wagmiClient}>
        <WrappedComponent />
      </WagmiConfig>

      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </>
  );

  return ComponentWithWagmi;
}

export default withWagmi;
