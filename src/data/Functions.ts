import { doc, getDoc } from 'firebase/firestore';
import { db } from './Firebase';
import type React from 'react';

type setUserData = (value: any) => void;
type setError = (value: React.SetStateAction<string>) => void;

export async function getUserData(
	uid: string,
	setUserData: setUserData,
	setError: setError
) {
	try {
		const docRef = doc(db, 'users', uid);
		const docSnap = await getDoc(docRef);

		if (docSnap.exists()) {
			setUserData(docSnap.data());
		} else {
			setError('Not found!');
		}
	} catch (error) {
		console.error(error);
	}
}

export async function handleGoogleSignUp() {}
export async function handleGoogleSignIn() {}

export async function handleEmailPasswordSignUp() {}
export async function handleEmailPasswordSignIn() {}
