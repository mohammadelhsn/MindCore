/** ======= REACT ======= */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

/** ======= MUI COMPONENTS ======= */
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';

/** ======= CONTEXTS ======= */
import { useAuth } from '../contexts/useAuth';

/** ======= CUSTOM COMPONENTS ======= */
import FloatingAddIcon from '../components/FloatingAddIcon';
import JournalCard from '../components/JournalCard';
import PasswordDialog from '../components/PasswordDialog';

/** ======= DATA & ROUTES ======= */
import { containerStyle } from '../data/Styles';
import { SIGNUP } from '../data/Routes';

/** DASHBOARD */
const Dashboard = () => {
    const { user, userData, loading } = useAuth();
    const navigate = useNavigate();
    const [openDialog, setOpenDialog] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState<string | null>(null);
    useEffect(() => {
        if (!user) {
            navigate(SIGNUP);
            return;
        }
    }, [user, navigate]);
    if (loading) return (
        <Container maxWidth="xl" sx={containerStyle}>
            <Paper>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 2, sm: 8, md: 12 }}>
                    <Skeleton />
                </Grid>
            </Paper>
        </Container>
    );
    if (!userData) return <p>No user data found.</p>;
    return (
        <Container maxWidth="xl" sx={containerStyle}>
            <Typography variant='h3'>Hi, {userData.name} 🙂</Typography>
            <Divider sx={{ my: 4 }} />
            <Paper sx={{ p: 3 }}>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 2, sm: 8, md: 12 }}>
                    {user && userData && userData.journals.length == 0 && (
                        <Card>
                            <CardHeader title="No journals found!" />
                            <CardContent>
                                <Typography>Create a new one!</Typography>
                            </CardContent>
                        </Card>
                    )}
                    {user && userData && userData.journals.map((journal, index) => {
                        return (
                            <>
                                <PasswordDialog openDialog={openDialog} setOpenDialog={setOpenDialog} password={password} setPassword={setPassword} passwordError={passwordError} setPasswordError={setPasswordError} journalPassword={journal.password ? journal.password : ''} id={journal.id} />
                                <Grid size={{ xs: 2, sm: 4, md: 4 }} key={`${index}-${journal.id}`}>
                                    <JournalCard journal={journal} setOpenDialog={setOpenDialog} />
                                </Grid>
                            </>

                        );
                    })}
                </Grid>
            </Paper>
            <FloatingAddIcon />
        </Container >
    );
};

export default Dashboard;