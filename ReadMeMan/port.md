Portfolio Applicaiton
Forked from Helius

Introduction

In this tutorial, you’ll learn how to build a Solana portfolio viewer using Next.js, Tailwind CSS, and the Helius DAS API. We’ll walk through setting up a new Next.js project, creating reusable components, fetching data from the DAS API, and displaying token information dynamically.

Step 1: Setting Up Your Next.js Project

1.1 Create a New Next.js App with Tailwind

Run the following command to create a new Next.js project with TypeScript and ESLint configurations:

npx create-next-app@latest helius-portfolio --typescript --eslint


This command will set up a Next.js project configured to use Tailwind CSS for styling and the new App router.

1.2 Navigate to Your Project Directory


cd helius-portfolio
2.1 Create a Components Folder

Create a components folder inside the app directory to maintain an organized structure:

mkdir app/components


2.2 SearchBar Component

Create a SearchBar component to handle user input for wallet addresses:

components/SearchBar.tsx

Copy


import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function SearchBar() {
  const router = useRouter();
  const [address, setAddress] = useState("");

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    router.push(`/${address}`);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="border-2 border-gray-300 rounded-md w-full text-center px-4 py-2 mb-4 flex-grow text-black"
        placeholder="Enter Wallet Address"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
        Search
      </button>
    </form>
  );
}



2.3 TokenCard Component

Create a TokenCard component to display token information:

components/TokenCard.tsx

Copy
"use client";

import React from "react";
import { Token, Attribute } from "../types/Token";

interface TokenCardProps {
  token: Token;
  tokenType: string;
}

const TokenCard = ({ token, tokenType }: TokenCardProps) => {
  return (
    <div className="border-2 border-gray-300 rounded-md p-4 mb-4">
      {tokenType === "fungible" ? (
        <div>
          <h3 className="font-bold">{token.content.metadata.symbol}</h3>
          <p>Amount: {token.token_info.balance}</p>
          {token.token_info.price_info?.total_price && (
            <p>Value: ${token.token_info.price_info.total_price}</p>
          )}
        </div>
      ) : (
        <div>
          <h3 className="font-bold">{token.content.metadata.name}</h3>
          <p>{token.content.metadata.description}</p>
          {token.content.metadata?.attributes?.map((attribute: Attribute, index: number) => (
            <p key={index}>{attribute.trait_type}: {attribute.value}</p>
          ))}
        </div>
      )}
    </div>
  );
};

export default TokenCard;


Step 3: Fetching Data from DAS

3.1 Create a lib Folder

Create a lib folder inside the app directory for API calls:

mkdir app/lib


3.2 API Call Function



Create a searchAssets.ts file inside the lib folder to handle the DAS API call:

lib/searchAssets.ts

Copy
interface Tokens {
  items: any[];
}

const fetchTokens = async (walletAddress: string): Promise<Tokens> => {
  const url = `https://mainnet.helius-rpc.com/?api-key=YOUR_API_KEY`;
  console.log(`Starting search for tokens for wallet address: ${walletAddress}`);
  
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: "my-id",
        method: "searchAssets",
        params: {
          ownerAddress: walletAddress,
          tokenType: "all",
          displayOptions: {
            showCollectionMetadata: true,
          },
        },
      }),
    });
    
    const data = await response.json();
    console.log(`Data returned for wallet address ${walletAddress}:`, data.result);
    return { items: data.result };
  } catch (error) {
    console.error("Error fetching tokens:", error);
    return { items: [] };
  }
};

export default fetchTokens;


Step 4: Displaying Token Info

4.1 Integrating Components on the Search Page

Set up the search page where users can enter wallet addresses:

pages/index.tsx

Copy
"use client";

import React from "react";
import SearchBar from "../components/SearchBar";

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Solana Portfolio Viewer</h1>
      <p className="mb-4">Built with Helius's DAS API</p>
      <SearchBar />
    </div>
  );
}


4.2 Setting Up the Token Page

Create a directory for dynamic routing and set up a token page:

Copy
mkdir -p pages/[wallet]
pages/[wallet]/page.tsx

Copy
"use client";

import React, { useState, useEffect } from "react";
import fetchTokens from "../../lib/searchAssets";
import TokenCard from "../../components/TokenCard";
import { Token } from "../../types/Token";

interface Tokens {
  items: Token[];
}

interface PageProps {
  params: {
    wallet: string;
  };
}

export default function Page({ params }: PageProps) {
  const [tokens, setTokens] = useState<Tokens | null>(null);
  const [tokenType, setTokenType] = useState("fungible");

  useEffect(() => {
    fetchTokens(params.wallet).then(setTokens).catch(console.error);
  }, [params.wallet]);

  const fungibleTokens = tokens?.items.filter(
    (token) => token.interface === "FungibleToken" || token.interface === "FungibleAsset"
  ) || [];

  const nonFungibleTokens = tokens?.items.filter(
    (token) => token.interface !== "FungibleToken" && token.interface !== "FungibleAsset"
  ) || [];

  const displayedTokens = tokenType === "fungible" ? fungibleTokens : nonFungibleTokens;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Portfolio Viewer</h2>
      <div className="flex justify-between mb-4">
        <button onClick={() => setTokenType("fungible")} className="bg-blue-500 text-white px-4 py-2 rounded-md">
          Fungible Tokens
        </button>
        <button onClick={() => setTokenType("nonFungible")} className="bg-green-500 text-white px-4 py-2 rounded-md">
          Non-Fungible Tokens
        </button>
      </div>
      {displayedTokens.length > 0 ? (
        <div>
          {displayedTokens.map((token, index) => (
            <TokenCard key={index} token={token} tokenType={tokenType} />
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

Step 5: Styling the Application

Tailwind CSS will be our styling framework, allowing us to quickly apply a consistent, responsive design to our application. You can use Tailwind to further customize the look and feel of your app.

Step 6: Testing and Deployment

6.1 Testing Locally

Run your Next.js app locally to test:

Npm Run Dev