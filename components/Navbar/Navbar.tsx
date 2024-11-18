import React from 'react';
import Image from 'next/image';
import { NavbarProps } from '@/types/types';

const Navbar: React.FC<NavbarProps> = () => {
  return (
    <nav className='bg-[#5e9673] p-4'>
      <div className='container mx-auto flex justify-start items-center space-x-4'>
        <div className='flex items-center space-x-4'>
          <Image
            src='/logo-abu.png'
            alt='Logo'
            className='h-10 w-auto cursor-pointer'
            width={120}
            height={40}
          />
          <div className='text-white font-bold text-lg cursor-pointer'>
            Asociación Bioquímica Uruguaya (ABU)
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
