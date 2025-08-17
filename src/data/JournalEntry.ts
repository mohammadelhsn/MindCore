export type Mood = '😊' | '😢' | '😡' | '😴' | '😎' | string;

export type firestoreJournalEntry = {
	/** The author's ID */
	authorId: string;
	/** The title of the journal */
	title: string;
	/** The content of the journal */
	content: string;
	/** The tags for the journal (WIP) */
	tags?: string[];
	/** The mood for the journal (WIP) */
	mood?: Mood;
	/** Whether the journal is password protected (WIP)*/
	passwordProtected?: boolean;
	/** The location for the journal (WIP) */
	location?: string;
	/** The password for the journal if password protection is enabled (WIP) */
	password?: string | null;
	/** The ID for the journal */
	id?: string;
	/** When the journal was created at (WIP) */
	createdAt?: Date;
	/** Last updated time for the journal */
	updatedAt?: Date;
	/** Category for the journal (WIP) */
	category?: string;
};

export class JournalEntry {
	/** The ID for the journal */
	id: string;
	/** The title of the journal */
	title: string;
	/** The content of the journal */
	content: string;
	/** The author's ID */
	authorId: string;
	/** When the journal was created at */
	createdAt: Date;
	/** Last updated time for the journal */
	updatedAt: Date;
	/** The tags for the journal (WIP) */
	tags?: string[];
	/** The mood for the journal (WIP) */
	mood?: Mood;
	/** Whether the journal is password protected */
	passwordProtected?: boolean;
	/** The location for the journal */
	location?: string;
	/** The journal's category */
	category?: string;
	/** The password for the journal if password protection is enabled */
	password?: string | null;
	constructor(options: firestoreJournalEntry) {
		this.id = options?.id || crypto.randomUUID(); // fallback if you're creating locally
		this.authorId = options.authorId;
		this.title = options.title;
		this.content = options.content;
		this.tags = options?.tags ? options.tags : [];
		this.mood = options?.mood;
		this.passwordProtected = options?.passwordProtected;
		this.password = options?.password ? options.password : null;
		this.location = options?.location;
		this.createdAt = options?.createdAt ?? new Date();
		this.updatedAt = options?.updatedAt ?? new Date();
		this.category = options?.category ? options.category : 'Uncategorized';
	}
	/** Takes the class data and returns a Firestore compatible object */
	toFirestore(): firestoreJournalEntry {
		return {
			id: this.id,
			authorId: this.authorId,
			title: this.title,
			content: this.content,
			tags: this.tags ?? [],
			mood: this.mood,
			password: this.password ? this.password : null,
			passwordProtected: this.passwordProtected ?? false,
			location: this.location ?? undefined,
			createdAt: this.createdAt,
			updatedAt: this.updatedAt,
			category: this.category,
		};
	}
	/** Update the journals title */
	updateTitle(newTitle: string) {
		this.title = newTitle;
		return this;
	}
	/** Update the journals content */
	updateContent(newContent: string) {
		this.content = newContent;
		return this;
	}
	addTag(tag: string) {
		if (!this.tags) return;
		if (!this.tags.includes(tag)) this.tags.push(tag);
		return this;
	}

	removeTag(tag: string) {
		if (!this.tags) return;
		this.tags = this.tags.filter((t) => t !== tag);
		return this;
	}
	getBrief(wordLimit = 30): string {
		const words = this.content.trim().split(/\s+/);
		return words.length > wordLimit
			? words.slice(0, wordLimit).join(' ') + '...'
			: this.content;
	}
	equals(other: JournalEntry) {
		return this.id === other.id;
	}
	updateJournalEntry() {}
	/** Takes raw Firestore data and coverts it into a Journal Entry class */
	static fromFirestore(data: firestoreJournalEntry) {
		return new JournalEntry(data);
	}
}
