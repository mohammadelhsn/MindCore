/** ========== React ========== */
import { useEffect, type FC, type MouseEvent } from 'react';

/** ========== React Router ========== */
import { useNavigate } from 'react-router-dom';

/** ========== Firebase ========== */
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../data/Firebase';

/** ========== MUI Components ========== */
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';

/** ========== MUI Icon ========== */
import Brightness6Icon from '@mui/icons-material/Brightness6';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import SettingsIcon from '@mui/icons-material/Settings';
import { useAuth } from '../contexts/useAuth';
import { alignTextIcon, containerStyle, iconStyle } from '../data/Styles';
import { useFeedback } from '../contexts/useFeedback';
import type { OverridableComponent } from '@mui/material/OverridableComponent';
import type { SvgIconTypeMap } from '@mui/material/SvgIcon';


interface SettingsProps {
    mode: 'light' | 'dark';
    toggleColorMode: (newMode: 'light' | 'dark') => void;
}

interface ButtonOption {
    value: string;
    icon: OverridableComponent<SvgIconTypeMap<object, "svg">> & { muiName: string; };
    text: string;
}
const buttons: ButtonOption[] = [{ value: 'light', icon: LightModeIcon, text: 'Light' }, { value: 'dark', icon: DarkModeIcon, text: 'Dark' }];

const SettingsPage: FC<SettingsProps> = ({ mode, toggleColorMode }) => {
    const { user, userData } = useAuth();
    const { setFeedback } = useFeedback();
    const navigate = useNavigate();
    useEffect(() => {
        if (!user && userData == null) {
            navigate('/login');
            return;
        }
        if (userData != null) {
            if (userData.theme == 'system') {
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                toggleColorMode(prefersDark ? 'dark' : 'light');
            } else {
                toggleColorMode(userData.theme as ('dark' | 'light'));
            }
        }
    });
    async function updateTheme() {
        if (user && userData) {
            const userRef = doc(db, "users", user.uid);
            try {
                await updateDoc(userRef, { theme: userData.theme });
                setFeedback(`Successfully updated theme to ${userData.theme.toUpperCase()}`, 'success');
            } catch (e) {
                setFeedback('Oops, an unexpected error has occurred!', 'error');
                console.error(e);
            }
        }
    }
    const handleChange = (_: MouseEvent<HTMLElement>, newMode: 'light' | 'dark') => {
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
            maxWidth="xl"
            sx={containerStyle}>
            <Typography variant='h2' sx={alignTextIcon} ><SettingsIcon fontSize='inherit' sx={iconStyle} />Settings</Typography>
            <Divider sx={{ my: 4 }} />
            <Card>
                <CardHeader title={
                    <>
                        <Typography variant='inherit' sx={alignTextIcon}>
                            <Brightness6Icon sx={iconStyle} /> Theme Settings
                        </Typography>
                        <Divider sx={{ my: 2 }} />
                    </>
                } />
                <CardContent>
                    <ToggleButtonGroup
                        value={mode}
                        exclusive
                        onChange={handleChange}
                        size="small"
                        color="primary"
                    >
                        {buttons.map((btn, index) => {
                            return (
                                <ToggleButton value={btn.value} key={`${btn.value}-${index}`}>
                                    <btn.icon sx={{ mx: 1 }} />
                                    <Typography>{btn.value}</Typography>
                                </ToggleButton>
                            );
                        })}
                    </ToggleButtonGroup>
                </CardContent>
            </Card>
        </Container>
    );
};

export default SettingsPage;
