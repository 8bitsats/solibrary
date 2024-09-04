JavaScript Client for Mpl Core
A Umi-compatible JavaScript library for the project.

Getting Started

Prerequisites

Ensure you have the Umi framework installed. If not, follow the Umi installation guide to set it up.

Installation

Install the @metaplex-foundation/mpl-core library using your preferred package manager:

Copy
npm install @metaplex-foundation/mpl-core
Integrating with Umi

Once installed, register the library with your Umi instance as shown below:

Copy
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { mplCore } from '@metaplex-foundation/mpl-core';

const umi = createUmi('<your rpc endpoint>');
umi.use(mplCore());
Usage with Frontend Wallets

For frontend wallets, such as those used in React applications, here’s an example of integrating mpl-core:

Copy
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { walletAdapterIdentity } from '@metaplex-foundation/umi-signer-wallet-adapters';

export function MyComponent() {
   const wallet = useWallet();
   const { connection } = useConnection();
   const umi = createUmi(connection)
      .use(walletAdapterIdentity(wallet))
      .use(mplCore());

   // Rest of your component logic
}
Examples

Creating an Asset

To create an asset:

Copy
const assetAddress = generateSigner(umi);
const owner = generateSigner(umi);

await create(umi, {
  name: 'Test Asset',
  uri: 'https://example.com/asset.json',
  asset: assetAddress,
  owner: owner.publicKey, // Optional, defaults to payer
}).sendAndConfirm(umi);
Fetching an Asset

To fetch an asset:

Copy
const asset = await fetchAssetV1(umi, assetAddress.publicKey);
Creating a Collection

To create a collection:

Copy
const collectionUpdateAuthority = generateSigner(umi);
const collectionAddress = generateSigner(umi);

await createCollection(umi, {
  name: 'Test Collection',
  uri: 'https://example.com/collection.json',
  collection: collectionAddress,
  updateAuthority: collectionUpdateAuthority.publicKey, // Optional, defaults to payer
}).sendAndConfirm(umi);
Fetching a Collection

To fetch a collection:

Copy
const collection = await fetchCollectionV1(umi, collectionAddress.publicKey);
Creating an Asset in a Collection

To create an asset within a collection, where the authority must be the updateAuthority of the collection:

Copy
await create(umi, {
  name: 'Test Asset',
  uri: 'https://example.com/asset.json',
  asset: assetAddress,
  collection,
  authority: collectionUpdateAuthority, // Optional, defaults to payer
}).sendAndConfirm(umi);
Transferring an Asset

To transfer an asset:

Copy
const recipient = generateSigner(umi);

await transfer(umi, {
  asset,
  newOwner: recipient.publicKey,
}).sendAndConfirm(umi);
Transferring an Asset in a Collection

To transfer an asset within a collection:

Copy
await transfer(umi, {
  asset,
  newOwner: recipient.publicKey,
  collection,
}).sendAndConfirm(umi);
Fetching Assets by Owner (GPA)

To fetch assets by owner using GPA (Get Program Accounts):

Copy
const assetsByOwner = await getAssetV1GpaBuilder(umi)
  .whereField('key', Key.AssetV1)
  .whereField('owner', owner.publicKey)
  .getDeserialized();
Fetching Assets by Collection (GPA)

To fetch assets by collection using GPA:

Copy
const assetsByCollection = await getAssetV1GpaBuilder(umi)
  .whereField('key', Key.AssetV1)
  .whereField(
    'updateAuthority',
    updateAuthority('Collection', [collectionAddress.publicKey])
  )
  .getDeserialized();
DAS API (RPC-based Indexing)

Fetching assets by owner or collection using DAS API is coming soon.

Advanced Examples

Freezing an Asset

To freeze an asset:

Copy
const assetAddress = generateSigner(umi);
const freezeDelegate = generateSigner(umi);

await addPlugin(umi, {
  asset: assetAddress.publicKey,
  plugin: {
    type: 'FreezeDelegate',
    frozen: true,
    authority: {
      type: 'Address',
      address: freezeDelegate.publicKey,
    },
  },
}).sendAndConfirm(umi);
Unfreezing an Asset with a Delegate
To unfreeze an asset and revoke the authority:

Copy
await revokePluginAuthority(umi, {
  asset: assetAddress.publicKey,
  plugin: {
    type: 'FreezeDelegate',
  },
  authority: freezeDelegate,
}).sendAndConfirm(umi);
Creating a Collection with Royalties

To create a collection with royalties:

Copy
const collectionAddress = generateSigner(umi);
const creator1 = generateSigner(umi);
const creator2 = generateSigner(umi);

await createCollection(umi, {
  name: 'Test Collection',
  uri: 'https://example.com/collection.json',
  collection: collectionAddress,
  plugins: [
    {
      type: 'Royalties',
      basisPoints: 500,
      creators: [
        {
          address: creator1.publicKey,
          percentage: 20,
        },
        {
          address: creator2.publicKey,
          percentage: 80,
        },
      ],
      ruleSet: ruleSet('None'),
    },
  ],
}).sendAndConfirm(umi);
Creating an Asset in a Collection with Royalties
To create an asset in a collection that inherits the collection’s royalties plugin:

Copy
await create(umi, {
  name: 'Test Asset',
  uri: 'https://example.com/asset.json',
  asset: assetAddress,
  collection: await fetchCollectionV1(umi, collectionAddress.publicKey),
}).sendAndConfirm(umi);