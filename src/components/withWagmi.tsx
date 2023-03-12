import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from '@web3modal/ethereum';
import { Web3Modal } from '@web3modal/react';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { arbitrum, mainnet, polygon } from 'wagmi/chains';

if (process.env.PROJECT_ID === undefined)
  throw new Error('Please define the PROJECT_ID');

const chains = [arbitrum, mainnet, polygon];
const projectId = import.meta.env.VITE_PROJECT_ID;

const { provider } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiClient = createClient({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, version: 1, chains }),
  provider,
});
const ethereumClient = new EthereumClient(wagmiClient, chains);

const withWagmi = (Element: React.ComponentType) => (
  <>
    <WagmiConfig client={wagmiClient}>
      <Element />
    </WagmiConfig>

    <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
  </>
);

export default withWagmi;
