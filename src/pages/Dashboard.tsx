/** REACT */

import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

/** AUTH */

import { AuthContext } from '../contexts/AuthContext';

/** MUI COMPONENTS */

import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Fab from '@mui/material/Fab';
import Box from '@mui/material/Box';
//import Skeleton from '@mui/material/Skeleton';

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

/** MUI ICONS */

import Add from '@mui/icons-material/Add';

/** DATA */

import { Skeleton, TextField, useTheme, type SxProps } from '@mui/material';

/** STYLES */

const cardStyles: SxProps = {
    transition: '0.3s ease',
    '&:hover': {
        transform: 'scale(1.03)'
    }
};

const containerStyle = {
    px: { xs: 2, sm: 3 },
    py: { xs: 4, sm: 6 },
    flexGrow: 1,
};

/** DASHBOARD */

const Dashboard = () => {
    const { palette } = useTheme();
    const { user, userData, loading } = useContext(AuthContext);
    const [openDialog, setOpenDialog] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const navigate = useNavigate();
    useEffect(() => {
        if (!user) {
            navigate('/signup');
        }
    }, [user]);
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
            maxWidth="lg"
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
                    {user && userData && userData.journals.map((journal, index) => (
                        <Grid size={{ xs: 2, sm: 4, md: 4 }} key={`${index}-${journal.id}`}>
                            <Dialog open={openDialog}>
                                <DialogTitle>This Entry is password protected</DialogTitle>
                                <DialogContent>
                                    <DialogContentText>Enter the password to view this</DialogContentText>
                                    <TextField value={password} type='password' error={passwordError != null} helperText={passwordError} onChange={(e) => { setPassword(e.target.value); setPasswordError(null); }} />
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={() => {
                                        if (journal.password === password) {
                                            navigate(`/viewEntry/${journal.id}`);
                                        } else {
                                            setPasswordError("Password incorrect!");
                                        }
                                    }} disabled={!password || password.trim().length == 0}>Unlock</Button>
                                </DialogActions>
                            </Dialog>
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
                                        } else navigate(`/viewEntry/${journal.id}`);
                                    }} variant='text' sx={{
                                        transition: '0.3s ease', '&:hover': {
                                            bgcolor: palette.primary.main,
                                            color: palette.text.primary,
                                        }
                                    }}>
                                        {journal.passwordProtected ? 'Unlock' : 'View Entry'}
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Paper>
            <Box sx={{
                position: 'fixed',
                bottom: 120,
                right: 24,
                zIndex: 1000,
            }}>
                <Fab color="primary" aria-label="add" onClick={() => navigate('/newEntry')}
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