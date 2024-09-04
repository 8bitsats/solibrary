from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import json
import base58
from solana.rpc.async_api import AsyncClient
from solana.rpc.commitment import Confirmed
from solders.keypair import Keypair
from solana.transaction import Transaction
from solana.rpc.types import TxOpts
import asyncio
from configparser import ConfigParser
from solders.pubkey import Pubkey

# Import necessary functions from pump.py
from pump import (
    create_and_mint_to_account,
    get_payer,
    TOKEN_METADATA_PROGRAM_ID,
    TOKEN_PROGRAM_ID,
    Client,
    execute_tx
)

app = Flask(__name__)
CORS(app)

# Load configuration
config = ConfigParser()
config.read('config.ini')

RPC_HTTPS_URL = config.get("RPC_URL", "rpc_url")
secret_Key = config.get("WALLET", "private_key")
GAS_LIMIT = config.getint("FEE", "computeUnitLimitRaydium")
GAS_PRICE = config.getint("FEE", "computeUnitPriceMicroLamports")

solana_client = Client(RPC_HTTPS_URL, commitment=Confirmed())

LLM_URL = "http://localhost:1234/v1/completions"

def get_ai_response(prompt, max_tokens=100):
    headers = {"Content-Type": "application/json"}
    data = {
        "prompt": prompt,
        "max_tokens": max_tokens,
        "temperature": 0.7,
        "top_p": 0.9,
        "stop": ["\n"]
    }
    try:
        response = requests.post(LLM_URL, headers=headers, json=data)
        response.raise_for_status()
        return response.json()['choices'][0]['text'].strip()
    except requests.RequestException as e:
        print(f"Error communicating with local LLM: {e}")
        return None

def generate_memecoin_params():
    name_prompt = "Generate a hilarious and viral name for a cryptocurrency memecoin, be creative and funny:"
    symbol_prompt = "Create a 3-4 letter symbol for the memecoin you just named:"
    description_prompt = "Write a short, catchy, and meme-worthy description for this coin (max 280 characters):"

    name = get_ai_response(name_prompt, max_tokens=30)
    symbol = get_ai_response(symbol_prompt, max_tokens=20)[:4].upper()
    description = get_ai_response(description_prompt, max_tokens=280)

    return name, symbol, description

@app.route('/generate', methods=['GET'])
def generate_coin():
    name, symbol, description = generate_memecoin_params()
    return jsonify({
        "name": name,
        "symbol": symbol,
        "description": description
    })

@app.route('/deploy', methods=['POST'])
def deploy_coin():
    data = request.json
    name = data['name']
    symbol = data['symbol']
    description = data['description']
    
    # Set up deployment parameters
    mint_decimals = 9
    mint_amount = 1_000_000_000_000  # 1 trillion supply
    payer = get_payer(secret_Key)
    
    # Generate a simple URI for the token metadata
    uri = f"data:application/json,{{\"name\":\"{name}\",\"symbol\":\"{symbol}\",\"description\":\"{description}\"}}"

    try:
        # Use the existing create_and_mint_to_account function
        tx = create_and_mint_to_account(solana_client, mint_amount, mint_decimals, payer, GAS_PRICE, GAS_LIMIT, name, symbol, uri)
        
        # Execute the transaction
        asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())
        tx_sig = asyncio.run(execute_tx(tx, payer, None, [payer]))
        
        # Extract relevant information from the transaction
        mint_pubkey = tx.message.instructions[0].keys[1].pubkey
        token_account = tx.message.instructions[2].keys[1].pubkey

        return jsonify({
            "name": name,
            "symbol": symbol,
            "description": description,
            "tokenAddress": str(mint_pubkey),
            "tokenAccount": str(token_account),
            "totalSupply": mint_amount,
            "txSignature": tx_sig
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)