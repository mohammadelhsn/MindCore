import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from './Firebase';

/** =========== TYPES =========== */

import { JournalEntry, type firestoreJournalEntry } from './JournalEntry';

/**
 * @description A function that updates the user data state. It accepts either a User object or null.
 */
export type setUserData = (value: User | null) => void;

export type setSuccess = (value: React.SetStateAction<boolean>) => void;
export type setErrorState = (value: React.SetStateAction<boolean>) => void;
export type setMessage = (value: React.SetStateAction<string | null>) => void;

/**
 * @description A function that sets an error value (string or null).
 */
export type setError = (value: React.SetStateAction<string | null>) => void;

export type UserObject = {
	/** Unique identifier for the user */
	uid: string;
	/** The user's name */
	name: string;
	/** The user's theme preference */
	theme: string;
	/** Whether the user has 2FA enabled */
	twoFactorEnabled: boolean;
	/** The user's preferred language */
	language?: string;
	/** The user's private journal entries */
	journals: firestoreJournalEntry[];
	/** The user's role */
	role: 'user' | 'admin';
};

/** =========== EXPORTS =========== */

export class User {
	/** Unique identifier for the user */
	uid: string;
	/** The user's name */
	name: string;
	/** The user's theme preference */
	theme: string;
	/** Whether the user has 2FA enabled */
	twoFactorEnabled: boolean;
	/** The user's preferred language */
	language?: string;
	/** The user's private journal entries */
	journals: JournalEntry[] = [];
	/** The user's role */
	role: 'user' | 'admin' = 'user';
	constructor({
		uid,
		name,
		theme = 'light',
		twoFactorEnabled = false,
		language,
		role = 'user',
		journals = [],
	}: UserObject) {
		this.uid = uid;
		this.name = name;
		this.theme = theme;
		this.twoFactorEnabled = twoFactorEnabled;
		this.language = language;
		this.role = role;
		this.journals = [];
		journals.forEach((journal) => {
			this.journals.push(new JournalEntry(journal));
		});
	}
	toFirestore() {
		const firestoreJournals: firestoreJournalEntry[] = [];
		this.journals.forEach((journal) => {
			firestoreJournals.push(journal.toFirestore());
		});
		const userObj: UserObject = {
			uid: this.uid,
			name: this.name,
			theme: this.theme,
			twoFactorEnabled: this.twoFactorEnabled,
			language: this.language,
			role: this.role,
			journals: firestoreJournals,
		};
		return userObj;
	}
	updateName(newName: string) {
		this.name = newName;
		return this;
	}
	updateTheme(newTheme: 'light' | 'dark' | 'system') {
		this.theme = newTheme;
		return this;
	}
	updateLanguage(newLanguage: string) {
		this.language = newLanguage;
		return this;
	}
	static fromFirestore(data: UserObject) {
		return new User(data);
	}
}

/** =========== FUNCTIONS =========== */

/**
 * @param {string} uid The user's ID
 * @param {setError} setError Setter for the error state of the page
 * @param {setUserData} setUserData Setter for the users data in the page
 * @returns {Promise<User | null>}
 */
export async function fetchUser(
	uid: string,
	setError?: setError,
	setUserData?: setUserData
) {
	try {
		const docRef = doc(db, 'users', uid);
		const docSnap = await getDoc(docRef);
		if (docSnap.exists()) {
			const data = docSnap.data();
			const user = User.fromFirestore(data as UserObject);

			if (setUserData) setUserData(user);

			return user;
		} else {
			if (setError) setError('Not found!');

			return null;
		}
	} catch (error) {
		console.error(error);
		return null;
	}
}

export async function saveUser(
	user: User,
	setSuccess?: setSuccess,
	setError?: setErrorState,
	setMessage?: setMessage
) {
	const userDocRef = doc(db, 'users', user.uid);
	const dataToSave = user.toFirestore();

	try {
		await setDoc(userDocRef, dataToSave, { merge: true });
		if (setMessage && setSuccess) {
			setMessage('User saved successfully');
			setSuccess(true);
		}
	} catch (error) {
		if (setMessage && setError) {
			setMessage('Oops, an error has occurred!');
			setError(true);
		}
		console.error(error);
	}
}

export async function createUser() {}
