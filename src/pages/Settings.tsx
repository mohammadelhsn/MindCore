import type React from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
//import CardActionArea from '@mui/material/CardActionArea';
//import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
//import Box from '@mui/material/Box';

interface SettingsProps {
    mode: 'light' | 'dark';
    toggleColorMode: (newMode: any) => void;
}

const SettingsPage: React.FC<SettingsProps> = ({ mode, toggleColorMode }) => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    if (!user) {
        navigate('/login');
    }
    const handleChange = (_: any, newMode: 'light' | 'dark' | null) => {
        if (newMode) {
            toggleColorMode(newMode);
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
            <Typography variant='h2'>Settings</Typography>
            <Divider sx={{ my: 4 }} />
            <Card>
                <CardHeader title="Theme Settings" />
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
