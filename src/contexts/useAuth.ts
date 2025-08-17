import { createContext, useContext } from 'react';
import type { User } from 'firebase/auth';
import { type User as UserData } from '../data/User';

interface AuthContextType {
	user: User | null;
	loading: boolean;
	userData: UserData | null;
}
export const AuthContext = createContext<AuthContextType>({
	user: null,
	loading: true,
	userData: null,
});

export const useAuth = () => useContext(AuthContext);
