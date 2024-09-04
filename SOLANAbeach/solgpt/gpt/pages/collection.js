import { useWallet } from '@solana/wallet-adapter-react';
import Head from 'next/head';
import { useEffect, useState } from 'react'
import Loading from '../components/Loading';
import NftCard from '../components/NftCard';
import { useMetaplex } from '../hooks/useMetaplex';
import { getAllNftsByOwner } from '../utils/nfts';
import Header from '../components/Header';

const Collection = () => {
    const metaplex = useMetaplex();
    const { publicKey } = useWallet();

    const [nfts, setNfts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (publicKey) {
            setLoading(true);
            getAllNftsByOwner(metaplex)
                .then(data => {
                    setNfts(data)
                    setLoading(false);
                });
        }
    }, [publicKey, metaplex]);

    return (
        <div className='flex flex-col min-h-screen'>
            <Head>
                <title>My NFT Collection</title>
            </Head>

            <Header />

            <main className='flex-grow container mx-auto px-4 py-8'>
                <h1 className='text-4xl font-bold mb-8 text-center'>My NFT Collection</h1>

                {loading ? (
                    <div className='flex justify-center items-center h-64'>
                        <Loading />
                    </div>
                ) : (
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                        {nfts.map((nft, index) => (
                            <NftCard key={index} name={nft.name} description={nft.description} imageUrl={nft.image} />
                        ))}
                    </div>
                )}

                {!loading && nfts.length === 0 && (
                    <p className='text-center text-gray-500'>No NFTs found in your collection.</p>
                )}
            </main>
        </div>
    )
}

export default Collection;