/** ========== React ========== */
import type React from 'react';
import { useContext, useEffect, useState } from 'react';

/** ========== React Router ========== */
import { useNavigate } from 'react-router-dom';

/** ========== Firebase ========== */
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../data/Firebase';

/** ========== Context ========== */
import { AuthContext } from '../contexts/AuthContext';

/** ========== MUI Components ========== */
import Alert from '@mui/material/Alert';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Snackbar from '@mui/material/Snackbar';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';

/** ========== MUI Icon ========== */
import Brightness6Icon from '@mui/icons-material/Brightness6';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import SettingsIcon from '@mui/icons-material/Settings';


interface SettingsProps {
    mode: 'light' | 'dark';
    toggleColorMode: (newMode: any) => void;
}

const SettingsPage: React.FC<SettingsProps> = ({ mode, toggleColorMode }) => {
    const { user, userData } = useContext(AuthContext);
    const [settingSuccess, setSettingSuccess] = useState(false);
    const [settingError, setSettingError] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const navigate = useNavigate();
    useEffect(() => {
        if (!user && userData == null) {
            navigate('/login');
            return;
        }
        if (userData != null) {
            if (userData.theme == 'system') {
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                mode = prefersDark ? 'dark' : 'light';
            } else {
                mode = userData.theme as ('dark' | 'light');
            }
        }
    });
    async function updateTheme() {
        if (user && userData) {
            const userRef = doc(db, "users", user.uid);
            try {
                await updateDoc(userRef, { theme: userData.theme });
                setMessage(`Successfully updated theme to ${userData.theme.toUpperCase()}`);
                setSettingSuccess(true);
            } catch (e) {
                setMessage('Oops, an unexpected error has occurred!');
                setSettingError(true);
                console.error(e);
            }
        }
    }
    const handleChange = (_: any, newMode: 'light' | 'dark') => {
        if (!newMode) return;

        if (newMode) {
            toggleColorMode(newMode);
            if (userData) {
                userData.theme = newMode;
                updateTheme();
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
            }}>
            <Snackbar
                open={settingSuccess}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                autoHideDuration={5000}
                onClose={() => {
                    setSettingSuccess(false);
                    setMessage(null);
                }}
            >
                <Alert severity='success'>
                    {message}
                </Alert>
            </Snackbar>
            <Snackbar
                open={settingError}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                autoHideDuration={5000}
                onClose={() => {
                    setSettingError(false);
                    setMessage(null);
                }}
            >
                <Alert severity='error'>
                    {message}
                </Alert>
            </Snackbar>
            <Typography variant='h2' sx={{ display: 'flex', alignItems: 'center' }} ><SettingsIcon color='primary' fontSize='inherit' sx={{ mr: 1 }} />Settings</Typography>
            <Divider sx={{ my: 4 }} />
            <Card>
                <CardHeader title={<><Typography variant='inherit' sx={{ display: 'flex', alignItems: 'center' }}><Brightness6Icon sx={{ mr: 1 }} color='primary' /> Theme Settings</Typography><Divider sx={{ my: 2 }} /></>} />
                <CardContent>
                    <ToggleButtonGroup
                        value={mode}
                        exclusive
                        onChange={handleChange}
                        size="small"
                        color="primary"
                    >
                        <ToggleButton value="light">
                            <LightModeIcon sx={{ mx: 1 }} />
                            <Typography>Light</Typography>
                        </ToggleButton>
                        <ToggleButton value="dark">
                            <DarkModeIcon sx={{ mx: 1 }} />
                            <Typography>Dark</Typography>
                        </ToggleButton>
                    </ToggleButtonGroup>
                </CardContent>
            </Card>
        </Container>
    );
};
export default SettingsPage;
