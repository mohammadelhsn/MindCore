// MUI Components

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// Footer component

const Footer = () => {
    return (
        <Box component="footer" textAlign="center" py={4} sx={{
            boxShadow: '0 -4px 10px rgba(0, 0, 0, 0.1)',
            bgcolor: ({ palette }) => palette.background.default,
            color: ({ palette }) => palette.text.secondary
        }}>
            <Typography variant="body2" mt={3} color="textSecondary">
                © 2025 Mohammad El-Hassan. All rights reserved.
            </Typography>
        </Box>
    );
};

export default Footer;
