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

/** MUI ICONS */

import Add from '@mui/icons-material/Add';

/** DATA */

import { fetchUser, type User } from '../data/User';
import { Skeleton, useTheme, type SxProps } from '@mui/material';

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
    const { user } = useContext(AuthContext);
    const [userData, setUserData] = useState<User | null>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>('');
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            if (user && !userData) {
                await fetchUser(user.uid, setError, setUserData);
                setLoading(false);
            }
        };
        fetchData();
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
    if (error) return <Typography>An error occurred</Typography>;
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
                    <Grid size={{ xs: 2, sm: 4, md: 4 }}>
                        <Card elevation={3} sx={cardStyles}>
                            <CardHeader
                                title={
                                    <>
                                        <Box>Journal Entry #1</Box>
                                        <Divider sx={{ mt: 1 }} />
                                    </>
                                }
                            />
                            <CardContent>
                                <Typography>
                                    This is a brief
                                </Typography>
                            </CardContent>
                            <CardActions sx={{ paddingLeft: 1 }}>
                                <Button onClick={() => navigate('#')} variant='text' sx={{
                                    transition: '0.3s ease', '&:hover': {
                                        bgcolor: palette.primary.main,
                                        color: palette.text.primary,
                                    }
                                }}>
                                    View Entry
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid size={{ xs: 2, sm: 4, md: 4 }}>
                        <Card elevation={3} sx={cardStyles}>
                            <CardHeader
                                title={
                                    <>
                                        <Box>Journal Entry #2</Box>
                                        <Divider sx={{ mt: 1 }} />
                                    </>
                                }
                            />
                            <CardContent>
                                <Typography>
                                    This is a brief
                                </Typography>
                            </CardContent>
                            <CardActions sx={{ paddingLeft: 1 }}>
                                <Button onClick={() => navigate('#')} sx={{
                                    transition: '0.3s ease', '&:hover': {
                                        bgcolor: palette.primary.main,
                                        color: palette.text.primary,
                                    }
                                }}>
                                    View Entry
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid size={{ xs: 2, sm: 4, md: 4 }}>
                        <Card elevation={3} sx={cardStyles}>
                            <CardHeader
                                title={
                                    <>
                                        <Box>Journal Entry #3</Box>
                                        <Divider sx={{ mt: 1 }} />
                                    </>
                                }
                            />
                            <CardContent>
                                <Typography>
                                    This is a brief
                                </Typography>
                            </CardContent>
                            <CardActions sx={{ paddingLeft: 1 }}>
                                <Button onClick={() => navigate('#')} sx={{
                                    transition: '0.3s ease', '&:hover': {
                                        bgcolor: palette.primary.main,
                                        color: palette.text.primary,
                                    }
                                }}>
                                    View Entry
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid size={{ xs: 2, sm: 4, md: 4 }}>
                        <Card elevation={3} sx={cardStyles}>
                            <CardHeader
                                title={
                                    <>
                                        <Box>Journal Entry #1</Box>
                                        <Divider sx={{ mt: 1 }} />
                                    </>
                                }
                            />
                            <CardContent>
                                <Typography>
                                    This is a brief
                                </Typography>
                            </CardContent>
                            <CardActions sx={{ paddingLeft: 1 }}>
                                <Button onClick={() => navigate('#')} sx={{
                                    transition: '0.3s ease', '&:hover': {
                                        bgcolor: palette.primary.main,
                                        color: palette.text.primary,
                                    }
                                }}>
                                    View Entry
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid size={{ xs: 2, sm: 4, md: 4 }}>
                        <Card elevation={3} sx={cardStyles}>
                            <CardHeader
                                title={
                                    <>
                                        <Box>Journal Entry #2</Box>
                                        <Divider sx={{ mt: 1 }} />
                                    </>
                                }
                            />
                            <CardContent>
                                <Typography>
                                    This is a brief
                                </Typography>
                            </CardContent>
                            <CardActions sx={{ paddingLeft: 1 }}>
                                <Button onClick={() => navigate('#')} sx={{
                                    transition: '0.3s ease', '&:hover': {
                                        bgcolor: palette.primary.main,
                                        color: palette.text.primary,
                                    }
                                }}>
                                    View Entry
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid size={{ xs: 2, sm: 4, md: 4 }}>
                        <Card elevation={3} sx={cardStyles}>
                            <CardHeader
                                title={
                                    <>
                                        <Box>Journal Entry #3</Box>
                                        <Divider sx={{ mt: 1 }} />
                                    </>
                                }
                            />
                            <CardContent>
                                <Typography>
                                    This is a brief
                                </Typography>
                            </CardContent>
                            <CardActions sx={{ paddingLeft: 1 }}>
                                <Button onClick={() => navigate('#')} sx={{
                                    transition: '0.3s ease', '&:hover': {
                                        bgcolor: palette.primary.main,
                                        color: palette.text.primary,
                                    }
                                }}>
                                    View Entry
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid size={{ xs: 2, sm: 4, md: 4 }}>
                        <Card elevation={3} sx={cardStyles}>
                            <CardHeader
                                title={
                                    <>
                                        <Box>Journal Entry #1</Box>
                                        <Divider sx={{ mt: 1 }} />
                                    </>
                                }
                            />
                            <CardContent>
                                <Typography>
                                    This is a brief
                                </Typography>
                            </CardContent>
                            <CardActions sx={{ paddingLeft: 1 }}>
                                <Button onClick={() => navigate('#')} sx={{
                                    transition: '0.3s ease', '&:hover': {
                                        bgcolor: palette.primary.main,
                                        color: palette.text.primary,
                                    }
                                }}>
                                    View Entry
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid size={{ xs: 2, sm: 4, md: 4 }}>
                        <Card elevation={3} sx={cardStyles}>
                            <CardHeader
                                title={
                                    <>
                                        <Box>Journal Entry #2</Box>
                                        <Divider sx={{ mt: 1 }} />
                                    </>
                                }
                            />
                            <CardContent>
                                <Typography>
                                    This is a brief
                                </Typography>
                            </CardContent>
                            <CardActions sx={{ paddingLeft: 1 }}>
                                <Button onClick={() => navigate('#')} sx={{
                                    transition: '0.3s ease', '&:hover': {
                                        bgcolor: palette.primary.main,
                                        color: palette.text.primary,
                                    }
                                }}>
                                    View Entry
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid size={{ xs: 2, sm: 4, md: 4 }}>
                        <Card elevation={3} sx={cardStyles}>
                            <CardHeader
                                title={
                                    <>
                                        <Box>Journal Entry #3</Box>
                                        <Divider sx={{ mt: 1 }} />
                                    </>
                                }
                            />
                            <CardContent>
                                <Typography>
                                    This is a brief
                                </Typography>
                            </CardContent>
                            <CardActions sx={{ paddingLeft: 1 }}>
                                <Button onClick={() => navigate('#')} sx={{
                                    transition: '0.3s ease', '&:hover': {
                                        bgcolor: palette.primary.main,
                                        color: palette.text.primary,
                                    }
                                }}>
                                    View Entry
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
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
                            transform: 'rotate(360deg) scale(1.2)',
                            transition: 'transform 1s ease',
                        },
                        transition: '0.3s ease',
                        '&:hover': {
                            transform: 'scale(1.2)'
                        }
                    }}
                >
                    <Add className="spin-icon" sx={{
                        transition: 'transform 1s ease',
                        transformOrigin: 'center',
                    }} />
                </Fab>
            </Box>
        </Container >
    );
};

export default Dashboard;