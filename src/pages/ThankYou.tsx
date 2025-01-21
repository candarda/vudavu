import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { useFormStore } from '../store/formStore';

export default function ThankYou() {
  const navigate = useNavigate();
  const reset = useFormStore(state => state.reset);

  useEffect(() => {
    const timer = setTimeout(() => {
      reset();
      navigate('/');
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate, reset]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
        <div className="flex justify-center mb-6">
          <CheckCircle className="w-16 h-16 text-green-500" />
        </div>
        
        <h1 className="text-3xl font-bold mb-4">
          Vielen Dank!
        </h1>
        
        <p className="text-gray-600 mb-8">
          Ihre Informationen wurden erfolgreich übermittelt. Sie werden in Kürze zur Startseite weitergeleitet.
        </p>

        <div className="animate-pulse text-sm text-gray-500">
          Weiterleitung...
        </div>
      </div>
    </div>
  );
}