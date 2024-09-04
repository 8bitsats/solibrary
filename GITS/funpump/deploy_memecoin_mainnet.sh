#!/bin/bash

set -e  # Exit immediately if a command exits with a non-zero status
set -x  # Print commands and their arguments as they are executed

echo "Much wow! Starting memecoin deployment on mainnet..."

# Ensure Solana is using mainnet
export RPC_URL="https://mainnet.helius-rpc.com/?api-key=6b52d42b-5d24-4841-a093-02b0d2cc9fc0"
solana config set --url $RPC_URL

# Verify the configuration
echo "Such config:"
solana config get

# Set wallet path to the specified location
WALLET_PATH="/Users/8bit/.config/solana/id.json"
echo "Very wallet: $WALLET_PATH"

# Check if wallet file exists
if [ ! -f "$WALLET_PATH" ]; then
    echo "Error: Wallet not found. Much sad."
    exit 1
fi

# Set the wallet in Solana CLI configuration
solana config set --keypair "$WALLET_PATH"

# Check balance
balance=$(solana balance | awk '{print $1}')
echo "Many balance: $balance SOL"

# Ensure there's enough SOL for deployment (0.05 SOL)
if (( $(echo "$balance < 0.05" | bc -l) )); then
    echo "Error: Not enough SOL for deployment. Need at least 0.05 SOL."
    exit 1
fi

# Run the Python script and capture its output
echo "Much thinking. Generating memecoin..."
output=$(python3 generate_memecoin_params.py)
echo "$output"

# Extract the token parameters
name=$(echo "$output" | grep "Memecoin Name:" | cut -d ':' -f2- | xargs)
symbol=$(echo "$output" | grep "Symbol:" | cut -d ':' -f2 | xargs)
description=$(echo "$output" | grep "Description:" | cut -d ':' -f2- | xargs)
decimals=$(echo "$output" | grep "Decimals:" | cut -d ':' -f2 | xargs)
supply=$(echo "$output" | grep "Total Supply:" | cut -d ':' -f2 | xargs)
metadata_uri=$(echo "$output" | grep "Metadata URI:" | cut -d ':' -f2- | xargs)

echo "Creating very memecoin:"
echo "Name: $name"
echo "Symbol: $symbol"
echo "Description: $description"
echo "Decimals: $decimals"
echo "Total Supply: $supply"

# Final confirmation
read -p "Are you sure you want to deploy this memecoin to mainnet? (yes/no) " -n 3 -r
echo
if [[ ! $REPLY =~ ^yes$ ]]
then
    echo "Deployment cancelled. Much safe, very responsible."
    exit 1
fi

# Create the token
echo "Birthing memecoin..."
token_output=$(spl-token create-token --decimals $decimals)
token_address=$(echo "$token_output" | grep "Creating token" | awk '{print $3}')

echo "Memecoin created with address: $token_address"

# Create account for token
echo "Making wallet for memecoin..."
account_output=$(spl-token create-account $token_address)
account_address=$(echo "$account_output" | grep "Creating account" | awk '{print $3}')

echo "Memecoin account created: $account_address"

# Mint tokens
echo "Printing many coins..."
spl-token mint $token_address $supply $account_address

echo "Minted $supply tokens to $account_address"

# Disable minting
echo "No more printing. Minting disabled."
spl-token authorize $token_address mint --disable

# Save memecoin info to a file
cat << EOF > memecoin_info.json
{
  "name": "$name",
  "symbol": "$symbol",
  "description": "$description",
  "tokenAddress": "$token_address",
  "accountAddress": "$account_address",
  "totalSupply": "$supply",
  "metadataUri": "$metadata_uri"
}
EOF

echo "Memecoin info saved to memecoin_info.json"

echo "Memecoin created on mainnet! Such success, very crypto!"
echo "Don't forget to HODL! 💎🙌"