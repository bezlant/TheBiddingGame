import Head from 'next/head'
import Image from 'next/image'
import { useState, useEffect } from 'react'

import FlipClockCountdown from '@leenguyen/react-flip-clock-countdown'
import '@leenguyen/react-flip-clock-countdown/dist/index.css'
import ethsvg from '../public/eth.svg'
import leftFlag from '../public/japan.png'
import rightFlag from '../public/germany.png'
import abi from '../abi.json'

export default function Home() {
  const [web3, setWeb3] = useState(null)
  const [walletAddress, setWalletAddress] = useState(null)
  const [contract, setContract] = useState(null)
  const [connected, setConnected] = useState(false)

  const [userBidAmount, setAmount] = useState(0)

  const [team, setTeam] = useState('')
  const [isTeamChosen, setIsTeamChosen] = useState(false)
  const [choseTeamErr, setChoseTeamErr] = useState(false)

  const [hasJoined, setHasJoined] = useState(false)

  const [showPotentialGain, setShowPotentialGain] = useState(false)
  const [potentialGain, setPotentialGain] = useState(0)

  const [bid, setBid] = useState({ team: 0, address: 0, id: 0 })
  const [hasEventFired, setHasEventFired] = useState(false)

  const [timeTillEnd, setTimeTillEnd] = useState(
    new Date().getTime() + 3 * 24 * 60 * 60 * 1000
  )

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
          isTeamChosen && !isNaN(potentialGain)
            ? setShowPotentialGain(true)
            : setShowPotentialGain(false)
        })

      contract.methods
        .EventEndTime()
        .call()
        .then((timeInSeconds) => {
          const timeInMiliseconds = Number(timeInSeconds) * 1000
          setTimeTillEnd(timeInMiliseconds)
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userBidAmount, connected, team])

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
        const leftTeamPool = Number(Web3.utils.fromWei(pool[0], 'ether'))
        const rightTeamPool = Number(Web3.utils.fromWei(pool[1], 'ether'))
        const oppositeTeamPool = team === 'left' ? rightTeamPool : leftTeamPool
        const userBid = Number(userBidAmount)
        const moneyPool =
          leftTeamPool + rightTeamPool + (hasJoined ? -userBid : userBid)

        // console.log(`Amount: ${Number(userBidAmount)}`)
        // console.log(`leftTeamPool: ${Number(leftTeamPool)}`)
        // console.log(`rightTeamPool: ${Number(rightTeamPool)}`)
        // console.log(`userPool: ${Number(oppositeTeamPool)}`)

        const totalGain =
          (userBid + (userBid / moneyPool) * oppositeTeamPool) * 0.9

        // console.log(`totalGain: ${totalGain}`)
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
    const sendAmount = Web3.utils.toWei(userBidAmount, 'ether')
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
        <title>TheEtherBet</title>
        <meta
          name="description"
          content="The ether bet let's you bid on your favorite team in real time"
        />
        <link rel="icon" href="favicon.ico" />
      </Head>

      <main className="h-screen w-screen bg-hero-pattern bg-cover bg-center bg-no-repeat uppercase tracking-wider">
        <div className="flex min-h-screen  flex-1 flex-col items-center justify-start py-4 px-4">
          <div className="mt-14 flex flex-col items-center justify-center font-alfa text-white">
            <h1 className="font-fugaz text-4xl leading-tight">Starts in:</h1>
            <FlipClockCountdown
              className="mt-8"
              to={timeTillEnd}
              labels={['DAYS', 'HOURS', 'MINUTES', 'SECONDS']}
              labelStyle={{
                fontSize: 10,
                fontWeight: 500,
                textTransform: 'uppercase',
              }}
              digitBlockStyle={{ width: 30, height: 37, fontSize: 30 }}
              dividerStyle={{ color: 'gray', height: 1 }}
              separatorStyle={{ size: '6px' }}
              duration={0.5}
            />
          </div>

          <div className="mt-20 mb-20 flex max-w-screen-md flex-col flex-wrap items-center justify-center">
            <div className="flex flex-row">
              <div
                onClick={() => {
                  setTeam('left')
                  setIsTeamChosen(true)
                }}
                className={'mr-3 flex-1'}
              >
                <Image
                  alt="Japanese flag"
                  src={leftFlag}
                  className={`h-full w-full rounded-xl border-2 border-blue-200 opacity-95 hover:border-2 hover:border-blue-400 hover:opacity-100 ${
                    team === 'right'
                      ? 'grayscale hover:grayscale-0'
                      : 'border-1'
                  }`}
                  quality={100}
                />
              </div>
              <div
                onClick={() => {
                  setTeam('right')
                  setIsTeamChosen(true)
                }}
                className={'ml-3 flex-1'}
              >
                <Image
                  alt="German flag"
                  src={rightFlag}
                  className={`h-full w-full rounded-xl border-2 border-blue-200 opacity-95 hover:border-2  hover:border-blue-400 hover:opacity-100  ${
                    team === 'left' ? 'grayscale hover:grayscale-0' : 'border-1'
                  }`}
                  quality={100}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="relative mb-2">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Image
                  alt="ethereum logo"
                  src={ethsvg}
                  quality={100}
                  className="h-5 w-5 text-gray-500 dark:text-gray-400"
                />
              </div>
              <input
                value={userBidAmount}
                onChange={(e) => {
                  setAmount(e.target.value)
                }}
                type="number"
                name="amount"
                readOnly={hasJoined}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 font-fugaz text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              />
            </div>
            <input
              onClick={() => processBid()}
              type="submit"
              value="PAY"
              className={
                'w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center font-fugaz text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-auto'
              }
            />
          </div>

          {userBidAmount < 0.0009 && (
            <div
              className="mt-2 border-t border-b border-blue-500 bg-blue-100 px-4 py-3 text-blue-700"
              role="alert"
            >
              <p className="text-sm">Minimal bid is 0.0009 eth</p>
            </div>
          )}
          {showPotentialGain && (
            <div className="mt-4">
              <p className="mb-4 text-2xl font-extrabold leading-none tracking-wide text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
                Potential:{' '}
                <span className="underline-offset-3 underline decoration-green-200 decoration-8 dark:decoration-green-400">
                  {potentialGain}
                </span>
              </p>
            </div>
          )}
          {hasEventFired && (
            <div>
              <p>Team: {bid.team}</p>
              <p>Address: {bid.address}</p>
              <p>id: {bid.id}</p>
            </div>
          )}
          {choseTeamErr && !hasJoined && (
            <div
              className="mt-2 border-t border-b border-red-400 bg-red-100 px-4 py-3 text-red-700"
              role="alert"
            >
              <p className="text-sm">Please select a team</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
