import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import React, { useState, useEffect } from "react";
import abi from "../abi.json";

export default function Home() {
  const [web3, setWeb3] = useState(null);
  const [walletAddress, setWalletAddress] = useState(null);
  const [contract, setContract] = useState(null);
  const [amount, setAmount] = useState(0);
  const [team, setTeam] = useState();

  const contractAddress = "0xF9772ca577617c86ef33A5E4725dA4B960190787";
  const gasLimit = 285000;
  let Web3 = require("web3");

  // We do this when our page is done loading in a useEffect hook and put it into our state for later use.
  useEffect(() => {
    // MetaMask injects the window.ethereum object into our browser whenever the extension is installed and active
    if (window.ethereum) {
      ethereum
        .request({ method: "eth_requestAccounts" })
        .then((accounts) => {
          // If the object has been found, we set the Web3 object in our React state and also the logged-in address from MetaMask that we need to use later on.
          setWalletAddress(accounts[0]);
          console.log(`walletAddress = ${walletAddress}`);
          let w3 = new Web3(ethereum);
          setWeb3(w3);

          // Adding the ABI to our smart contract in the code
          let contract = new w3.eth.Contract(abi, contractAddress);
          setContract(contract);
        })
        .catch((err) => console.log(err));
    } else {
      console.log("Please install MetaMask");
    }
  }, []);

  const processBid = () => {
    const sendAmount = amount * 1000000000000000000;
    console.log(sendAmount);
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
        <h1 className={styles.title}>Welcome!</h1>

        <div className={styles.grid}>
          <div
            onClick={() => setTeam("left")}
            className={team === "left" ? styles.cardClicked : styles.card}
          >
            <h2>Left</h2>
          </div>
          <div className={styles.bidInput}>
            <label>
              eth:{" "}
              <input
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                type="number"
                name="amount"
              />
            </label>
            <input onClick={() => processBid()} type="submit" value="Submit" />
          </div>
          <div
            onClick={() => setTeam("right")}
            className={team === "right" ? styles.cardClicked : styles.card}
          >
            <h2>Right</h2>
          </div>
        </div>
      </main>
    </div>
  );
}
