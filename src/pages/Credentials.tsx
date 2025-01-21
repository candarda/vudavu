import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormStore } from '../store/formStore';
import { Mail, Lock, AlertCircle } from 'lucide-react';

export default function Credentials() {
  const navigate = useNavigate();
  const { email, password, setEmail, setPassword } = useFormStore();
  const [errors, setErrors] = useState({ email: '', password: '' });

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 6;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors = {
      email: !validateEmail(email) ? 'Bitte geben Sie eine gültige E-Mail-Adresse ein' : '',
      password: !validatePassword(password) ? 'Das Passwort muss mindestens 6 Zeichen lang sein' : ''
    };

    setErrors(newErrors);

    if (!newErrors.email && !newErrors.password) {
      navigate('/information');
    }
  };

  const validateForm = () => {
    const newErrors = {
      email: !validateEmail(email) ? 'Bitte geben Sie eine gültige E-Mail-Adresse ein' : '',
      password: !validatePassword(password) ? 'Das Passwort muss mindestens 6 Zeichen lang sein' : ''
    };

    setErrors(newErrors);
    return !newErrors.email && !newErrors.password;
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <div className="bg-white rounded-lg shadow-sm border p-8">
        <h1 className="text-2xl font-normal text-center mb-8">
          Anmelden
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm mb-1">
              E-Mail oder Mobilnummer
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-red-500 focus:border-red-500"
              placeholder="E-Mail eingeben"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm mb-1">
              Passwort
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-red-500 focus:border-red-500"
              placeholder="Passwort eingeben"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors.password}
              </p>
            )}
            <p className="text-xs mt-1">Mindestens 6 Zeichen</p>
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 text-white py-3 px-6 rounded font-normal
                     hover:bg-red-700 transition-colors duration-200"
          >
            Weiter
          </button>

          <div className="text-center">
            <a href="#" className="text-sm text-red-600 hover:text-red-700">
              Passwort vergessen?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}