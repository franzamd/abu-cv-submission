import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { ParticipantData, FormErrors } from '@/types/types';

interface CVUploadProps {
  participantData: ParticipantData;
  handleParticipantDataChange: (
    field: keyof ParticipantData,
    value: File | null
  ) => void;
  formErrors: FormErrors;
}

const CVUpload: React.FC<CVUploadProps> = ({
  participantData,
  handleParticipantDataChange,
  formErrors,
}) => {
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [isDragActive, setIsDragActive] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      handleFileUpload(file);
    }
  };

  const handleFileUpload = (file: File) => {
    if (file.type !== 'application/pdf') {
      setFileError('Solo se permiten archivos PDF.');
      setCvFile(null);
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setFileError('El archivo debe ser menor a 5 MB.');
      setCvFile(null);
      return;
    }

    setFileError(null);
    setCvFile(file);
    handleParticipantDataChange('cvFile', file);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragActive(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragActive(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragActive(false);
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile) {
      handleFileUpload(droppedFile);
    }
  };

  return (
    <Card className='mb-6'>
      <CardHeader>
        <CardTitle>CV (opcional)</CardTitle>
        <p className='text-sm text-gray-500'>
          Arrastra y suelta tu CV aquí o haz clic para seleccionar un archivo.
          <br />
          Tamaño máximo: 5 MB. Tipo de archivo permitido: PDF.
        </p>
      </CardHeader>
      <CardContent>
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-2 border-dashed border-gray-300 p-4 text-center ${
            isDragActive ? 'border-blue-500' : ''
          }`}
        >
          <Label htmlFor='cvFile' className='cursor-pointer'>
            Arrastra y suelta tu CV aquí o haz clic para seleccionar un archivo
          </Label>
          <input
            type='file'
            id='cvFile'
            accept='.pdf'
            onChange={handleFileChange}
            className='hidden'
          />
          {cvFile ? (
            <p className='mt-2'>Archivo seleccionado: {cvFile.name}</p>
          ) : (
            <p className='mt-2'>No se ha seleccionado ningún archivo.</p>
          )}
          {fileError && <p className='text-red-500 mt-2'>{fileError}</p>}
          {formErrors.cvFile && (
            <p className='text-red-500 mt-2'>{formErrors.cvFile}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CVUpload;
