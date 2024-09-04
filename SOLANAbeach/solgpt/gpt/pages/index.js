import { useWallet } from '@solana/wallet-adapter-react'
import Head from 'next/head'
import { useState } from 'react'
import { useMetaplex } from '../hooks/useMetaplex'
import { motion } from 'framer-motion'
import Loading from '../components/Loading'
import Swal from 'sweetalert2'
import { useForm } from 'react-hook-form'
import { mintNFT } from '../utils/nfts'
import AIChatbot from '../components/AIChatbot'

const Home = () => {
  const wallet = useWallet();
  const metaplex = useMetaplex();

  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState(null);
  const [createdNftMetadata, setCreatedNftMetadata] = useState(null);

  const onSubmit = async data => {
    if (!generatedImage) {
      Swal.fire({
        icon: 'error',
        title: 'No image generated',
        text: 'Please generate an image using the AI chatbot before minting.',
      });
      return;
    }

    setLoading(true);
    mintNFT(
      metaplex,
      data.name,
      data.description,
      generatedImage
    ).then(nft => {
      setCreatedNftMetadata(nft?.nft.json)
      reset();
      setLoading(false);
      setGeneratedImage(null);
      Swal.fire({
        icon: 'success',
        title: 'Hey... Ya!',
        text: 'Your NFT was minted successfully!',
      });
      console.log(nft);
    }).catch(err => {
      Swal.fire({
        icon: 'error',
        title: 'Something went wrong.',
        text: err.message,
      })
      setLoading(false);
    });
  };

  const handleImageGenerated = (imageUrl) => {
    setGeneratedImage(imageUrl);
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <Head>
        <title>Solana NFT Minter with AI</title>
        <meta name="description" content="A Solana NFT minter with AI-generated images" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className='flex flex-col items-center justify-center w-full flex-1 px-20 text-center'>
        <h1 className='text-4xl font-bold mb-8'>
          Solana NFT Minter with AI
        </h1>

        <AIChatbot onImageGenerated={handleImageGenerated} />

        {generatedImage && (
          <div className='mt-8'>
            <h2 className='text-2xl font-bold mb-4'>Generated Image</h2>
            <img src={generatedImage} alt="Generated" className='max-w-xs mx-auto' />
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className='mt-8 space-y-4 w-full max-w-md'>
          <input
            {...register("name", { required: true })}
            placeholder="NFT Name"
            className='w-full px-4 py-2 border rounded-lg'
          />
          {errors.name && <span className='text-red-500'>Name is required</span>}

          <textarea
            {...register("description")}
            placeholder="NFT Description"
            className='w-full px-4 py-2 border rounded-lg'
          />

          {wallet.publicKey ?
            <button type='submit' className='w-full bg-blue-500 text-white rounded p-4 h-16 font-semibold'>
              {loading ? <Loading /> : 'Mint NFT'}
            </button>
            : <button disabled className='w-full h-16 bg-gray-500 text-white rounded p-4 font-semibold'>
              Sign in to Mint
            </button>
          }
        </form>

        {createdNftMetadata && (
          <motion.div
            key={createdNftMetadata}
            className='mt-8 p-4 border rounded-lg'
            initial={{ scale: 0, opacity: 0.5 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className='text-2xl font-bold mb-4'>Minted NFT</h2>
            <img src={createdNftMetadata.image} alt={createdNftMetadata.name} className='max-w-xs mx-auto' />
            <p className='mt-4 text-lg font-semibold'>{createdNftMetadata.name}</p>
          </motion.div>
        )}
      </main>
    </div>
  );
}

export default Home;