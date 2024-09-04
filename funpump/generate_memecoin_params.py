import requests
import json
import base64

# Local LLaMA 2 model endpoint
LLM_URL = "http://localhost:1234/v1/completions"

def get_ai_response(prompt, max_tokens=100):
    headers = {"Content-Type": "application/json"}
    data = {
        "prompt": prompt,
        "max_tokens": max_tokens,
        "temperature": 0.7,
        "top_p": 0.9,
        "stop": ["\n"]  # Stop generation at newline for cleaner outputs
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

    # Fixed parameters for a memecoin
    decimals = 9
    supply = 1_000_000_000_000  # 1 trillion supply is common for memecoins

    # Generate meme-themed metadata
    metadata = {
        "name": name,
        "symbol": symbol,
        "description": description,
        "image": "https://example.com/placeholder-meme.png"  # Replace with actual meme image URL
    }

    # Encode metadata as base64
    metadata_json = json.dumps(metadata)
    metadata_base64 = base64.b64encode(metadata_json.encode()).decode()

    # Create data URI
    metadata_uri = f"data:application/json;base64,{metadata_base64}"

    return name, symbol, description, decimals, supply, metadata_uri

if __name__ == "__main__":
    print("Connecting to local Bloke LLaMA 2 model...")
    name, symbol, description, decimals, supply, metadata_uri = generate_memecoin_params()
    print(f"Memecoin Name: {name}")
    print(f"Symbol: {symbol}")
    print(f"Description: {description}")
    print(f"Decimals: {decimals}")
    print(f"Total Supply: {supply}")
    print(f"Metadata URI: {metadata_uri}")

    # Ask for confirmation
    confirm = input("Do you want to proceed with these meme-tastic parameters? (yes/no): ")
    if confirm.lower() != 'yes':
        print("Memecoin generation cancelled. Much sad, very disappoint.")
        exit()

    print("Memecoin parameters confirmed. To the moon! 🚀🌙")