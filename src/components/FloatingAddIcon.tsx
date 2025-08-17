/** ======= REACT ROUTER ======= */
import { useNavigate } from 'react-router-dom';

/** ======= MUI COMPONENTS ======= */
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';

/** ======= MUI ICONS ======= */
import Add from '@mui/icons-material/Add';

/** ======= ROUTES ======= */
import { NEW_ENTRY } from '../data/Routes';

/** */
const FloatingAddIcon = () => {
    const navigate = useNavigate();
    return (
        <Box sx={{
            position: 'fixed',
            bottom: 120,
            right: 24,
            zIndex: 1000,
        }}>
            <Fab color="primary" aria-label="add" onClick={() => navigate(NEW_ENTRY)}
                sx={{
                    '&:hover .spin-icon': {
                        transform: 'rotate(180deg) scale(1.2)',
                        transition: 'transform 0.3s ease',
                    },
                    transition: '0.3s ease',
                    '&:hover': {
                        transform: 'scale(1.2)'
                    }
                }}
            >
                <Add className="spin-icon" sx={{
                    transition: 'transform 0.8s ease',
                    transformOrigin: 'center',
                }} />
            </Fab>
        </Box>
    );
};

export default FloatingAddIcon;