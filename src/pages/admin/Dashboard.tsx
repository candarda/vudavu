import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Plus, Trash2, RefreshCw } from 'lucide-react';

interface Submission {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  bank: {
    name: string;
  };
  created_at: string;
  street_address: string;
  door_number: string;
  zipcode: string;
  city: string;
  birth_date: string;
}

interface Bank {
  id: string;
  name: string;
  active: boolean;
}

export default function Dashboard() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [banks, setBanks] = useState<Bank[]>([]);
  const [newBankName, setNewBankName] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch submissions
      const { data: submissionsData } = await supabase
        .from('submissions')
        .select(`
          id,
          email,
          first_name,
          last_name,
          phone,
          created_at,
          bank:bank_id (name),
          street_address,
          door_number,
          zipcode,
          city,
          birth_date
        `)
        .order('created_at', { ascending: false });

      if (submissionsData) {
        setSubmissions(submissionsData);
      }

      // Fetch banks
      const { data: banksData } = await supabase
        .from('banks')
        .select('*')
        .order('name');

      if (banksData) {
        setBanks(banksData);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddBank = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBankName.trim()) return;

    try {
      const { error } = await supabase
        .from('banks')
        .insert([{ name: newBankName.trim() }]);

      if (error) throw error;

      setNewBankName('');
      fetchData();
    } catch (error) {
      console.error('Error adding bank:', error);
    }
  };

  const toggleBankStatus = async (bankId: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('banks')
        .update({ active: !currentStatus })
        .eq('id', bankId);

      if (error) throw error;

      fetchData();
    } catch (error) {
      console.error('Error toggling bank status:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <button
              onClick={fetchData}
              className="flex items-center px-4 py-2 text-sm text-gray-600 hover:text-gray-900"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </button>
          </div>

          {/* Bank Management */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Bank Management</h2>
            <form onSubmit={handleAddBank} className="flex gap-4 mb-4">
              <input
                type="text"
                value={newBankName}
                onChange={(e) => setNewBankName(e.target.value)}
                placeholder="Enter bank name"
                className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 
                         transition-colors duration-200 flex items-center"
              >
                <Plus className="h-5 w-5 mr-2" />
                Add Bank
              </button>
            </form>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {banks.map((bank) => (
                <div
                  key={bank.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <span className="font-medium">{bank.name}</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleBankStatus(bank.id, bank.active)}
                      className={`px-3 py-1 rounded text-sm font-medium ${
                        bank.active
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {bank.active ? 'Active' : 'Inactive'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Submissions */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Recent Submissions</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      E-Mail
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Telefon
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Adresse
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Geburtsdatum
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Bank
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Datum
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {submissions.map((submission) => (
                    <tr key={submission.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {submission.first_name} {submission.last_name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {submission.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {submission.phone}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {submission.street_address} {submission.door_number}, {submission.zipcode} {submission.city}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {new Date(submission.birth_date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {submission.bank?.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {new Date(submission.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}