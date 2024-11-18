export interface ParticipantData {
  name: string;
  lastName: string;
  email: string;
  phone: string;
  areasOfInterest: string[];
  cvFile: File | null;
  consent: boolean;
}

export interface FormErrors {
  name?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  cvFile?: string;
  consent?: string;
}

export interface FormScreenProps {
  participantData: ParticipantData;
  handleParticipantDataChange: (
    field: keyof ParticipantData,
    value: string | boolean | string[] | File | null
  ) => void;
  handleSubmit: () => Promise<void>;
  error: string | null;
  isSubmitting: boolean;
}
