Solana Wallet Adapter
Adding a Solana Wallet Adapter to a NextJS application

Introduction

This guide will walk you through integrating the Solana Wallet Adapter in a Next.js application. You’ll learn how to create a new project, install the necessary dependencies, set up the wallet adapter, and utilize wallet functionality throughout your application.

What You’ll Learn

• Creating a new Next.js project

• Installing Solana wallet adapter dependencies

• Setting up Solana wallet adapter in your Next.js app

• Adding a connect wallet button

• Utilizing wallet context across your app using useConnection and useWallet hooks

Quick Setup (Optional)

You can quickly generate a production-ready Next.js project with the Solana wallet adapter configured by using the npx create-solana-dapp@latest CLI tool. This tool scaffolds a customized Solana dApp, including pre-configured Solana program templates.

Step 1: Create a Next.js Project

1.1 Initialize a Next.js App

First, you’ll need to install Node.js. Once installed, execute the following command to create a basic Next.js scaffold:

Copy
npx create-next-app@latest
You will be prompted to provide details such as project name, TypeScript, ESLint, Tailwind CSS, and other configurations. For this guide, use the recommended default options, including the App Router.

1.2 Project Structure

After running the setup command, your project directory should look like this:

Copy
├── src
│   └── app
│       ├── favicon.ico
│       ├── globals.css
│       ├── layout.tsx
│       └── page.tsx
Step 2: Installing Solana Wallet Adapter

2.1 Install Required Dependencies

To allow your application’s users to connect their preferred Solana wallets, you’ll need to install the following Solana wallet adapter packages:

Copy
npm install @solana/web3.js \
    @solana/wallet-adapter-base \
    @solana/wallet-adapter-react \
    @solana/wallet-adapter-react-ui \
    @solana/wallet-adapter-wallets
These packages provide the essential functions, hooks, and React components needed to integrate Solana wallets into your Next.js app.

Step 3: Setting Up Wallet Adapter in Your Next.js App

3.1 Create a components Folder

To keep your project organized, create a components folder inside the app directory and add a file named AppWalletProvider.tsx. This file will be responsible for setting up the wallet context for your application.

Project Structure Update:

Copy
├── src
│   └── app
│       ├── components
│       │   └── AppWalletProvider.tsx
│       ├── favicon.ico
│       ├── globals.css
│       ├── layout.tsx
│       └── page.tsx
3.2 Create AppWalletProvider.tsx

This file exports a context provider that allows all child components to access the Solana wallet adapter functionality. Ensure the file is rendered on the client side by adding the "use client" directive.

components/AppWalletProvider.tsx

Copy
"use client";

import React, { useMemo } from "react";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";
// import { UnsafeBurnerWalletAdapter } from "@solana/wallet-adapter-wallets";

// Import default styles for wallet adapter components
require("@solana/wallet-adapter-react-ui/styles.css");

export default function AppWalletProvider({ children }: { children: React.ReactNode }) {
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  const wallets = useMemo(
    () => [
      // Add legacy wallet adapters here if needed
      // new UnsafeBurnerWalletAdapter(),
    ],
    [network]
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
3.3 Wrap Your Application with AppWalletProvider

To ensure wallet functionality is accessible throughout your application, wrap your Next.js app with AppWalletProvider in the root layout file.

src/app/layout.tsx

Copy
import AppWalletProvider from "./components/AppWalletProvider";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AppWalletProvider>{children}</AppWalletProvider>
      </body>
    </html>
  );
}
Step 4: Add a Connect Wallet Button

4.1 Implement the Connect Wallet Button

The “connect wallet” button allows users to open the wallet selection modal and connect their Solana wallet. For simplicity, we’ll add this button to the home page.

src/app/page.tsx

Copy
"use client";

import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

export default function Home() {
  return (
    <main className="flex items-center justify-center min-h-screen">
      <div className="border hover:border-slate-900 rounded">
        <WalletMultiButton />
      </div>
    </main>
  );
}
4.2 Run Your Development Server

After setting up the connect wallet button, start your development server:

Copy
npm run dev
Visit http://localhost:3000 to see your application in action.

Step 5: Using useWallet and useConnection Hooks

5.1 Introduction to Hooks

The useWallet and useConnection hooks allow your application to interact with the user’s Solana wallet and the Solana blockchain. These hooks are accessible to all components that are children of the AppWalletProvider context.

5.2 Example: Airdrop and Balance Check

Here’s an example of how to use these hooks to perform an airdrop and check the wallet’s balance:

src/app/address/page.tsx

Copy
"use client";

import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useEffect, useState } from "react";

export default function Address() {
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const [balance, setBalance] = useState<number>(0);

  const getAirdropOnClick = async () => {
    try {
      if (!publicKey) throw new Error("Wallet is not Connected");

      const [latestBlockhash, signature] = await Promise.all([
        connection.getLatestBlockhash(),
        connection.requestAirdrop(publicKey, 1 * LAMPORTS_PER_SOL),
      ]);

      const sigResult = await connection.confirmTransaction(
        { signature, ...latestBlockhash },
        "confirmed"
      );

      if (sigResult) alert("Airdrop was confirmed!");
    } catch (err) {
      alert("You are Rate limited for Airdrop");
    }
  };

  useEffect(() => {
    if (publicKey) {
      (async function getBalanceEvery10Seconds() {
        const newBalance = await connection.getBalance(publicKey);
        setBalance(newBalance / LAMPORTS_PER_SOL);
        setTimeout(getBalanceEvery10Seconds, 10000);
      })();
    }
  }, [publicKey, connection]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-evenly p-24">
      {publicKey ? (
        <div className="flex flex-col gap-4">
          <h1>Your Public key is: {publicKey?.toString()}</h1>
          <h2>Your Balance is: {balance} SOL</h2>
          <div>
            <button
              onClick={getAirdropOnClick}
              className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5"
            >
              Get Airdrop
            </button>
          </div>
        </div>
      ) : (
        <h1>Wallet is not connected</h1>
      )}
    </main>
  );
}
Next Steps

You can expand your application by using the useWallet hook to trigger wallet actions like signing transactions or sending requests via the useConnection hook. For additional features, consider using the Unified Wallet Kit for advanced wallet integration.

To scaffold a new Solana dApp with pre-configured settings, run:

Copy
npx create-solana-dapp@latest