/** ========== React ========== */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

/** ========== Context & Utilities ========== */
import { handleProviderSignUp } from '../data/Firebase';

/** ========== MUI Components ========== */
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

/** ========== MUI Hooks ==========*/
import { useAuth } from '../contexts/useAuth';
import { authPagesStyles, containerCenter } from '../data/Styles';
import { facebookProvider, githubProvider, googleProvider } from '../data/Constants';
import type { LoginButtonState, ProviderName } from '../data/Types';
import { useFeedback } from '../contexts/useFeedback';
import type { AuthProvider } from 'firebase/auth';
import AuthButton from '../components/AuthButton';

const SignUpPage = () => {
    const { user, loading } = useAuth();
    const { setFeedback } = useFeedback();
    const navigate = useNavigate();
    const [loadingButton, setLoadingButton] = useState<LoginButtonState>({
        google: false,
        github: false,
        facebook: false,
    });
    const setProviderLoading = (provider: ProviderName, value: boolean) => {
        setLoadingButton((prev) => ({ ...prev, [provider]: value }));
    };
    const handleProviderSignInWrapper = async (provider: AuthProvider, providerName: ProviderName) => {
        setProviderLoading(providerName, true);
        const result = await handleProviderSignUp(provider);
        setFeedback(result.message, result.success ? 'success' : 'error');
        setProviderLoading(providerName, false);
    };
    const handleGoogleSignIn = () => handleProviderSignInWrapper(googleProvider, 'google');
    const handleGitHubSignIn = () => handleProviderSignInWrapper(githubProvider, 'github');
    const handleFacebookSignIn = () => handleProviderSignInWrapper(facebookProvider, 'facebook');
    useEffect(() => {
        if (user) {
            navigate('/dashboard');
            return;
        }
    }, [user, navigate]);
    if (loading) return <Typography>Loading...</Typography>;
    return (
        <Container maxWidth="xl" sx={containerCenter}>
            <Card sx={{ width: '100%', maxWidth: 500, p: 4 }}>
                <Box sx={authPagesStyles}>
                    <Typography variant="h4">Sign Up</Typography>
                    <Divider sx={{ mb: 4 }} />
                    <AuthButton provider='google' action='signup' handler={handleGoogleSignIn} loading={loadingButton.google} />
                    <AuthButton provider='github' action='signup' handler={handleGitHubSignIn} loading={loadingButton.github} />
                    <AuthButton provider='facebook' action='signup' handler={handleFacebookSignIn} loading={loadingButton.facebook} />
                </Box>
            </Card>
        </Container>
    );
};

export default SignUpPage;
