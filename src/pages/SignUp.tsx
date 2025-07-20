import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import { Alert, Snackbar, type SnackbarOrigin } from '@mui/material';
import { useContext, useState } from 'react';
import { auth, db } from '../data/Firebase';
import { GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate, type NavigateFunction } from 'react-router-dom';
import { FirebaseError } from 'firebase/app';
import { setDoc, doc } from 'firebase/firestore';
import { AuthContext } from '../contexts/AuthContext';
import { User } from '../data/User';

const SignUpPage = () => {
    /** GET THE AUTH CONTEXT */

    const { user } = useContext(AuthContext);

    /** EMAIL, EMAIL ERROR STATES */

    const [email, setEmail] = useState<string>('');
    const [emailError, setEmailError] = useState<string | null>(null);

    /** NAME, NAME ERROR STATES */

    const [name, setName] = useState<string>('');
    const [nameError, setNameError] = useState<string | null>(null);

    /** PASSWORD, PASSWORD ERROR STATES */

    const [password, setPassword] = useState<string>('');
    const [passwordError, setPasswordError] = useState<string | null>(null);

    /** FIREBASE ERROR STATE */

    const [error, setError] = useState<string | null>(null);

    /** NAVIGATION HOOK */

    const navigate: NavigateFunction = useNavigate();

    /** IF A USER EXISTS THEY SHOULD NOT BE ABLE TO ACCESS THIS PAGE */
    if (user) {
        navigate('/dashboard');
    }
    const handleGoogleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            if (result?.user) {
                const firebaseUser = result.user;
                const userRef = doc(db, 'users', firebaseUser.uid);
                const userData = new User({ uid: firebaseUser.uid, theme: 'system', twoFactorEnabled: false, role: "user", language: 'en', name: firebaseUser.displayName || name });
                await setDoc(userRef, userData.toFirestore, { merge: true });
                navigate('/dashboard');
            }
        } catch (error: unknown) {
            if (error instanceof FirebaseError) {
                switch (error.code) {
                    case 'auth/popup-closed-by-user':
                        setError('Sign-in popup closed before completion.');
                        break;
                    case 'auth/cancelled-popup-request':
                        setError('Popup sign-in request cancelled. Please try again.');
                        break;
                    case 'auth/popup-blocked':
                        setError('Popup blocked by browser. Please allow popups.');
                        break;
                    case 'auth/account-exists-with-different-credential':
                        setError('An account already exists with the same email but different sign-in method.');
                        break;
                    case 'auth/network-request-failed':
                        setError('Network error. Check your connection and try again.');
                        break;
                    case 'auth/operation-not-allowed':
                        setError('Google sign-in is not enabled. Contact support.');
                        break;
                    default:
                        setError('An unknown Firebase error occurred!');
                        console.error(error);
                }
            } else {
                setError('An unknown error occurred.');
                console.error((error as Error).message);
            }
        }
    };

    /**
     * TODO: Remove handleSubmit once new auth logic is in place
     * 
     * @deprecated This handler will be removed once the new flow is live.
     */
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const result = await createUserWithEmailAndPassword(auth, email, password);
            const firebaseUser = result.user;
            const userRef = doc(db, 'users', firebaseUser.uid);
            const userData = new User({ uid: firebaseUser.uid, theme: 'system', twoFactorEnabled: false, role: "user", language: 'en', name: firebaseUser.displayName || name });
            await setDoc(userRef, userData.toFirestore());
            navigate('/dashboard'); // redirect after success
        } catch (error) {
            if (error instanceof FirebaseError) {
                switch (error.code) {
                    case 'auth/email-already-in-use':
                        setError('This email is already in use. Try logging in or use another email.');
                        break;
                    case 'auth/invalid-email':
                        setError('Please enter a valid email address.');
                        break;
                    case 'auth/weak-password':
                        setError('Your password is too weak. Please use at least 12 characters');
                        break;
                    case 'auth/network-request-failed':
                        setError('Network error. Please check your internet connection and try again.');
                        break;
                    case 'auth/too-many-requests':
                        setError('Too many attempts. Please try again later.');
                        break;
                    default:
                        console.error(error.message);
                        setError('An unknown error occurred.');
                }
            } else {
                setError('An unknown error occurred.');
                console.error((error as Error).message);
            }
        }
    };

    return (
        <Container
            maxWidth="lg"
            sx={{
                px: { xs: 2, sm: 3 },
                py: { xs: 4, sm: 6 },
                flexGrow: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <Snackbar
                open={error != null}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                autoHideDuration={5000}
                onClose={() => {
                    setError(null);
                }}
            >
                <Alert severity='error'>
                    {error}
                </Alert>
            </Snackbar>
            <Paper sx={{ width: '100%', maxWidth: 500, p: 4 }}>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2
                    }}
                >
                    <Typography variant="h4" textAlign="center">
                        Sign Up
                    </Typography>
                    <Divider />
                    <TextField
                        label="Name"
                        type="text"
                        autoComplete="Name"
                        variant="filled"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                            setNameError(null);
                        }}
                        required
                        error={nameError != null}
                        helperText={nameError}
                    />
                    <TextField
                        label="Email"
                        type="text"
                        autoComplete="Email"
                        variant="filled"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.value);
                            if (!isValid) {
                                setEmailError('Please provide a valid email!');
                            } else {
                                setEmailError(null);
                            }
                        }}
                        required
                        error={emailError != null}
                        helperText={emailError}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        variant="filled"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{12,64}$/;
                            const isValid = regex.test(e.target.value);
                            if (!isValid) {
                                setPasswordError('Your password must contain: \nat least 12 characters\n1 number\n1 special character\n1 uppercase\n1 lowercase');
                            } else {
                                setPasswordError(null);
                            }
                        }}
                        required
                        error={passwordError != null}
                        helperText={passwordError}
                    />
                    <Button type="submit" variant="contained" disabled={!name?.trim() && !email?.trim() && !password?.trim()}>
                        Sign Up
                    </Button>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="h6" textAlign="center">
                        Or sign up with a partner
                    </Typography>
                    <Button
                        variant='contained'
                        onClick={handleGoogleSignIn}
                        startIcon={<img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" width={20} />}
                    >
                        Sign Up with Google
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default SignUpPage;
