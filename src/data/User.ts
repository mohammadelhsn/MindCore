import type { JournalEntry } from './JounralEntry';
type setUserData = (value: any) => void;
type setError = (value: React.SetStateAction<string | null>) => void;
export class User {
	uid: string;
	name: string;
	theme: string;
	twoFactorEnabled: boolean;
	language?: string;
	journals: JournalEntry[] = [];
	role: 'user' | 'admin' = 'user';
	constructor({
		uid,
		name,
		theme = 'light',
		twoFactorEnabled = false,
		language,
		role = 'user',
	}: {
		uid: string;
		name: string;
		theme?: string;
		twoFactorEnabled?: boolean;
		language?: string;
		role?: 'user' | 'admin';
	}) {
		this.uid = uid;
		this.name = name;
		this.theme = theme;
		this.twoFactorEnabled = twoFactorEnabled;
		this.language = language;
		this.role = role;
	}

	toFirestore() {
		return {
			uid: this.uid,
			name: this.name,
			theme: this.theme,
			twoFactorEnabled: this.twoFactorEnabled,
			language: this.language,
			role: this.role,
			journals: this.journals,
		};
	}
	async store() {}
	async update(changes: Partial<User>) {}
	static fetch(uid: string, setUserData: setUserData, setError: setError) {}
}
