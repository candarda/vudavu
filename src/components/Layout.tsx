import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function Layout() {
  const [imageError, setImageError] = useState(false);
  const logoUrl = 'https://rqpvzywpmhhrwuhmpwpa.supabase.co/storage/v1/object/public/assets/iconlogo.png';

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <img 
              src={logoUrl}
              alt="Logo" 
              className="h-8 w-8"
              onError={(e) => {
                console.error('Logo yükleme hatası:', e);
                setImageError(true);
              }}
              style={{ display: imageError ? 'none' : 'block' }}
            />
            <nav className="hidden sm:flex space-x-4">
              {/* Ekstra navigasyon öğeleri buraya eklenebilir */}
            </nav>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-auto">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
            <a href="#" className="hover:text-gray-700">Impressum</a>
            <a href="#" className="hover:text-gray-700">Datenschutz</a>
            <a href="#" className="hover:text-gray-700">AGB</a>
            <a href="#" className="hover:text-gray-700">Hilfe</a>
          </div>
        </div>
      </footer>
    </div>
  );
}