Wonka.JS and next.js
Getting Started with Minting NFTs on Solana using Wonka JS and Next.js

Welcome to the guide on setting up and using the Wonka JS library with a Next.js application to mint NFTs on Solana. This step-by-step tutorial will help you get started quickly and efficiently.

Setup Instructions
Step 1: Clone the Repository
First, clone the repository and navigate to the example directory:

Copy
git clone https://github.com/wonka-labs/wonka-js.git
cd willy/examples/next-example
Step 2: Configure Environment Variables
Next, set up your environment variables. Rename the .env.template file to .env and update the NEXT_PUBLIC_CANDY_MACHINE_ID with your Candy Machine ID:

Copy
bash env .env.template .env
vim .env
In the .env file, set the NEXT_PUBLIC_CANDY_MACHINE_ID to your actual Candy Machine ID:

Copy
env NEXT_PUBLIC_CANDY_MACHINE_ID=your_candy_machine_id
Step 3: Install Dependencies
Install the necessary dependencies using npm:

Copy
bash npm install
Step 4: Run the Development Server
Start the development server:

Copy
bash npm run dev
Open your browser and navigate to http://localhost:3000 to see the result.

Editing the Application
You can start editing the page by modifying pages/index.tsx. The page will auto-update as you make changes.

Included Examples
The example directory includes several useful files to help you understand how to interact with the Candy Machine:

state.tsx: Fetches state related to the Candy Machine.

mint.tsx: Mints a new NFT.

mints.tsx: Fetches all mints from the Candy Machine.

metadata.tsx: Fetches all metadata from a particular mint.

Learning More About Next.js
To learn more about Next.js and its features, check out the following resources:

Next.js Documentation - Learn about Next.js features and API.

Learn Next.js - An interactive Next.js tutorial.

You can also visit the Next.js GitHub repository to provide feedback and contribute to the project.

By following this guide, you should have a working Next.js application integrated with Wonka JS to mint NFTs on Solana. Happy coding and minting!

Feel free to reach out with any questions or feedback as you embark on your Solana NFT journey!