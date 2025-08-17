/** ======= REACT ======= */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

/** ======= MUI COMPONENTS ======= */
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Fab from '@mui/material/Fab';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';

/** ======= MUI ICONS ======= */
import Add from '@mui/icons-material/Add';

/** ======= CONTEXTS ======= */
import { useAuth } from '../contexts/useAuth';

/** ======= DATA & ROUTES ======= */
import { cardStyles, containerStyle } from '../data/Styles';
import { NEW_ENTRY, SIGNUP, VIEW_ENTRY } from '../data/Routes';
import PasswordDialog from '../components/PasswordDialog';

/** DASHBOARD */
const Dashboard = () => {
    const { user, userData, loading } = useAuth();
    const [openDialog, setOpenDialog] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const navigate = useNavigate();
    useEffect(() => {
        if (!user) {
            navigate(SIGNUP);
        }
    }, [user, navigate]);
    if (loading) return (
        <Container maxWidth="lg" sx={containerStyle}>
            <Paper>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 2, sm: 8, md: 12 }}>
                    <Skeleton />
                </Grid>
            </Paper>
        </Container>
    );
    if (!userData) return <p>No user data found.</p>;
    return (
        <Container
            maxWidth="xl"
            sx={containerStyle}
        >
            <Typography variant='h3'>
                Hi, {userData.name} 🙂
            </Typography>
            <Divider sx={{ my: 4 }} />
            <Paper sx={{ p: 3 }}>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 2, sm: 8, md: 12 }}>
                    {user && userData && userData.journals.length == 0 && (
                        <Card>
                            <CardHeader title="No journals found!" />
                            <CardContent>
                                <Typography>
                                    Create a new one!
                                </Typography>
                            </CardContent>
                        </Card>
                    )}
                    {user && userData && userData.journals.map((journal, index) => {
                        return (
                            <Grid size={{ xs: 2, sm: 4, md: 4 }} key={`${index}-${journal.id}`}>
                                <PasswordDialog openDialog={openDialog} setOpenDialog={setOpenDialog} password={password} setPassword={setPassword} passwordError={passwordError} setPasswordError={setPasswordError} journalPassword={journal.password ? journal.password : ''} id={journal.id} />
                                <Card elevation={3} sx={cardStyles}>
                                    <CardHeader
                                        title={
                                            <>
                                                <Box>{journal.title}</Box>
                                                <Divider sx={{ mt: 1 }} />
                                            </>
                                        }
                                    />
                                    <CardContent>
                                        <Typography>
                                            {journal.content.trim().length > 0
                                                ? journal.getBrief()
                                                : 'There is no content yet! Edit me!'}
                                        </Typography>
                                    </CardContent>
                                    <CardActions sx={{ paddingLeft: 1 }}>
                                        <Button onClick={() => {
                                            if (journal.passwordProtected) {
                                                setOpenDialog(true);
                                            } else navigate(VIEW_ENTRY(journal.id));
                                        }} variant='text' sx={{
                                            transition: '0.3s ease', '&:hover': {
                                                bgcolor: ({ palette }) => palette.primary.main,
                                                color: ({ palette }) => palette.text.primary,
                                            }
                                        }}>
                                            {journal.passwordProtected ? 'Unlock' : 'View Entry'}
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        );
                    })}
                </Grid>
            </Paper>
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
        </Container >
    );
};

export default Dashboard;