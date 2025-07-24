import { createContext, useEffect, useState, type ReactNode } from 'react';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { auth } from '../data/Firebase';
import { User as UserData, fetchUser } from '../data/User';

interface AuthContextType {
    user: User | null;
    loading: boolean;
    userData: UserData | null;
}

export const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    userData: null
});

const AuthProvider = ({ children }: { children: ReactNode; }) => {
    /** @description Firebase User */
    const [user, setUser] = useState<User | null>(null);
    /** @description The custom UserData for the authenticated user */
    const [userData, setUserData] = useState<UserData | null>(null);
    /** @description Loading the User state */
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            const fetchUserData = async () => {
                if (currentUser) {
                    const data = await fetchUser(currentUser.uid);
                    setUserData(data);
                } else {
                    setUserData(null);
                }
            };
            fetchUserData();
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);
    return (
        <AuthContext.Provider value={{ user, loading, userData }}>{children}</AuthContext.Provider>
    );
};

export { AuthProvider };