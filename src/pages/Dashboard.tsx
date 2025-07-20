/** REACT */

import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

/** AUTH */

import { AuthContext } from '../contexts/AuthContext';

/** MUI COMPONENTS */

import CardActionArea from '@mui/material/CardActionArea';
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

import { getUserData } from '../data/Functions';
import { type User } from '../data/User';

/** DASHBOARD */

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const [userData, setUserData] = useState<User | null>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        if (!user) {
            navigate('/signup');
        }
        const fetchData = async () => {
            if (user && !userData) {
                await getUserData(user.uid, setUserData, setError);
                setLoading(false);
            }
        };
        fetchData();
    }, [user]);
    if (loading) return <Typography>Loading your data...</Typography>;
    if (error) return <Typography>An error occurred</Typography>;
    if (!userData) return <p>No user data found.</p>;
    return (
        <Container
            maxWidth="lg"
            sx={{
                px: { xs: 2, sm: 3 },
                py: { xs: 4, sm: 6 },
                flexGrow: 1,
            }}
        >
            <Typography variant='h3'>
                Hi, {userData.name} 🙂
            </Typography>
            <Divider sx={{ my: 4 }} />
            <Paper sx={{ p: 3 }}>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 2, sm: 8, md: 12 }}>
                    <Grid size={{ xs: 2, sm: 4, md: 4 }}>
                        <Card elevation={3} sx={{
                            transition: '0.3s ease', '&:hover': {
                                transform: 'scale(1.03)'
                            }
                        }}>
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
                            <CardActionArea sx={{ paddingLeft: 1 }}>
                                <Button>
                                    View Entry
                                </Button>
                            </CardActionArea>
                        </Card>
                    </Grid>
                    <Grid size={{ xs: 2, sm: 4, md: 4 }}>
                        <Card elevation={3} sx={{
                            transition: '0.3s ease', '&:hover': {
                                transform: 'scale(1.03)'
                            }
                        }}>
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
                            <CardActionArea sx={{ paddingLeft: 1 }}>
                                <Button>
                                    View Entry
                                </Button>
                            </CardActionArea>
                        </Card>
                    </Grid>
                    <Grid size={{ xs: 2, sm: 4, md: 4 }}>
                        <Card elevation={3} sx={{
                            transition: '0.3s ease', '&:hover': {
                                transform: 'scale(1.03)'
                            }
                        }}>
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
                            <CardActionArea sx={{ paddingLeft: 1 }}>
                                <Button>
                                    View Entry
                                </Button>
                            </CardActionArea>
                        </Card>
                    </Grid>
                    <Grid size={{ xs: 2, sm: 4, md: 4 }}>
                        <Card elevation={3} sx={{
                            transition: '0.3s ease', '&:hover': {
                                transform: 'scale(1.03)'
                            }
                        }}>
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
                            <CardActionArea sx={{ paddingLeft: 1 }}>
                                <Button>
                                    View Entry
                                </Button>
                            </CardActionArea>
                        </Card>
                    </Grid>
                    <Grid size={{ xs: 2, sm: 4, md: 4 }}>
                        <Card elevation={3} sx={{
                            transition: '0.3s ease', '&:hover': {
                                transform: 'scale(1.03)'
                            }
                        }}>
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
                            <CardActionArea sx={{ paddingLeft: 1 }}>
                                <Button>
                                    View Entry
                                </Button>
                            </CardActionArea>
                        </Card>
                    </Grid>
                    <Grid size={{ xs: 2, sm: 4, md: 4 }}>
                        <Card elevation={3} sx={{
                            transition: '0.3s ease', '&:hover': {
                                transform: 'scale(1.03)'
                            }
                        }}>
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
                            <CardActionArea sx={{ paddingLeft: 1 }}>
                                <Button>
                                    View Entry
                                </Button>
                            </CardActionArea>
                        </Card>
                    </Grid>
                    <Grid size={{ xs: 2, sm: 4, md: 4 }}>
                        <Card elevation={3} sx={{
                            transition: '0.3s ease', '&:hover': {
                                transform: 'scale(1.03)'
                            }
                        }}>
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
                            <CardActionArea sx={{ paddingLeft: 1 }}>
                                <Button>
                                    View Entry
                                </Button>
                            </CardActionArea>
                        </Card>
                    </Grid>
                    <Grid size={{ xs: 2, sm: 4, md: 4 }}>
                        <Card elevation={3} sx={{
                            transition: '0.3s ease', '&:hover': {
                                transform: 'scale(1.03)'
                            }
                        }}>
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
                            <CardActionArea sx={{ paddingLeft: 1 }}>
                                <Button>
                                    View Entry
                                </Button>
                            </CardActionArea>
                        </Card>
                    </Grid>
                    <Grid size={{ xs: 2, sm: 4, md: 4 }}>
                        <Card elevation={3} sx={{
                            transition: '0.3s ease', '&:hover': {
                                transform: 'scale(1.03)'
                            }
                        }}>
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
                            <CardActionArea sx={{ paddingLeft: 1 }}>
                                <Button>
                                    View Entry
                                </Button>
                            </CardActionArea>
                        </Card>
                    </Grid>
                </Grid>
            </Paper>
            <Box sx={{
                position: 'fixed',
                bottom: 120, // 64 (footer) + 24 (padding)
                right: 24,
                zIndex: 1000,
            }}>
                < Fab color="secondary" aria-label="add" onClick={() => {
                    navigate('/newEntry');
                }}>
                    <Add />
                </Fab>
            </Box>
        </Container >
    );
};

export default Dashboard;