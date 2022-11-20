import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useState, useEffect } from "react";

import abi from "../abi.json";

export default function Home() {
  const [web3, setWeb3] = useState(null);
  const [walletAddress, setWalletAddress] = useState(null);
  const [contract, setContract] = useState(null);
  const [connected, setConnected] = useState(false);

  const [amount, setAmount] = useState(0);

  const [team, setTeam] = useState("");
  const [isTeamChosen, setIsTeamChosen] = useState(false);
  const [choseTeamErr, setChoseTeamErr] = useState(false);

  const [hasJoined, setHasJoined] = useState(false);

  const [showPotentialGain, setShowPotentialGain] = useState(false);
  const [potentialGain, setPotentialGain] = useState(0);

  const contractAddress = "0xF9772ca577617c86ef33A5E4725dA4B960190787";
  const gasLimit = 285000;
  let Web3 = require("web3");

  // We do this when our page is done loading in a useEffect hook and put it into our state for later use.
  useEffect(() => {
    if (!connected) {
      // MetaMask injects the window.ethereum object into our browser whenever the extension is installed and active
      if (window.ethereum) {
        ethereum
          .request({ method: "eth_requestAccounts" })
          .then((accounts) => {
            // If the object has been found, we set the Web3 object in our React state and also the logged-in address from MetaMask that we need to use later on.
            setWalletAddress(accounts[0]);
            let w3 = new Web3(ethereum);
            setWeb3(w3);
            // Adding the ABI to our smart contract in the code
            let contract = new w3.eth.Contract(abi, contractAddress);
            setContract(contract);
            setConnected(true);
          })
          .catch((err) => console.log(err));
      } else {
        console.log("Please install MetaMask");
      }
    } else {
      contract.methods
        .Address_Amount(String(walletAddress))
        .call()
        .then((currentBidAmount) => {
          // User has placed a bid on the blockchain
          if (Number(currentBidAmount) > 0) {
            setHasJoined(true);
            setAmount(currentBidAmount / 1000000000000000000);
          }

          isTeamChosen
            ? setShowPotentialGain(true)
            : setShowPotentialGain(false);
          calculatePotentialGain();
        });
    }
  }, [amount, connected, team]);

  const calculatePotentialGain = () => {
    contract.methods
      .GetOptionPool()
      .call()
      .then((pool) => {
        const leftTeamPool = Number(pool[0]);
        const rightTeamPool = Number(pool[1]);
        const userPool = Number(team === "left" ? leftTeamPool : rightTeamPool);
        const totalGain =
          (amount / (leftTeamPool + rightTeamPool)) * (userPool + amount) * 0.9;
        setPotentialGain(totalGain.toFixed(6));
      });
  };

  const processBid = () => {
    // Check if team is chosen
    if (team === "") {
      setChoseTeamErr(true);
      setTimeout(() => setChoseTeamErr(false), 2500);
      return;
    }

    // Check if the user has already joined the bidding
    contract.methods
      .Address_Amount(String(walletAddress))
      .call()
      .then((currentBidAmount) => {
        if (Number(currentBidAmount) > 0) {
          setHasJoined(true);
        } else {
          sendBidToBlockchain();
        }
      });
  };

  const sendBidToBlockchain = () => {
    const sendAmount = amount * 1000000000000000000;
    switch (team) {
      case "left":
        contract.methods
          .placeat0()
          .send({
            gasLimit: String(gasLimit),
            to: String(contractAddress),
            from: String(walletAddress),
            value: String(sendAmount),
          })
          .then(() => {
            console.log("Success");
          });
        break;
      case "right":
        contract.methods
          .placeat1()
          .send({
            gasLimit: String(gasLimit),
            to: String(contractAddress),
            from: String(walletAddress),
            value: String(sendAmount),
          })
          .then(() => {
            console.log("Success!");
          });
        break;
      default:
        console.log(`Error! The ${team} doesn't exist`);
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Bidding</title>
        <meta
          name="description"
          content="Put in some description for the SEO"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome !</h1>

        <div className={styles.grid}>
          <div
            onClick={() => {
              setTeam("left");
              setIsTeamChosen(true);
            }}
            className={team === "left" ? styles.cardClicked : styles.card}
          >
            <h2>Left</h2>
          </div>
          <div className={styles.bidInput}>
            <label>
              eth:{" "}
              <input
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
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
              style={{ color: hasJoined ? "grey" : "gold" }}
            />
          </div>
          <div
            onClick={() => {
              setTeam("right");
              setIsTeamChosen(true);
            }}
            className={team === "right" ? styles.cardClicked : styles.card}
          >
            <h2>Right</h2>
          </div>
        </div>
        {choseTeamErr && !hasJoined && (
          <div>
            <h2 style={{ color: "crimson" }}>Please select a team</h2>
          </div>
        )}
      </main>
    </div>
  );
}
