Metaplex Sugar
This is the alpha for the candy machine homie

Sugar: A Candy Machine CLI


Sugar is an alternative to the current Metaplex Candy Machine CLI. It has been written from the ground up and includes several improvements:

better performance for upload of media/metadata files and deploy of the candy machine — these operations take advantage of multithreaded systems to significantly speed up the computational time needed;

simplified build and installation procedures taking advantage of cargo package management, including a binary distributable package ready to use;

robust error handling and validation of inputs, including improvements to config and cache files, leading to more informative error messages.

See the docs for full installation and usage instructions.

Installation
Recommended Method
For macOS, Linux and Windows Subsystem Linux (WSL), run the following install script in your terminal:

Copy
bash <(curl -sSf https://raw.githubusercontent.com/metaplex-foundation/sugar/main/script/sugar-install.sh)
For Windows:

Download this installer binary and execute it. Since it is not a verified Windows binary you may have to choose "Run Anyway" from "More Info" on the pop-up Windows dialog.

Dependencies: When installing on Ubuntu or WSL (Windows Subsystem Linux), you may need to install some additional dependencies:

Copy
sudo apt install libudev-dev pkg-config unzip
Developers
Using Crates.io:

Copy
cargo install sugar-cli
Build From Source:

Copy
cargo install --path ./
Quick Start
Set up your Solana CLI config with an RPC url and a keypair:

Copy
solana config set --url <rpc url> --keypair <path to keypair file>
Sugar will then use these settings by default if you don't specify them as CLI options, allowing commands to be much simpler.

Create a folder named assets to store your json and media file pairs with the naming convention 0.json, 0., 1.json, 1., etc., where the extension is .png, .jpg, etc. This is the same format described in the Candy Machine v2 documentation.

You can then use the launch command to start an interactive process to create your config file and deploy a Candy Machine to Solana:

Copy
sugar launch
At the end of the execution of the launch command, the Candy Machine will be deployed on-chain