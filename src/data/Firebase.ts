import { initializeApp } from 'firebase/app';
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyDh7gmCY_23xuF8DVqyv8MxU2srxjisK8Y',
	authDomain: 'mindcore-dev.firebaseapp.com',
	projectId: 'mindcore-dev',
	storageBucket: 'mindcore-dev.firebasestorage.app',
	messagingSenderId: '575053195368',
	appId: '1:575053195368:web:aba03bf4582749505733dd',
	measurementId: 'G-C26LYWFD0C',
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);
