const express = require('express');
const axios = require('axios');
const { Connection, clusterApiUrl, PublicKey } = require('@solana/web3.js');
const path = require('path');

const app = express();
const port = 3000;
const connection = new Connection(clusterApiUrl('mainnet-beta'));

// Helius RPC API Key
const HELIUS_API_KEY = 'ba62067f-6a54-47b8-819e-6f6e8b318c38';
const HELIUS_RPC_URL = `https://mainnet.helius-rpc.com/?api-key=${HELIUS_API_KEY}`;

// Middleware to parse JSON
app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Define the TOKEN_PROGRAM_ID
const TOKEN_PROGRAM_ID = new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA");

// Endpoint to verify NFT ownership
app.post('/verify', async (req, res) => {
    const { walletAddress } = req.body;

    try {
        const publicKey = new PublicKey(walletAddress);
        const tokenAccounts = await connection.getParsedTokenAccountsByOwner(publicKey, { programId: TOKEN_PROGRAM_ID });

        // Check if the user holds the specific NFT
        const hasNFT = tokenAccounts.value.some(accountInfo => {
            const tokenAmount = accountInfo.account.data.parsed.info.tokenAmount;
            return tokenAmount.uiAmount > 0 && tokenAmount.decimals === 0; // Example condition
        });

        if (hasNFT) {
            res.status(200).json({ message: 'NFT verified' });
        } else {
            res.status(400).json({ message: 'NFT not found' });
        }
    } catch (error) {
        res.status500().json({ message: 'Server error', error: error.message });
    }
});

// Endpoint to fetch NFTs from Helius RPC
app.post('/get-nfts', async (req, res) => {
    const { walletAddress } = req.body;

    try {
        const response = await axios.post(HELIUS_RPC_URL, {
            jsonrpc: "2.0",
            id: 1,
            method: "getNFTs",
            params: {
                owner: walletAddress
            }
        });

        const nfts = response.data.result;
        res.status(200).json(nfts);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Endpoint to fetch SPL tokens from Helius RPC
app.post('/get-spl-tokens', async (req, res) => {
    const { walletAddress } = req.body;

    try {
        const response = await axios.post(HELIUS_RPC_URL, {
            jsonrpc: "2.0",
            id: 1,
            method: "getSPLTokens",
            params: {
                owner: walletAddress
            }
        });

        const splTokens = response.data.result;
        res.status(200).json(splTokens);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
