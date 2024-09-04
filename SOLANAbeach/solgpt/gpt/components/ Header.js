import React from 'react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import Link from 'next/link';

const Header = () => {
  return (
    <header className='bg-blue-500 text-white p-4'>
      <div className='container mx-auto flex justify-between items-center'>
        <Link href="/" className='text-2xl font-bold'>
          Solana NFT Minter
        </Link>
        <nav>
          <ul className='flex space-x-4'>
            <li>
              <Link href="/" className='hover:text-blue-200'>
                Home
              </Link>
            </li>
            <li>
              <Link href="/collection" className='hover:text-blue-200'>
                My Collection
              </Link>
            </li>
          </ul>
        </nav>
        <WalletMultiButton />
      </div>
    </header>
  );
};

export default Header;