You are a language model tasked with recreating a Solana SPL and memecoin token launchpad called "FunPump". This launchpad allows users to create, launch, and migrate tokens with specific parameters and rules as detailed below.

#### **Platform Overview:**

1. **Token Creation and Deployment:**
   - Users can upload an image, choose a ticker for their token, and deploy a token with a maximum supply of **1 billion SPL tokens** on the Solana blockchain.
   - The platform will ensure the **lowest transaction fees** on Solana for token deployment.
   - **No pre-sale, no insiders**, and **no team allocation**—each coin on the platform is a **fair-launch**.
   - **Ownership is renounced and the contract is immutable** after launch.

2. **Guided Steps for Users:**
   - **Step 1:** Pick a coin that you like.
   - **Step 2:** Buy the coin on the bonding curve.
   - **Step 3:** Sell at any time to lock in your profits or losses.
   - **Step 4:** When enough people buy on the bonding curve, it reaches a market cap of **$69k**.
   - **Step 5:** **$12k** of liquidity is then deposited in **Raydium** and burned.

3. **Market Cap and Liquidity Migration:**
   - Once the market cap reaches **432 SOL (~$66.9K)**, all remaining tokens and liquidity automatically migrate to **Meteora** or **Raydium**, as selected by the token creator at launch.

4. **Liquidity and Rewards:**
   - All **liquidity is locked forever**.
   - The platform offers **Launch, Lock & Earn** functionality, specifically for **Meteora**. Tokens migrated to Meteora allow the creator and top holders to earn LP rewards for life.
   - Upon successful migration to Meteora:
     - **20% of the LP tokens are locked for the creator**.
     - **10% of the LP tokens are reserved for FunPump**.
     - **70% of the LP tokens are distributed among the top 50 holders** via Meteora's memecoin pool.

5. **Security and Audits:**
   - **FunPump prevents rugs** by ensuring that all created tokens are safe and fully audited.
   - All smart contracts are **fully audited**.
   - Users can **buy and sell at any time** using the bonding curve mechanism.

6. **Bonding Curve and Migration Process:**
   - The platform uses a **Constant Product bonding curve** with specific parameters detailed in the bondingcurve.txt file.
   - **Key Definitions**:
     - **Curve Equation**: vTOKEN * vSOL = k
     - **Initial Values**:
       - iVTOKEN = 1,073,000,000
       - iVSOL = 30
       - Minimum price: 27.95 lamports
     - **Migration Allocation (A)**: 80% of total supply = 800,000,000 tokens
     - **MarketCapThreshold**: 345 SOL at 80% tokens sold
     - **Fee for Migration (F)**: 6 SOL for Raydium, 3 SOL for Meteora
     - **Migration Calculation (M)**:
       - M = (collateral collected - migration fees) / price of token at migration
       - Collateral as SOL collected = current_virtual_collateral_reserves - initial_collateral_reserves
     - **Tokens to Burn (B)**: B = T - A - M
     - The total tokens in circulation post-migration = A + M.

7. **Fee Structure:**
   - **FunPump charges a flat fee of 0.069420%** on buy and sell orders. This fee is taken as a taker fee in SOL.
   - A **0.069420 SOL fee is charged during migration**.

8. **Incentive Message:**
   - **"Why dump your bags when you can earn lifetime fees instead? 🌙☄️"**
   - This message should be prominently displayed to encourage long-term holding and participation.

9. **UI Requirements:**
   - A sleek, dark-themed user interface with clearly defined fields for:
     - **Token Symbol**
     - **Token Name**
     - **Description**
     - **Image Upload** functionality for token logos.
   - Options to choose between **Meteora** and **Raydium**.
   - A section showing the **migration progress** and a countdown to when 80% of the supply is sold.
   - Display of trending tokens and latest activities on the platform.
   - Integrate a **DEX Screener** for viewing token performance.

This system should be user-friendly, secure, and offer a seamless experience for launching and managing tokens on the Solana blockchain.
