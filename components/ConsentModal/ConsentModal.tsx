'use client';
import React, { useEffect, useRef } from 'react';
import Modal from 'react-modal';
import { ConsentModalProps } from '@/types/types';

const ConsentModal: React.FC<ConsentModalProps> = ({
  isOpen,
  onRequestClose,
}) => {
  const appElementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      appElementRef.current = document.getElementById('__next');
    }
  }, []);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel='Términos y Condiciones'
      className='bg-white p-6 rounded-lg shadow-lg mx-auto max-w-xs md:max-w-sm mt-20'
      overlayClassName='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'
      appElement={appElementRef.current || undefined}
    >
      <h2 className='text-lg font-semibold mb-4'>Términos y Condiciones</h2>
      <p className='mb-4'>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </p>
      <p className='mb-4'>
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
        dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
        proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>
      <div className='flex justify-end'>
        <button
          onClick={onRequestClose}
          className='bg-primary text-white px-4 py-2 rounded'
        >
          Cerrar
        </button>
      </div>
    </Modal>
  );
};

export default ConsentModal;
