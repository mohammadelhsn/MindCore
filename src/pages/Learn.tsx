/** ========== MUI COMPONENTS ========== */
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import { containerStyle } from '../data/Styles';

const LearnPage = () => {
    return (
        <Container maxWidth="lg" sx={containerStyle}>
            <Box>
                <Typography variant='h2'>Learn</Typography>
                <Typography variant='h6' sx={{ fontStyle: 'italic' }}>Disclaimer! Learning from this website is not a substitute for real help! If you or a loved one is in danger of harming someone else or yourself, please check out click here</Typography>
            </Box>
            <Divider sx={{ my: 4 }} />
            <Box>
                <Card>
                    <CardHeader title="What is Mental Health?" />
                    <CardContent>
                        <Paper elevation={3} sx={{ p: 2 }}>
                            <Skeleton animation='wave' width={'100%'} height={100} />
                        </Paper>
                    </CardContent>
                </Card>
            </Box>
            <Box my={4}>
                <Card>
                    <CardHeader title="What is Anxiety?" />
                    <CardContent>
                        <Paper elevation={3} sx={{ p: 2 }}>
                            <Skeleton animation='wave' width={'100%'} height={100} />
                        </Paper>
                    </CardContent>
                </Card>
            </Box>
        </Container>
    );
};

export default LearnPage;