/** MUI COMPONENTS */

import Typography from '@mui/material/Typography';
import Container from "@mui/material/Container";
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

/** REACT */

import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

/** FIREBASE */

import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth } from '../data/Firebase';
import { AuthContext } from '../contexts/AuthContext';

/** LOGIN */

const LogIn = () => {
    const { user } = useContext(AuthContext);
    /** STATES */

    /** EMAIL */
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState<string | null>(null);

    /** PASSWORD */
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState<string | null>(null);

    /** NAVIGATION */
    const navigate = useNavigate();

    /** IF THERE IS ALREADY A USER, THERE IS NO NEED FOR THEM TO BE ABLE TO SEE THE LOGIN PAGE*/
    if (user) {
        navigate('/dashboard');
    }

    /** HANDLERS */
    const handleGoogleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
            navigate('/dashboard');
        } catch (error) {
            console.error('Google sign-in error:', error);
        }
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || email.trim().length == 0) {
            setEmailError("You didn't provide an email");
            return;
        }
        if (!password || password.trim().length == 0) {
            setPasswordError('You must provide a password');
            return;
        }
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/dashboard'); // or whatever page you want
        } catch (error) {
            console.error(error);
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
                        Login
                    </Typography>
                    <Divider />
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
                                setEmailError('');
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
                                setPasswordError('');
                            }
                        }}
                        required
                        error={passwordError != null}
                        helperText={passwordError}
                    />
                    <Button type="submit" variant="contained">
                        Login
                    </Button>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="h6" textAlign="center">
                        Or login with a partner
                    </Typography>
                    <Button
                        variant='outlined'
                        onClick={handleGoogleSignIn}
                        startIcon={<img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" width={20} />}
                    >
                        Login with Google
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default LogIn;