import {
	FacebookAuthProvider,
	GithubAuthProvider,
	GoogleAuthProvider,
} from 'firebase/auth';

export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();
export const facebookProvider = new FacebookAuthProvider();
