import { create } from 'zustand';

interface LoginPayload {
  phone: string;
  otp?: string;
}

interface AuthState {
  phone: string | null;
  otpSent: boolean;
  isVerified: boolean;
  loading: boolean;

  login: (payload: LoginPayload) => Promise<boolean>;
  register: (phone: string) => Promise<boolean>;
}

export const useAuthStore = create<AuthState>((set) => ({
  phone: null,
  otpSent: false,
  isVerified: false,
  loading: false,

  login: async (payload) => {
    set({ loading: true });

    try {
      const res = await fetch(
        'https://staging.fastor.ai/v1/pwa/user/login',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) throw new Error();

      if (payload.otp) {
        set({ isVerified: true, loading: false });
      } 
      else {
        set({
          otpSent: true,
          phone: payload.phone,
          loading: false,
        });
      }

      return true;
    } catch {
      set({ loading: false });
      return false;
    }
  },

  register: async (phone) => {
    set({ loading: true });

    try {
      const res = await fetch(
        'https://staging.fastor.ai/v1/pwa/user/register',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ phone }),
        }
      );

      if (!res.ok) throw new Error();

      set({
        otpSent: true,
        phone,
        loading: false,
      });

      return true;
    } catch {
      set({ loading: false });
      return false;
    }
  },
}));
