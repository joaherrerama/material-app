import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Profile {
  companyName?: string;
  logo?: string;
  margin: number;
  hourlyRate: number;
}

interface ProfileStore {
  profile: Profile;
  updateProfile: (profile: Profile) => void;
}

export const useProfileStore = create<ProfileStore>()(
  persist(
    (set) => ({
      profile: {
        margin: 10,
        hourlyRate: 45,
      },
      updateProfile: (profile) => set({ profile }),
    }),
    {
      name: 'profile-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);