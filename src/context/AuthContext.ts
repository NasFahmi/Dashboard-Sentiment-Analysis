import { createContext } from 'react';


// 1. Definisikan tipe
type AuthContextType = {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (access_token: string, refresh_token: string, username: string) => void;
  logout: () => void;
  username: string;
};

// 2. Buat context — pastikan ini diekspor!
export const AuthContext = createContext<AuthContextType | undefined>(undefined);
