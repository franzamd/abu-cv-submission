import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { ParticipantData } from '@/types/types';

interface AreasOfInterestProps {
  participantData: ParticipantData;
  handleParticipantDataChange: (
    field: keyof ParticipantData,
    value: string[]
  ) => void;
}

const areasOfInterest = [
  'Análisis Clínicos',
  'Asuntos Regulatorios',
  'Bacteriología y Micología',
  'Bioquímica',
  'Biotecnología',
  'Bromatología y Nutrición',
  'Capacitación',
  'Desarrollo',
  'Hematología',
  'Inmunología',
  'Investigación',
  'Microbiología',
  'Parasitología',
  'Toxicología',
  'Otros',
];

const AreasOfInterest: React.FC<AreasOfInterestProps> = ({
  participantData,
  handleParticipantDataChange,
}) => {
  const handleAreaOfInterestChange = (area: string) => {
    const updatedAreas = participantData.areasOfInterest.includes(area)
      ? participantData.areasOfInterest.filter((a) => a !== area)
      : [...participantData.areasOfInterest, area];
    handleParticipantDataChange('areasOfInterest', updatedAreas);
  };

  return (
    <Card className='mb-6'>
      <CardHeader>
        <CardTitle>Áreas de Interés</CardTitle>
        <p className='text-sm text-gray-500'>
          Selecciona las áreas en las que estás interesado.
        </p>
      </CardHeader>
      <CardContent>
        <div className='space-y-2'>
          {areasOfInterest.map((area) => (
            <div key={area} className='flex items-center space-x-2'>
              <Checkbox
                id={area}
                checked={participantData.areasOfInterest.includes(area)}
                onCheckedChange={() => handleAreaOfInterestChange(area)}
              />
              <Label htmlFor={area}>{area}</Label>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AreasOfInterest;
