import { createContext, useEffect, useState, type ReactNode } from 'react';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { auth, db } from '../data/Firebase';
import { User as UserData, type UserObject } from '../data/User';
import { doc, onSnapshot } from 'firebase/firestore';

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
        let unsubscribeFirestore = () => { };
        const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(true);
            if (currentUser) {
                const docRef = doc(db, "users", currentUser.uid);
                unsubscribeFirestore = onSnapshot(docRef, (docSnap) => {
                    if (docSnap.exists()) {
                        setUserData(new UserData(docSnap.data() as UserObject));
                    } else {
                        setUserData(null);
                    }
                    setLoading(false);
                });
            } else {
                setUserData(null);
                setLoading(false);
            }
        });

        return () => {
            unsubscribeAuth();
            unsubscribeFirestore();
        };
    }, []);
    return (
        <AuthContext.Provider value={{ user, loading, userData }}>{children}</AuthContext.Provider>
    );
};

export { AuthProvider };