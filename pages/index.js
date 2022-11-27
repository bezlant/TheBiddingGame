import Head from 'next/head'
import { useState, useEffect } from 'react'

import BidInput from '../components/BidInput.js'
import SubmitBidButton from '../components/SubmitBidButton.js'
import MinimalBid from '../components/MinimalBid.js'
import BidEventResult from '../components/BidEventResult.js'
import ChooseTeamError from '../components/ChooseTeamError.js'
import PotentialGain from '../components/PotentialGain.js'
import ShowTeams from '../components/ShowTeams.js'
import Countdown from '../components/Countdown.js'

import abi from '../abi.json'

export default function Home() {
  const [web3, setWeb3] = useState(null)
  const [walletAddress, setWalletAddress] = useState(null)
  const [contract, setContract] = useState(null)
  const [connected, setConnected] = useState(false)

  const [userBidAmount, setBidAmount] = useState(0.0009)

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
            setBidAmount(Web3.utils.fromWei(currentBidAmount, 'ether'))
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
          <Countdown timeTillEnd={timeTillEnd} />
          <ShowTeams
            setIsTeamChosen={setIsTeamChosen}
            setTeam={setTeam}
            team={team}
          />
          <div className="flex flex-col">
            <BidInput
              userBidAmount={userBidAmount}
              setBidAmount={setBidAmount}
              hasJoined={hasJoined}
            />
            <SubmitBidButton processBid={processBid} />
          </div>
          {userBidAmount < 0.0009 && <MinimalBid />}
          {showPotentialGain && <PotentialGain gain={potentialGain} />}
          {hasEventFired && (
            <BidEventResult team={bid.team} id={bid.id} address={bid.address} />
          )}
          {choseTeamErr && !hasJoined && <ChooseTeamError />}
        </div>
      </main>
    </div>
  )
}
