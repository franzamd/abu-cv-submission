import React, { useState } from 'react';
import { FormErrors, FormScreenProps } from '@/types/types';
import { isValidEmail, isValidPhone } from '@/utils/validation';
import PersonalInfo from './PersonalInfo';
import AreasOfInterest from './AreasOfInterest';
import CVUpload from './CVUpload';
import TermsAndConditions from './TermsAndConditions';
import SubmitButton from './SubmitButton';

const FormScreen: React.FC<FormScreenProps> = ({
  participantData,
  handleParticipantDataChange,
  handleSubmit,
  error,
  isSubmitting,
}) => {
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const validateForm = () => {
    const errors: FormErrors = {};

    if (!participantData.name) {
      errors.name = 'El nombre es requerido.';
    }

    if (!participantData.lastName) {
      errors.lastName = 'El apellido es requerido.';
    }

    if (!participantData.email) {
      errors.email = 'El correo electrónico es requerido.';
    } else if (!isValidEmail(participantData.email)) {
      errors.email = 'El correo electrónico no es válido.';
    }

    if (!participantData.phone) {
      errors.phone = 'El teléfono es requerido.';
    } else if (!isValidPhone(participantData.phone)) {
      errors.phone = 'El teléfono no es válido.';
    }

    if (!participantData.consent) {
      errors.consent = 'Debes aceptar los términos y condiciones.';
    }

    if (
      participantData.cvFile &&
      participantData.cvFile.size > 5 * 1024 * 1024
    ) {
      errors.cvFile = 'El archivo debe ser menor a 5 MB.';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      await handleSubmit();
    }
  };

  return (
    <div className='max-w-3xl mx-auto p-4 space-y-6'>
      <form onSubmit={handleFormSubmit}>
        <PersonalInfo
          participantData={participantData}
          handleParticipantDataChange={handleParticipantDataChange}
          formErrors={formErrors}
        />
        <AreasOfInterest
          participantData={participantData}
          handleParticipantDataChange={handleParticipantDataChange}
        />
        <CVUpload
          participantData={participantData}
          handleParticipantDataChange={handleParticipantDataChange}
          formErrors={formErrors}
        />
        <TermsAndConditions
          participantData={participantData}
          handleParticipantDataChange={handleParticipantDataChange}
          formErrors={formErrors}
        />
        {error && <p className='text-red-500'>{error}</p>}
        <SubmitButton isSubmitting={isSubmitting} />
      </form>
    </div>
  );
};

export default FormScreen;
