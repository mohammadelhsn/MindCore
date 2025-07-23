import { doc, getDoc, type DocumentData } from 'firebase/firestore';
import { db } from './Firebase';

/** =========== TYPES =========== */

import type { JournalEntry } from './JounralEntry';

/**
 * @description A function that updates the user data state. It accepts either a User object or null.
 */
export type setUserData = (value: User | null) => void;
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
	journals: JournalEntry[];
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
		this.journals = journals;
	}
}

/** =========== FUNCTIONS =========== */

/**
 * @description Converts User to JSON data for storage to Firestore
 *
 * @param {User} user The user data to convert into json
 * @returns {UserObject} The JSON version of the user's data
 */
export function userToFirestore(user: User) {
	const userObject: UserObject = {
		uid: user.uid,
		name: user.name,
		theme: user.theme,
		twoFactorEnabled: user.twoFactorEnabled,
		language: user.language,
		role: user.role,
		journals: user.journals,
	};
	return userObject;
}

export function firestoreToUser(d: DocumentData) {
	const data = d as UserObject;
	const user = new User({
		uid: data.uid,
		name: data.name,
		theme: data.theme,
		twoFactorEnabled: data.twoFactorEnabled,
		language: data.language,
		role: data.role,
		journals: data.journals,
	});
	return user;
}

/**
 *
 * @param {string} uid The user's ID
 * @param {setError} setError Setter for the error state of the page
 * @param {setUserData} setUserData Setter for the users data in the page
 * @returns {Promise<User | null>}
 */
export async function fetchUser(
	uid: string,
	setError: setError,
	setUserData?: setUserData
) {
	try {
		const docRef = doc(db, 'users', uid);
		const docSnap = await getDoc(docRef);
		if (docSnap.exists()) {
			const data = docSnap.data();
			const user = firestoreToUser(data);

			if (setUserData) {
				setUserData(user);
			}
			return user;
		} else {
			setError('Not found!');
			return null;
		}
	} catch (error) {
		console.error(error);
		return null;
	}
}

export async function storeUser() {}
export async function updateUser() {}
