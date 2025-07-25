import type React from 'react';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Alert from '@mui/material/Alert';
import Brightness6Icon from '@mui/icons-material/Brightness6';
import SettingsIcon from '@mui/icons-material/Settings';
import { Snackbar } from '@mui/material';
import { AuthContext } from '../contexts/AuthContext';

/** =========== FIREBASE =========== */
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../data/Firebase';


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
