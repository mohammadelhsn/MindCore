/** ======= REACT & REACT ROUTER ======= */
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

/** ======= MUI COMPONENTS ======= */
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

/** ======= CUSTOM COMPONENTS ======= */
import AuthButton from '../components/AuthButton';

/** ======= CONTEXTS ======= */
import { useAuth } from '../contexts/useAuth';
import { useFeedback } from '../contexts/useFeedback';

/** ======= FUNCTIONS, STYLES, CONSTANTS & TYPES ======= */
import { handleProviderSignUp } from '../data/Firebase';
import { authPagesStyles, containerCenter } from '../data/Styles';
import { facebookProvider, githubProvider, googleProvider } from '../data/Constants';
import { DASHBOARD } from '../data/Routes';
import type { LoginButtonState, ProviderName } from '../data/Types';
import type { AuthProvider } from 'firebase/auth';

/** Log In Page */
const LogIn = () => {
    const { user, loading } = useAuth();
    const { setFeedback } = useFeedback();
    const navigate = useNavigate();
    /** =========== LOADING STATE FOR EACH OF THE BUTTONS =========== */
    const [loadingButton, setLoadingButton] = useState<LoginButtonState>({
        google: false,
        github: false,
        facebook: false,
    });
    const setProviderLoading = (provider: ProviderName, value: boolean) => {
        setLoadingButton((prev) => ({ ...prev, [provider]: value }));
    };
    /**  */
    const handleProviderSignInWrapper = async (provider: AuthProvider, providerName: ProviderName) => {
        setProviderLoading(providerName, true);
        const result = await handleProviderSignUp(provider);
        setFeedback(result.message, result.success ? 'success' : 'error');
        setProviderLoading(providerName, false);
    };
    const handleGoogleSignIn = () => handleProviderSignInWrapper(googleProvider, 'google');
    const handleGitHubSignIn = () => handleProviderSignInWrapper(githubProvider, 'github');
    const handleFacebookSignIn = () => handleProviderSignInWrapper(facebookProvider, 'facebook');
    /** =========== INITIATE THE PROVIDERS =========== */
    useEffect(() => {
        if (user) {
            navigate(DASHBOARD);
            return;
        }
    }, [user, navigate]);
    if (loading) return <Typography>Loading...</Typography>;
    return (
        <Container maxWidth="xl" sx={containerCenter}>
            <Paper sx={{ width: '100%', maxWidth: 500, p: 4 }}>
                <Box sx={authPagesStyles}>
                    <Typography variant="h4">Log In</Typography>
                    <Divider sx={{ mb: 4 }} />
                    <AuthButton provider='google' action='login' handler={handleGoogleSignIn} loading={loadingButton.google} />
                    <AuthButton provider='github' action='login' handler={handleGitHubSignIn} loading={loadingButton.github} />
                    <AuthButton provider='facebook' action='login' handler={handleFacebookSignIn} loading={loadingButton.facebook} />
                </Box>
            </Paper>
        </Container>
    );
};

export default LogIn;