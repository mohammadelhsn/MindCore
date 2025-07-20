import { serverTimestamp, DocumentSnapshot } from 'firebase/firestore';

type Mood = '😊' | '😢' | '😡' | '😴' | '😎' | string;

export class JournalEntry {
	id: string;
	title: string;
	content: string;
	authorId: string;
	createdAt: Date;
	updatedAt: Date;
	tags?: string[];
	mood?: Mood;
	passwordProtected?: boolean;
	location?: string;

	constructor(
		authorId: string,
		title: string,
		content: string,
		options?: {
			tags?: string[];
			mood?: Mood;
			passwordProtected?: boolean;
			location?: string;
			id?: string; // Optional for Firestore-generated docs
			createdAt?: Date;
			updatedAt?: Date;
		}
	) {
		this.id = options?.id || crypto.randomUUID(); // fallback if you're creating locally
		this.authorId = authorId;
		this.title = title;
		this.content = content;
		this.tags = options?.tags;
		this.mood = options?.mood;
		this.passwordProtected = options?.passwordProtected;
		this.location = options?.location;
		this.createdAt = options?.createdAt ?? new Date();
		this.updatedAt = options?.updatedAt ?? new Date();
	}

	updateContent(newTitle: string, newContent: string) {
		this.title = newTitle;
		this.content = newContent;
		this.updatedAt = new Date();
	}

	toFirestore() {
		return {
			authorId: this.authorId,
			title: this.title,
			content: this.content,
			tags: this.tags ?? [],
			mood: this.mood,
			passwordProtected: this.passwordProtected ?? false,
			location: this.location ?? null,
			createdAt: serverTimestamp(),
			updatedAt: serverTimestamp(),
		};
	}

	toJSON() {
		return {
			id: this.id,
			authorId: this.authorId,
			title: this.title,
			content: this.content,
			tags: this.tags,
			mood: this.mood,
			passwordProtected: this.passwordProtected,
			location: this.location,
			createdAt: this.createdAt,
			updatedAt: this.updatedAt,
		};
	}

	static fromFirestore(doc: DocumentSnapshot): JournalEntry | null {
		if (!doc.exists()) return null;
		const data = doc.data();
		return new JournalEntry(data.authorId, data.title, data.content, {
			tags: data.tags,
			mood: data.mood,
			passwordProtected: data.passwordProtected,
			location: data.location,
			id: doc.id,
			createdAt: data.createdAt?.toDate?.() ?? new Date(),
			updatedAt: data.updatedAt?.toDate?.() ?? new Date(),
		});
	}
}
