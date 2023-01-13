import { useState } from 'react'
import './App.css'
import {
  EthereumClient,
  modalConnectors,
  walletConnectProvider,
} from "@web3modal/ethereum";

import { Web3Modal } from "@web3modal/react";

import { configureChains, createClient, WagmiConfig } from "wagmi";

import { arbitrum, mainnet, polygon, polygonMumbai } from "wagmi/chains";
// import { HomePage } from './HomePage';

import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { HomePage } from './HomePage';


function App() {

  const chains = [arbitrum, mainnet, polygon, polygonMumbai,];

  // Wagmi client
  const { provider } = configureChains(chains, [
    walletConnectProvider({ projectId: "0x1ABbe218f9F5bB77a8B659a9FDc62A1B2a494C84" }),
  ]);
  const wagmiClient = createClient({
    autoConnect: true,
    connectors: [
      new MetaMaskConnector({ chains }),
      new CoinbaseWalletConnector({
        chains,
        options: {
          appName: 'wagmi',
        },
      }),
      new WalletConnectConnector({
        chains,
        options: {
          qrcode: true,
        },
      }),
      new InjectedConnector({
        chains,
        options: {
          name: 'Injected',
          shimDisconnect: true,
        },
      }),
    ],
    provider,
  });

  // Web3Modal Ethereum Client
  const ethereumClient = new EthereumClient(wagmiClient, chains);

  return (
    <div className="App">
      <>
        <WagmiConfig client={wagmiClient}>
          <HomePage />
        </WagmiConfig>

        <Web3Modal
          projectId="0x1ABbe218f9F5bB77a8B659a9FDc62A1B2a494C84"
          ethereumClient={ethereumClient}
        />
      </>
    </div>
  );
}

export default App
