import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Alert from '@mui/material/Alert';
import { Snackbar, useTheme } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { GithubAuthProvider, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { handleProviderSignUp } from '../data/Firebase';
import Box from '@mui/material/Box';

const SignUpPage = () => {
    const { palette } = useTheme();
    const { user, loading } = useContext(AuthContext);
    const [error, setError] = useState<string | null>(null);
    /** @deprecated This is going to be removed soon! */
    const [loadingPage, setLoadingPage] = useState<boolean>(false);
    const [loadingUser, setLoadingUser] = useState<boolean>(false);
    const navigate = useNavigate();
    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();
    const facebookProvider = new FacebookAuthProvider();
    useEffect(() => {
        if (user) {
            navigate('/dashboard');
        }
    }, [user, navigate]);
    loadingPage;
    if (loading) return <Typography>Loading...</Typography>;
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
                    setLoadingUser(false);
                }}
            >
                <Alert severity='error'>
                    {error}
                </Alert>
            </Snackbar>
            <Card sx={{ width: '100%', maxWidth: 500, p: 4 }}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2
                    }}
                >
                    <Typography variant="h4">
                        Sign Up
                    </Typography>
                    <Divider sx={{ mb: 4 }} />
                    <Button
                        variant='outlined'
                        fullWidth
                        loading={loadingUser}
                        onClick={() => {
                            handleProviderSignUp(googleProvider, navigate, setError, setLoadingPage, setLoadingUser);
                            setLoadingUser(true);
                        }}
                        startIcon={<img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" width={20} />}
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
                        Sign Up with Google
                    </Button>
                    <Button
                        variant='outlined'
                        onClick={() => {
                            setLoadingUser(true);
                            handleProviderSignUp(githubProvider, navigate, setError, setLoadingPage, setLoadingUser);
                        }}
                        startIcon={<img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/github.svg" alt="GitHub" width={20} />}
                        loading={loadingUser}
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
                        Sign Up with GitHub
                    </Button>
                    <Button
                        variant='outlined'
                        onClick={() => {
                            setLoadingUser(true);
                            handleProviderSignUp(facebookProvider, navigate, setError, setLoadingPage, setLoadingUser);
                        }}
                        startIcon={<img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/facebook.svg" alt="Facebook" width={20} />}
                        loading={loadingUser}
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
            </Card>
        </Container>
    );
};

export default SignUpPage;
