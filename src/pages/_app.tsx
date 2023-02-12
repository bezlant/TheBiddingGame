import {
  EthereumClient,
  modalConnectors,
  walletConnectProvider,
} from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/react'
import { AppProps } from 'next/app'
import { useEffect, useState } from 'react'
import { configureChains, createClient, goerli, WagmiConfig } from 'wagmi'

import '@/styles/globals.css'

// 1. Get projectID at https://cloud.walletconnect.com
if (!process.env.NEXT_PUBLIC_PROJECT_ID)
  throw new Error('You need to provide NEXT_PUBLIC_PROJECT_ID env variable')

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID

// 2. Configure wagmi client
// TODO: Add mainnet when launching
const chains = [goerli]

const { provider } = configureChains(chains, [
  walletConnectProvider({ projectId }),
])

const wagmiClient = createClient({
  autoConnect: true,
  connectors: modalConnectors({ appName: 'TheEtherBet', chains }),
  provider,
})

// 3. Configure modal ethereum client
export const ethereumClient = new EthereumClient(wagmiClient, chains)

// 4. Wrap your app wit WagmiProvider and add <Web3Moda /> component
function MyApp({ Component, pageProps }: AppProps) {
  const [ready, setReady] = useState(false)
  useEffect(() => {
    setReady(true)
  }, [])

  return (
    <>
      {ready ? (
        <WagmiConfig client={wagmiClient}>
          <Component {...pageProps} />
        </WagmiConfig>
      ) : null}

      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </>
  )
}

export default MyApp
