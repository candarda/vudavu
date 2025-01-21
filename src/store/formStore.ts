import { create } from 'zustand';

interface FormState {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  bankId: string;
  streetAddress: string;
  doorNumber: string;
  zipcode: string;
  city: string;
  birthDate: string;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setFirstName: (firstName: string) => void;
  setLastName: (lastName: string) => void;
  setPhone: (phone: string) => void;
  setBankId: (bankId: string) => void;
  setStreetAddress: (streetAddress: string) => void;
  setDoorNumber: (doorNumber: string) => void;
  setZipcode: (zipcode: string) => void;
  setCity: (city: string) => void;
  setBirthDate: (birthDate: string) => void;
  reset: () => void;
}

export const useFormStore = create<FormState>((set) => ({
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  phone: '',
  bankId: '',
  streetAddress: '',
  doorNumber: '',
  zipcode: '',
  city: '',
  birthDate: '',
  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
  setFirstName: (firstName) => set({ firstName }),
  setLastName: (lastName) => set({ lastName }),
  setPhone: (phone) => set({ phone }),
  setBankId: (bankId) => set({ bankId }),
  setStreetAddress: (streetAddress) => set({ streetAddress }),
  setDoorNumber: (doorNumber) => set({ doorNumber }),
  setZipcode: (zipcode) => set({ zipcode }),
  setCity: (city) => set({ city }),
  setBirthDate: (birthDate) => set({ birthDate }),
  reset: () => set({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: '',
    bankId: '',
    streetAddress: '',
    doorNumber: '',
    zipcode: '',
    city: '',
    birthDate: '',
  }),
}));