import React from 'react';

const NftCard = ({ name, description, imageUrl }) => {
  return (
    <div className='w-full bg-white rounded-lg shadow-md overflow-hidden'>
      <img src={imageUrl} alt={name} className='w-full h-48 object-cover' />
      <div className='p-4'>
        <h2 className='text-xl font-bold mb-2 truncate'>{name}</h2>
        <p className='text-gray-600 text-sm line-clamp-2'>{description}</p>
      </div>
    </div>
  );
};

export default NftCard;