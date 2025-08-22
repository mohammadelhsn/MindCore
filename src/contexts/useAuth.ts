import { createContext, useContext } from 'react';
import type { AuthContextType } from '../data/Types';

export const AuthContext = createContext<AuthContextType>({
	user: null,
	loading: true,
	userData: null,
});

export const useAuth = () => useContext(AuthContext);
