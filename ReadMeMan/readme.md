Getting Started

Prerequisites

To set up this project locally, you need to have the following installed:

	•	Node.js (v14 or higher)
	•	npm (v6 or higher)
	•	A Solana wallet (e.g., Phantom, Solflare)
	•	API keys from Replicate and Helius


The SOLibrary

Welcome to The SOLibrary—an innovative Solana-based web application built with Next.js and React. This application integrates several powerful features, including real-time Solana price tracking, AI-driven image generation using Replicate, Solana wallet connection, and token deployment via the Jupiter SDK.

Table of Contents

	•	Getting Started
	•	Features
	•	Project Structure
	•	Environment Variables
	•	Usage
	•	Deployment
	•	Contributing
	•	License

Getting Started

Prerequisites

To set up this project locally, you need to have the following installed:

	•	Node.js (v14 or higher)
	•	npm (v6 or higher)
	•	A Solana wallet (e.g., Phantom, Solflare)
	•	API keys from Replicate and Helius

Installation

	1.	Clone the repository:

	git clone https://github.com/8bitsats/solibrary.git

	cd solibrary

	2. npx create-next-app@latest my-nextjs-app
    cd my-nextjs-app
	npm run dev

	3.	Install dependencies:

	npm install

	•	Open http://localhost:3000 to view your project.

	2.	Creating React Components:
	•	Create a new component in the components/ directory.
	•	Use the component in your pages by importing it.

3. Styling with Tailwind CSS

What is Tailwind CSS?

Tailwind CSS is a utility-first CSS framework that provides low-level utility classes to build custom designs without writing custom CSS.

	•	Features of Tailwind CSS:
	•	Utility-first approach
	•	Highly customizable
	•	Responsive design

Setting Up Tailwind CSS

	1.	Install Tailwind CSS:
	•	Install Tailwind via npm:

	npm install tailwindcss
	npx tailwindcss init


Configure Tailwind
module.exports = {
  purge: ['./pages/**/*.js', './components/**/*.js'],
  darkMode: false,
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

Using Tailwind:

@tailwind base;
@tailwind components;
@tailwind utilities;

	•	Start using Tailwind classes in your HTML:

	<div class="bg-blue-500 text-white p-4">Hello, Tailwind!</div>
	3.	Set up environment variables:
	
	Create a .env.local file in the root directory with the following content:

REPLICATE_API_TOKEN=your_replicate_api_token
NEXT_PUBLIC_HELIUS_RPC_URL=your_helius_rpc_url
REPLICATE_MODEL_ID=stability-ai/stable-diffusion:db21e45d3f7023abc2a46ee38a23973f6dce16bb082a930b0c49861f96d1e5bf

	4.	Start the development server:

	npm run dev

	Open http://localhost:3000 in your browser to see the application in action.

Features

	•	Real-Time Solana Price Tracking: Displays the current price of Solana in the top right corner.
	•	Runic Background: Experience a unique runic symbol background matrix for a mystical touch.
	•	AI-Driven Image Generation: Generate images based on text prompts using the Stable Diffusion model from Replicate.
	•	Wallet Integration: Connect your Solana wallet for a seamless experience.
	•	Token Deployment: Deploy your custom tokens via the Jupiter SDK.
	•	Jupiter Swap Integration: Swap tokens on Solana using Jupiter Swap SDK.

Project Strucuture
	├── components/
│   ├── Layout.js
│   ├── SolanaPriceTicket.js
│   ├── Chatbot.js
│   └── TokenGate.js
├── pages/
│   ├── index.js
│   ├── api/
│   │   ├── chat.js
│   │   └── tokenGate.js
├── styles/
│   └── globals.css
├── utils/
│   ├── useMetaplex.js
│   └── useSolanaPrice.js
├── next.config.js
└── package.json

Components:
	•	components/: Contains React components used throughout the app.
	•	pages/: Contains the main pages and API routes for the application.
	•	styles/: Contains global CSS styles.
	•	utils/: Utility functions for Solana price fetching and Metaplex interaction.
	•	next.config.js: Configuration file for Next.js.

Environment Variables

To run this project, you need the following environment variables:

	•	REPLICATE_API_TOKEN: Your API token from Replicate.
	•	NEXT_PUBLIC_HELIUS_RPC_URL: The RPC URL for Helius.
	•	REPLICATE_MODEL_ID: The model ID for Stable Diffusion.

Usage

	•	View Solana Price: The current Solana price is displayed in real-time in the top right corner.
	•	Generate Images: Enter a text prompt in the chatbot, and the AI will generate an image for you.
	•	Connect Wallet: Click “Connect Wallet” to link your Solana wallet.
	•	Deploy Tokens: Use the token deployment feature via the Jupiter SDK.
	•	Swap Tokens: Swap tokens directly from the app using the integrated Jupiter Swap functionality.
Deployment

To deploy this project to a live server, you can use platforms like Vercel or Netlify. Follow these steps:

	1.	Push the repository to GitHub.
	2.	Link your GitHub repository to your chosen platform (e.g., Vercel).
	3.	Set the environment variables on the platform.
	4.	Deploy your project.

Contributing

Contributions are welcome! Please fork the repository, make your changes, and submit a pull request.

License

This project is licensed under the MIT License.

Step 2: Implement the Changes

1. Add the Real-Time Solana Price Display

Let’s create a new component to fetch and display the Solana price in real-time. I’ll integrate this into the layout and place it at the top right corner.

components/SolanaPriceTicket.js:

import { useState, useEffect } from 'react';

export default function SolanaPriceTicket() {
  const [price, setPrice] = useState(null);

  useEffect(() => {
    async function fetchPrice() {
      const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd');
      const data = await response.json();
      setPrice(data.solana.usd);
    }

    fetchPrice();
  }, []);

  return (
    <div className="bg-gray-900 text-white p-2 rounded-lg fixed top-4 right-4">
      <h2 className="text-xl font-bold">Solana Price</h2>
      {price ? <p>${price}</p> : <p>Loading...</p>}
    </div>
  );
}