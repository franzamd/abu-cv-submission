import React from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface SubmitButtonProps {
  isSubmitting: boolean;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ isSubmitting }) => {
  return (
    <div className='flex justify-end'>
      <Button
        type='submit'
        className='bg-primary text-white'
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className='mr-2 h-4 w-4 animate-spin' />
            Enviando...
          </>
        ) : (
          'Enviar'
        )}
      </Button>
    </div>
  );
};

export default SubmitButton;
