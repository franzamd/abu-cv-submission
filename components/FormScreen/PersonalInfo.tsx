import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ParticipantData, FormErrors } from '@/types/types';
import { isValidEmail, isValidPhone } from '@/utils/validation';

interface PersonalInfoProps {
  participantData: ParticipantData;
  handleParticipantDataChange: (
    field: keyof ParticipantData,
    value: string
  ) => void;
  formErrors: FormErrors;
}

const PersonalInfo: React.FC<PersonalInfoProps> = ({
  participantData,
  handleParticipantDataChange,
  formErrors,
}) => {
  const [localErrors, setLocalErrors] = useState<FormErrors>({});

  const validateField = (field: keyof ParticipantData, value: string) => {
    const errors: FormErrors = { ...localErrors };

    if (field === 'name' && !value) {
      errors.name = 'El nombre es requerido.';
    } else {
      delete errors.name;
    }

    if (field === 'lastName' && !value) {
      errors.lastName = 'El apellido es requerido.';
    } else {
      delete errors.lastName;
    }

    if (field === 'email') {
      if (!value) {
        errors.email = 'El correo electrónico es requerido.';
      } else if (!isValidEmail(value)) {
        errors.email = 'El correo electrónico no es válido.';
      } else {
        delete errors.email;
      }
    }

    if (field === 'phone') {
      if (!value) {
        errors.phone = 'El teléfono es requerido.';
      } else if (!isValidPhone(value)) {
        errors.phone = 'El teléfono no es válido.';
      } else {
        delete errors.phone;
      }
    }

    setLocalErrors(errors);
  };

  const handleInputChange = (field: keyof ParticipantData, value: string) => {
    handleParticipantDataChange(field, value);
  };

  const handleBlur = (field: keyof ParticipantData, value: string) => {
    validateField(field, value);
  };

  return (
    <Card className='mb-6'>
      <CardHeader>
        <CardTitle>Datos del Profesional</CardTitle>
        <p className='text-sm text-gray-500'>
          Por favor, ingresa tus datos personales.
        </p>
      </CardHeader>
      <CardContent>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div>
            <Label
              htmlFor='name'
              className='block text-sm font-medium text-gray-700'
            >
              Nombre
            </Label>
            <Input
              id='name'
              value={participantData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              onBlur={(e) => handleBlur('name', e.target.value)}
              className='mt-1 block w-full'
            />
            {localErrors.name && (
              <p className='text-red-500 text-sm mt-1'>{localErrors.name}</p>
            )}
          </div>
          <div>
            <Label
              htmlFor='lastName'
              className='block text-sm font-medium text-gray-700'
            >
              Apellido
            </Label>
            <Input
              id='lastName'
              value={participantData.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              onBlur={(e) => handleBlur('lastName', e.target.value)}
              className='mt-1 block w-full'
            />
            {localErrors.lastName && (
              <p className='text-red-500 text-sm mt-1'>
                {localErrors.lastName}
              </p>
            )}
          </div>
          <div>
            <Label
              htmlFor='email'
              className='block text-sm font-medium text-gray-700'
            >
              Correo Electrónico
            </Label>
            <Input
              id='email'
              value={participantData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              onBlur={(e) => handleBlur('email', e.target.value)}
              className='mt-1 block w-full'
            />
            {localErrors.email && (
              <p className='text-red-500 text-sm mt-1'>{localErrors.email}</p>
            )}
          </div>
          <div>
            <Label
              htmlFor='phone'
              className='block text-sm font-medium text-gray-700'
            >
              Teléfono (WhatsApp)
            </Label>
            <Input
              id='phone'
              value={participantData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              onBlur={(e) => handleBlur('phone', e.target.value)}
              className='mt-1 block w-full'
            />
            {localErrors.phone && (
              <p className='text-red-500 text-sm mt-1'>{localErrors.phone}</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonalInfo;
