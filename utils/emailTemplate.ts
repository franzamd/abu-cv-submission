import { ParticipantData } from '@/types/types';

export const generateEmailHtmlContent = (participantData: ParticipantData) => {
  return `
    <h1>Gracias por tu registro</h1>
    <p>Tu CV ha sido recibido y guardado correctamente.</p>
    <h2>Detalles del Registro:</h2>
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
