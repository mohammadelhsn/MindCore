/** ========== MUI COMPONENTS ========== */

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { containerCenter } from '../data/Styles';

/** ========== WELCOME PAGE ========== */

const Welcome = () => {
    return (
        <Container
            maxWidth="lg"
            sx={containerCenter}
        >
            <Typography variant='h1'>Welcome to MindCore</Typography>
        </Container>
    );
};

export default Welcome;