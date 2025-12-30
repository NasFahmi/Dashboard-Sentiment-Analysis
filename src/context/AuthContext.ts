import  { createContext } from 'react';


// 1. Definisikan tipe
type AuthContextType = {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string) => void;
  logout: () => void;
};

// 2. Buat context — pastikan ini diekspor!
export const AuthContext = createContext<AuthContextType | undefined>(undefined);
