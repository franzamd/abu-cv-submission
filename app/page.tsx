'use client';

import React, { useState } from 'react';
import axios from 'axios';

import Navbar from '@/components/Navbar/Navbar';
import FormScreen from '@/components/FormScreen/FormScreen';
import ConsentModal from '@/components/ConsentModal/ConsentModal';

import usePDFGenerator from '@/hooks/usePDFGenerator';

import { ParticipantData } from '@/types/types';

const initialParticipantData: ParticipantData = {
  name: '',
  lastName: '',
  email: '',
  phone: '',
  areasOfInterest: [],
  consent: false,
  cvFile: null,
};

const HomePage: React.FC = () => {
  const [participantData, setParticipantData] = useState<ParticipantData>(
    initialParticipantData
  );
  const [error, setError] = useState<string | null>(null);
  const [isConsentModalOpen, setIsConsentModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { generate } = usePDFGenerator();

  const handleParticipantDataChange = (
    field: keyof ParticipantData,
    value: string | boolean | string[] | File | null
  ) => {
    setParticipantData({
      ...participantData,
      [field]: value,
    });
  };

  const handleSubmit = async () => {
    if (!participantData.consent) {
      setError('Debes aceptar los términos y condiciones.');
      return;
    }

    const formData = new FormData();
    formData.append('orderData', JSON.stringify(participantData));

    if (participantData.cvFile) {
      formData.append('pdf', participantData.cvFile, 'cv.pdf');
    }

    try {
      console.log('Datos del formulario a enviar:', participantData);
      setIsSubmitting(true);
      await axios.post('/api/submit', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setError(null);
      alert('Formulario enviado con éxito.');
    } catch (error) {
      console.error('Error submitting form', error);
      setError((error as Error).message || 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className='max-w-3xl mx-auto p-4 space-y-6'>
        <FormScreen
          participantData={participantData}
          handleParticipantDataChange={handleParticipantDataChange}
          handleSubmit={handleSubmit}
          error={error}
          isSubmitting={isSubmitting}
        />
        <ConsentModal
          isOpen={isConsentModalOpen}
          onRequestClose={() => setIsConsentModalOpen(false)}
        />
      </div>
    </div>
  );
};

export default HomePage;
