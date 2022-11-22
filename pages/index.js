import Head from 'next/head'
import Image from 'next/image'
import { useState, useEffect } from 'react'

import leftFlag from '../public/japan.png'
import rightFlag from '../public/germany.png'
import abi from '../abi.json'

export default function Home() {
  const [web3, setWeb3] = useState(null)
  const [walletAddress, setWalletAddress] = useState(null)
  const [contract, setContract] = useState(null)
  const [connected, setConnected] = useState(false)

  const [amount, setAmount] = useState(0)

  const [team, setTeam] = useState('')
  const [isTeamChosen, setIsTeamChosen] = useState(false)
  const [choseTeamErr, setChoseTeamErr] = useState(false)

  const [hasJoined, setHasJoined] = useState(false)

  const [showPotentialGain, setShowPotentialGain] = useState(false)
  const [potentialGain, setPotentialGain] = useState(0)

  const [bid, setBid] = useState({ team: 0, address: 0, id: 0 })
  const [hasEventFired, setHasEventFired] = useState(false)

  const contractAddress = '0xF9772ca577617c86ef33A5E4725dA4B960190787'
  const gasLimit = 285000

  const Web3 = require('web3')

  // We do this when our page is done loading in a useEffect hook and put it into our state for later use.
  useEffect(() => {
    if (!connected) {
      // MetaMask injects the window.ethereum object into our browser whenever the extension is installed and active
      if (window.ethereum) {
        ethereum
          .request({ method: 'eth_requestAccounts' })
          .then((accounts) => {
            // If the object has been found, we set the Web3 object in our React state and also the logged-in address from MetaMask that we need to use later on.
            setWalletAddress(accounts[0])
            let w3 = new Web3(ethereum)
            setWeb3(w3)
            // Adding the ABI to our smart contract in the code
            let contract = new w3.eth.Contract(abi, contractAddress)
            setContract(contract)
            setConnected(true)
          })
          .catch((err) => console.log(err))
      } else {
        console.log('Please install MetaMask')
      }
    } else {
      eventPopUp()
      contract.methods
        .Address_Amount(String(walletAddress))
        .call()
        .then((currentBidAmount) => {
          // User has placed a bid on the blockchain
          if (Number(currentBidAmount) > 0) {
            setHasJoined(true)
            setAmount(Web3.utils.fromWei(currentBidAmount, 'ether'))
          }

          calculatePotentialGain()
          isTeamChosen
            ? setShowPotentialGain(true)
            : setShowPotentialGain(false)
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amount, connected, team])

  const eventPopUp = () => {
    const placedEvent = contract.events.Placed(
      {
        filter: { ADDRESS: walletAddress },
      },
      (err, e) => {
        if (err) {
          console.log(err)
          return
        } else {
          const res = e.returnValues
          setBid({
            team: res.OPTION,
            address: res.ADDRESS,
            id: res.ID,
          })
          setHasEventFired(true)
        }
      }
    )
  }

  const calculatePotentialGain = () => {
    contract.methods
      .GetOptionPool()
      .call()
      .then((pool) => {
        const leftTeamPool = Number(pool[0])
        const rightTeamPool = Number(pool[1])
        const userPool = Number(team === 'left' ? leftTeamPool : rightTeamPool)
        // console.log(`Amount: ${Number(amount)}`)
        // console.log(`leftTeamPool: ${Number(leftTeamPool)}`)
        // console.log(`rightTeamPool: ${Number(rightTeamPool)}`)
        // console.log(`userPool: ${Number(userPool)}`)
        const totalGain =
          (amount / (leftTeamPool + rightTeamPool)) * (userPool + amount) * 0.9
        setPotentialGain(totalGain.toFixed(6))
      })
  }

  const processBid = () => {
    // Check if team is chosen
    if (team === '') {
      setChoseTeamErr(true)
      setTimeout(() => setChoseTeamErr(false), 2500)
      return
    }

    // Check if the user has already joined the bidding
    contract.methods
      .Address_Amount(String(walletAddress))
      .call()
      .then((currentBidAmount) => {
        if (Number(currentBidAmount) > 0) {
          setHasJoined(true)
        } else {
          sendBidToBlockchain()
        }
      })
  }

  const sendBidToBlockchain = () => {
    const sendAmount = Web3.utils.toWei(amount, 'ether')
    switch (team) {
      case 'left':
        contract.methods
          .placeat0()
          .send({
            gasLimit: String(gasLimit),
            to: String(contractAddress),
            from: String(walletAddress),
            value: String(sendAmount),
          })
          .then(() => {
            console.log('Success')
          })
        break
      case 'right':
        contract.methods
          .placeat1()
          .send({
            gasLimit: String(gasLimit),
            to: String(contractAddress),
            from: String(walletAddress),
            value: String(sendAmount),
          })
          .then(() => {
            console.log('Success!')
          })
        break
      default:
        console.log(`Error! The ${team} doesn't exist`)
    }
  }

  return (
    <div>
      <Head>
        <title>TheEther.bet</title>
        <meta
          name="description"
          content="The ether bet let's you bid on your favorite team in real time"
        />
        <link rel="icon" href="favicon.ico" />
      </Head>

      <main className="h-screen w-screen bg-hero-pattern bg-cover bg-center bg-no-repeat">
        <div className="flex min-h-screen  flex-1 flex-col items-center justify-around py-4 px-4">
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-4xl leading-tight">Match begins in:</h1>
            <h1>Countdown here</h1>
          </div>

          <div className="flex max-w-screen-md flex-col flex-wrap items-center justify-center">
            <div className="flex flex-row">
              <div
                onClick={() => {
                  setTeam('left')
                  setIsTeamChosen(true)
                }}
                className={'flex-1 pr-3'}
              >
                <Image
                  alt="Japanese flag"
                  src={leftFlag}
                  className={`border-1 h-full w-full rounded-xl border-gray-300 ${team === 'right' ? 'grayscale' : ''
                    }`}
                  quality={100}
                />
              </div>
              <div
                onClick={() => {
                  setTeam('right')
                  setIsTeamChosen(true)
                }}
                className={'flex-1 pl-3'}
              >
                <Image
                  alt="German flag"
                  src={rightFlag}
                  className={`border-1 h-full w-full rounded-xl border-gray-300 ${team === 'left' ? 'grayscale' : ''
                    }`}
                  quality={100}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <label>
              eth:{' '}
              <input
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value)
                }}
                type="number"
                name="amount"
                readOnly={hasJoined}
              />
            </label>
            {showPotentialGain && <div>Potential Gain : {potentialGain}</div>}
            <input
              onClick={() => processBid()}
              type="submit"
              value="Submit"
              className={hasJoined ? 'text-red-500' : 'text-yellow-500'}
            />
          </div>
          {hasEventFired && (
            <div>
              <p>Team: {bid.team}</p>
              <p>Address: {bid.address}</p>
              <p>id: {bid.id}</p>
            </div>
          )}
          {choseTeamErr && !hasJoined && (
            <div>
              <h2 style={{ color: 'crimson' }}>Please select a team</h2>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
