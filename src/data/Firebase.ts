/** ========== IMPORTS ============ */
import { FirebaseError, initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup } from 'firebase/auth';
import {
	doc,
	getDoc,
	initializeFirestore,
	persistentLocalCache,
	persistentMultipleTabManager,
	setDoc,
} from 'firebase/firestore';
import { User } from './User';

/** ========== TYPES ============== */

import type { AuthProvider } from 'firebase/auth';
import FirebaseResponse from './FirebaseResponse';

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

/** Firebase App */
const app = initializeApp(firebaseConfig);

/** Firebase Authentication */
export const auth = getAuth(app);

/** Firebase Firestore */
export const db = initializeFirestore(app, {
	localCache: persistentLocalCache({
		tabManager: persistentMultipleTabManager(),
	}),
});

/** Firebase Errors and their responses */
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
 * Function that handles Provider sign up
 */
export async function handleProviderSignUp(provider: AuthProvider) {
	try {
		const result = await signInWithPopup(auth, provider);
		if (!result.user) {
			return new FirebaseResponse({
				success: false,
				data: null,
				error: null,
				message: 'Authentication failed: no user returned.',
			});
		}

		const fUser = result.user;
		const userRef = doc(db, 'users', fUser.uid);
		const docSnap = await getDoc(userRef);
		if (!docSnap.exists()) {
			const userData = new User({
				uid: fUser.uid,
				theme: 'system',
				twoFactorEnabled: false,
				role: 'user',
				language: 'en',
				name: fUser.displayName || fUser.email || 'New User',
				journals: [],
			});
			await setDoc(userRef, userData.toFirestore(), { merge: true });
		}

		return new FirebaseResponse({
			success: true,
			data: null,
			error: null,
			message: 'Sign-up successful!',
		});
	} catch (error) {
		console.error(error);
		return new FirebaseResponse(error as FirebaseError);
	}
}
