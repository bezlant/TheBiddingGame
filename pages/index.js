import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import React, { useState, useEffect } from "react";
import abi from "../abi.json";

export default function Home() {
  const [web3, setWeb3] = useState(null);
  const [address, setAddress] = useState(null);
  const [contract, setContract] = useState(null);

  let contractAddress = "0xF9772ca577617c86ef33A5E4725dA4B960190787";
  let Web3 = require("web3");

  // We do this when our page is done loading in a useEffect hook and put it into our state for later use.
  useEffect(() => {
    // MetaMask injects the window.ethereum object into our browser whenever the extension is installed and active
    if (window.ethereum) {
      ethereum
        .request({ method: "eth_requestAccounts" })
        .then((accounts) => {
          // If the object has been found, we set the Web3 object in our React state and also the logged-in address from MetaMask that we need to use later on.
          setAddress(accounts[0]);
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
        <p className={styles.description}>Awesome description</p>
        <div className={styles.grid}></div>
      </main>
    </div>
  );
}
