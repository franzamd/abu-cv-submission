import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { ParticipantData, FormErrors } from '@/types/types';

interface TermsAndConditionsProps {
  participantData: ParticipantData;
  handleParticipantDataChange: (
    field: keyof ParticipantData,
    value: boolean
  ) => void;
  formErrors: FormErrors;
}

const TermsAndConditions: React.FC<TermsAndConditionsProps> = ({
  participantData,
  handleParticipantDataChange,
  formErrors,
}) => {
  const [isConsentModalOpen, setIsConsentModalOpenState] =
    useState<boolean>(false);

  const handleConsentChange = (checked: boolean) => {
    handleParticipantDataChange('consent', checked);
    delete formErrors.consent;
  };

  const handleConsentModalOpen = () => {
    setIsConsentModalOpenState(true);
  };

  const handleConsentModalClose = (accepted: boolean) => {
    setIsConsentModalOpenState(false);
    if (accepted) {
      handleConsentChange(true);
    } else {
      handleConsentChange(false);
    }
  };

  return (
    <>
      <Card className='mb-6'>
        <CardHeader>
          <CardTitle>Términos y Condiciones</CardTitle>
          <p className='text-sm text-gray-500'>
            Por favor, acepta los términos y condiciones para continuar.
          </p>
        </CardHeader>
        <CardContent>
          <div className='flex items-center space-x-2'>
            <Checkbox
              id='consent'
              checked={participantData.consent}
              onCheckedChange={() => handleConsentModalOpen()}
            />
            <Label htmlFor='consent'>Acepto los términos y condiciones</Label>
          </div>
          {formErrors.consent && (
            <p className='text-red-500 text-sm mt-2'>{formErrors.consent}</p>
          )}
        </CardContent>
      </Card>

      {isConsentModalOpen && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
          <div className='bg-white p-6 rounded-lg shadow-lg max-w-xl w-full'>
            <h2 className='text-2xl font-bold mb-4'>Términos y Condiciones</h2>
            <div className='max-h-96 overflow-y-auto bg-gray-100 p-4 rounded-md'>
              <p className='mb-4 text-gray-700 text-base'>
                <strong>1. Aceptación de los Términos y Condiciones</strong>
                <br />
                Al completar y enviar este formulario, usted acepta y se
                compromete a cumplir con los siguientes términos y condiciones.
                Si no está de acuerdo con alguno de estos términos, por favor no
                complete ni envíe el formulario.
              </p>
              <p className='mb-4 text-gray-700 text-base'>
                <strong>2. Uso de la Información</strong>
                <br />
                Los datos proporcionados en este formulario serán utilizados por
                la Asociación Bioquímica Uruguaya con el propósito de:
                <br />
                - Publicar su información en nuestro sitio web y otros canales
                de comunicación para que los interesados puedan contactarlo.
                <br />
                - Facilitar oportunidades de trabajo, colaboración y
                relacionamiento en el ámbito de la bioquímica y áreas afines.
                <br />- Mejorar nuestros servicios y proporcionar información
                relevante sobre oportunidades profesionales.
              </p>
              <p className='mb-4 text-gray-700 text-base'>
                <strong>3. Publicación de Datos</strong>
                <br />
                Sus datos personales, incluyendo nombre, apellido, correo
                electrónico, teléfono y áreas de interés, serán publicados en
                nuestro sitio web y otros canales de comunicación para que los
                interesados puedan contactarlo. Su CV (si lo proporciona) no
                será publicado, pero estará disponible para su revisión por
                parte de la Asociación Bioquímica Uruguaya.
              </p>
              <p className='mb-4 text-gray-700 text-base'>
                <strong>4. Confidencialidad</strong>
                <br />
                La Asociación Bioquímica Uruguaya se compromete a proteger su
                privacidad y a utilizar sus datos de acuerdo con las leyes y
                regulaciones aplicables. Sin embargo, una vez que sus datos sean
                publicados, no podemos garantizar su confidencialidad frente a
                terceros que accedan a la información publicada.
              </p>
              <p className='mb-4 text-gray-700 text-base'>
                <strong>5. Derechos del Usuario</strong>
                <br />
                Usted tiene el derecho de solicitar la eliminación de sus datos
                de nuestros registros en cualquier momento. Para hacerlo, por
                favor contacte a la Asociación Bioquímica Uruguaya a través de
                los canales de comunicación proporcionados en nuestro sitio web.
              </p>
              <p className='mb-4 text-gray-700 text-base'>
                <strong>6. Cambios en los Términos y Condiciones</strong>
                <br />
                La Asociación Bioquímica Uruguaya se reserva el derecho de
                modificar estos términos y condiciones en cualquier momento.
                Cualquier cambio será notificado a través de nuestro sitio web y
                será efectivo a partir de la fecha de publicación.
              </p>
              <p className='mb-4 text-gray-700 text-base'>
                <strong>7. Consentimiento</strong>
                <br />
                Al marcar la casilla de "Acepto los términos y condiciones",
                usted confirma que ha leído, entendido y aceptado todos los
                términos y condiciones descritos anteriormente.
              </p>
            </div>
            <div className='flex justify-end space-x-4 mt-4'>
              <button
                onClick={() => handleConsentModalClose(true)}
                className='bg-primary text-white px-4 py-2 rounded'
              >
                Aceptar
              </button>
              <button
                onClick={() => handleConsentModalClose(false)}
                className='bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-secondary'
              >
                No estoy de acuerdo
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TermsAndConditions;
