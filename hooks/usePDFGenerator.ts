import { useState } from 'react';
import { generateHTMLContent } from '@/utils/pdfGenerator';
import { ParticipantData } from '@/types/types';

const usePDFGenerator = () => {
  const [pdfContent, setPdfContent] = useState<string>('');

  const generate = (participantData: ParticipantData) => {
    const content = generateHTMLContent(participantData);
    setPdfContent(content);
  };

  return { pdfContent, generate };
};

export default usePDFGenerator;
