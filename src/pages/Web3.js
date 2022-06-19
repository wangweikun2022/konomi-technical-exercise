import { useState } from "react";
import Web3 from 'web3/dist/web3.min.js'
import Web3Modal from 'web3modal';
import styles from "./Web3.module.scss";

const Web3Page = () => {

  const [address, setAddress] = useState('')
  const [amount, setAmount] = useState('')
  const onAddressChange = (e) => {
    setAddress(e.target.value)
  }
  const onAmountChange = (e) => {
    setAmount(e.target.value)
  }

  const changeNetwork = async (web3instance) => {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: web3instance.utils.toHex(97) }],
      });
    } catch (switchError) {
      // This error code indicates that the chain has not been added to MetaMask.
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: web3instance.utils.toHex(97),
                chainName: 'Binance Smart Chain Testnet',
                rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545'] /* ... */,
              },
            ],
          });
        } catch (addError) {
          // handle "add" error
        }
      }
      // handle other "switch" errors
    }
  };

  const transfer = async (web3instance, fromAddress) => {
    const chainId = await web3instance.eth.getChainId();
    if (chainId !== 97) {
      await changeNetwork(web3instance);
      return;
    }
    const value = web3instance.utils.toWei(amount.toString(), 'micro');
    await web3instance.eth.sendTransaction({
      from: fromAddress,
      to: address,
      value
    })
  };

  const connectWallet = async () => {
    let provider = null;
    try {
      provider = await new Web3Modal({}).connect();
    } catch (error) {
      alert('MetaMask connect error!')
    }
    if (provider) {
      const web3 = new Web3(provider);
      window.web3 = web3;
      const accounts = await web3.eth.getAccounts();
      if (accounts && Array.isArray(accounts)) {
        const from = accounts[0];
        await transfer(web3, from)
      }
    }
  }

  const transferClick = async () => {
    if(!address || address.length !== 42){
      alert('address is not correct')
      return
    }
    if(!amount || amount <= 0){
      alert('amount is not correct')
      return
    }
    await connectWallet()
  }

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div className={styles.title}>Transfer</div>
        <div className={styles.desc}>Transfer your Token here.</div>
        <div className={styles.item}>
          <div>Address</div>
          <input placeholder="Recipient Address" value={address} onChange={onAddressChange} />
        </div>
        <div className={styles.item}>
          <div>Token Amount</div>
          <input type='number' placeholder="Amount" value={amount} onChange={onAmountChange} />
        </div>
        <div className={styles.tips}>Make sure you have IYO token.</div>
        <div className={styles.btn} onClick={transferClick}>Transfer</div>
      </div>
    </div>
  )
}

export default Web3Page