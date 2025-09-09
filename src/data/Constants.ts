import {
	FacebookAuthProvider,
	GithubAuthProvider,
	GoogleAuthProvider,
} from 'firebase/auth';

/** Google Auth Provider for this Project */
export const googleProvider = new GoogleAuthProvider();
/** Github Auth Provider for this Project */
export const githubProvider = new GithubAuthProvider();
/** Facebook Auth Provider for this Project */
export const facebookProvider = new FacebookAuthProvider();
