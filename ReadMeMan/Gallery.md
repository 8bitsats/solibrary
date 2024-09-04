# Setup Instructions

This file contains setup instructions for the tutorial.
Please follow these step by step as any variance will lead to decreased performance.

## Steps

1. cd gallery

2. Install the required packages by typing in your terminal:

npm i
npm i next@latest
Hit enter, and you should see dependencies starting to be installed.
If you receive an error message, please follow the guidance of your terminal.

Here is the error "npm audit fix"

For example, npm fix, and npm audit, etc. Remember you can always ask ai, to explain your error messages.

A good system prompt to remember is, "Debug and explain these lines of codes for me."

3. Go to https://www.helius.dev/ and sign up for an account, I reccommend using github to connect for convience.

After setup, why don't you create a new api key, and take note of your RPC endpoint, for both dev and mainnet.
Copy the mainnet, RPC and paste it in the file, .env.local.template, and replace the one already there.
After that remove the ".template" and the final filename should be, ".env.loca"

Now your Helius RPC endpoint is connected to the project, and to the Solana MFN blockchain.

4. Now that the whole project is set up, please go to File>Save ALL and than go to your terminal.

Terminal is up top, next to window, and click New Terminal to start one.

It will appear below your code editor.

You should be in the file directory named "Gallery"

Enter this command to run the development server locally on your browser to test and view your project.

npm run dev

this will give you the following response:

8bit@8Bit gallery % npm run dev

> galleria@0.1.0 dev
> next dev

   ▲ Next.js 14.0.3
   - Local:        http://localhost:3000
   - Environments: .env.local

 ✓ Ready in 1143ms

 Now hit cmnd and click on the link provided.

 This will open up your local development server on whatever browser you use at home.

 Bada bing, bada boom, now enter your wallet address in the field provided.

 Hit search and enjoy anon, You just set up a Helius Portfolio Tracker on your own, locally at home!

 Check gallery.png for what it should look like.

 Now let's cook...

 You can now go into all of the folders within the project and really start to edit and have some fun.

 Remember, you have the development server live and running.

 So after making an edit, go to File>Save ALL or turn on Auto save features to have it auto update.

 You will be able to see the edits that you make in real time on the local server fam.

 Your next question is going to be how to launch said dope project to the world?

 Well, you need a github account of course, and than I would reccommend setting up a vercel or a heroku account.

 Let's start with vercel shall we?



 ## Contributing

Galleria is an open-source project, and contributions are always welcome! If you're interested in contributing, please see our Contributing Guidelines for more information.

## License

This project is licensed under the MIT License.

## Contact

If you have any questions, issues, or suggestions, feel free to open an issue in this repository, or reach out though our Discord.
