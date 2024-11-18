import { ParticipantData } from '@/types/types';

export const generateHTMLContent = (participantData: ParticipantData) => {
  return `
    <h1>Datos del Profesional</h1>
    <p><strong>Nombre:</strong> ${participantData.name}</p>
    <p><strong>Apellido:</strong> ${participantData.lastName}</p>
    <p><strong>Email:</strong> ${participantData.email}</p>
    <p><strong>Teléfono (WhatsApp):</strong> ${participantData.phone}</p>
    <p><strong>Áreas de Interés:</strong> ${participantData.areasOfInterest.join(
      ', '
    )}</p>
    <p><strong>Consentimiento:</strong> ${
      participantData.consent ? 'Sí' : 'No'
    }</p>
  `;
};
