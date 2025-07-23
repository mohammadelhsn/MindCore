/** MUI COMPONENTS */

import Typography from '@mui/material/Typography';
import Container from "@mui/material/Container";
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import { Snackbar } from '@mui/material';
import Alert from '@mui/material/Alert';

/** REACT */

import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

/** FIREBASE */

import { GoogleAuthProvider, GithubAuthProvider, FacebookAuthProvider } from 'firebase/auth';
import { AuthContext } from '../contexts/AuthContext';
import { handleProviderSignIn } from '../data/Firebase';
import { useTheme } from '@mui/material';

/** LOGIN */

const LogIn = () => {
    const { user } = useContext(AuthContext);
    const { palette } = useTheme();
    const [error, setError] = useState<string | null>(null);
    /**
     * @description Controls the loading state of the page
     * @deprecated ?? What is the purpose of this
     */
    const [loadingPage, setLoadingPage] = useState<boolean>(true);

    /** =========== LOADING STATE FOR EACH OF THE BUTTONS =========== */
    const [loadingG, setLoadingG] = useState<boolean>(false);
    const [loadingGH, setLoadingGH] = useState<boolean>(false);
    const [loadingF, setLoadingF] = useState<boolean>(false);

    const navigate = useNavigate();

    /** =========== INITIATE THE PROVIDERS =========== */
    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();
    const facebookProvider = new FacebookAuthProvider();
    useEffect(() => {
        if (user) {
            navigate('/dashboard');
        }
        setLoadingPage(false);
    }, [user, navigate]);

    if (loadingPage) return <Typography>Loading...</Typography>;
    const action = 'Log In';
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
                onClose={() => setError(null)}
            >
                <Alert severity='error'>{error}</Alert>
            </Snackbar>
            <Paper sx={{ width: '100%', maxWidth: 500, p: 4 }}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2
                    }}
                >
                    <Typography variant="h4">Log In</Typography>
                    <Divider sx={{ mb: 4 }} />
                    <Button
                        variant='outlined'
                        onClick={() => {
                            setLoadingG(true);
                            handleProviderSignIn(googleProvider, navigate, setError, setLoadingPage, setLoadingG);
                        }}
                        startIcon={<img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" width={20} />}
                        loading={loadingG}
                        sx={{
                            display: 'flex', justifyContent: 'center', alignItems: 'center', transition: '0.3s ease', '&:hover': {
                                transform: 'scale(1.02)',
                                bgcolor: palette.primary.light,
                                color: palette.text.primary,
                            }
                        }}
                    >
                        {action} with Google
                    </Button>
                    <Button
                        variant='outlined'
                        onClick={() => {
                            setLoadingGH(true);
                            handleProviderSignIn(githubProvider, navigate, setError, setLoadingPage, setLoadingGH);
                        }}
                        startIcon={<img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/github.svg" alt="GitHub" width={20} />}
                        loading={loadingGH}
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            transition: '0.3s ease',
                            '&:hover': {
                                transform: 'scale(1.02)',
                                bgcolor: palette.primary.light,
                                color: palette.text.primary,
                            }
                        }}
                    >
                        {action} with GitHub
                    </Button>
                    <Button
                        variant='outlined'
                        onClick={() => {
                            setLoadingF(true);
                            handleProviderSignIn(facebookProvider, navigate, setError, setLoadingPage, setLoadingF);
                        }}
                        startIcon={<img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/facebook.svg" alt="Facebook" width={20} />}
                        loading={loadingF}
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            transition: '0.3s ease',
                            '&:hover': {
                                transform: 'scale(1.02)',
                                bgcolor: palette.primary.light,
                                color: palette.text.primary,
                            }
                        }}
                    >
                        Sign Up with Facebook
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default LogIn;