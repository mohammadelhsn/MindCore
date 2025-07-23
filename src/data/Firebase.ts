/** IMPORTS */
import { FirebaseError, initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup } from 'firebase/auth';
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import { User, userToFirestore } from './User';
import { type NavigateFunction } from 'react-router-dom';

/** ======= TYPES ======= */

import type { AuthProvider } from 'firebase/auth';

type setLoading = (value: React.SetStateAction<boolean>) => void;
type setError = (value: React.SetStateAction<string | null>) => void;

/** ======= FIREBASE CONFIG ======= */

const firebaseConfig = {
	apiKey: 'AIzaSyDh7gmCY_23xuF8DVqyv8MxU2srxjisK8Y',
	authDomain: 'mindcore-dev.firebaseapp.com',
	projectId: 'mindcore-dev',
	storageBucket: 'mindcore-dev.firebasestorage.app',
	messagingSenderId: '575053195368',
	appId: '1:575053195368:web:aba03bf4582749505733dd',
	measurementId: 'G-C26LYWFD0C',
};

/**
 * @description Firebase App
 */
const app = initializeApp(firebaseConfig);

/** ======= EXPORTED MEMBERS ======= */

/**
 * @description Firebase Authentication
 */
export const auth = getAuth(app);

/**
 * @description Firebase Firestore
 */
export const db = getFirestore(app);

/**
 * @description Firebase Errors and their responses
 */
export const firebaseErrors: Record<string, string> = {
	'auth/popup-closed-by-user': 'Sign-in popup closed before completion.',
	'auth/cancelled-popup-request':
		'Popup sign-in request cancelled. Please try again.',
	'auth/popup-blocked': 'Popup blocked by browser. Please allow popups.',
	'auth/account-exists-with-different-credential':
		'An account already exists with the same email but different sign-in method.',
	'auth/network-request-failed':
		'Network error. Check your connection and try again.',
	'auth/operation-not-allowed':
		'Google sign-in is not enabled. Contact support.',
};

/**
 * @description Converts FirebaseError.code to a string for handling
 *
 * @param error The error to handle
 * @param setError The state setter for the page
 */

export function handleFirebaseAuthError(
	error: FirebaseError,
	setError: setError
) {
	const e = firebaseErrors[error.code] || 'An unknown Firebase error occurred!';
	if (e == 'An unknown Firebase error occurred!') console.error(error);
	setError(e);
	return;
}

/**
 * @description Function to handle the sign in for any provider
 *
 * @param {AuthProvider} provider The Google auth provider with the necessary scopes
 * @param {NavigateFunction} navigate The navigate function
 * @param {setError} setError The error state setter for the page
 * @param {setLoading} setLoading The loading state setter for the page
 */
export async function handleProviderSignIn(
	provider: AuthProvider,
	navigate: NavigateFunction,
	setError: setError,
	setLoadingPage: setLoading,
	setLoadingButton: setLoading
) {
	try {
		await signInWithPopup(auth, provider);
		navigate('/dashboard');
	} catch (error) {
		if (error instanceof FirebaseError) {
			handleFirebaseAuthError(error, setError);
		} else {
			setError('An unknown error occurred.');
			console.error((error as Error).message);
		}
	} finally {
		setLoadingPage(false);
		setLoadingButton(false);
	}
}

/**
 * @description Function that handles Provider sign up
 *
 * @param provider The Provider for Google Auth
 * @param navigate The navigate function
 * @param setError The setter for the error state
 * @param setLoading The setter for the loading state
 */
export async function handleProviderSignUp(
	provider: AuthProvider,
	navigate: NavigateFunction,
	setError: setError,
	setLoading: setLoading,
	setLoadingButton: setLoading
) {
	try {
		const result = await signInWithPopup(auth, provider);
		if (result.user) {
			const fUser = result.user;
			const userRef = doc(db, 'users', fUser.uid);
			const userData = new User({
				uid: fUser.uid,
				theme: 'system',
				twoFactorEnabled: false,
				role: 'user',
				language: 'en',
				name: fUser.displayName
					? fUser.displayName
					: fUser.email
					? fUser.email
					: '',
				journals: [],
			});
			await setDoc(userRef, userToFirestore(userData), { merge: true });
			navigate('/dashboard');
		}
	} catch (error) {
		if (error instanceof FirebaseError) {
			handleFirebaseAuthError(error, setError);
		} else {
			setError('An unknown error occurred.');
			console.error((error as Error).message);
		}
	} finally {
		setLoading(false);
		setLoadingButton(false);
	}
}
