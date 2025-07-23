import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
//import { updatePassword, updateProfile, updateEmail, verifyBeforeUpdateEmail, updatePhoneNumber, } from 'firebase/auth';
//import { updateDoc } from 'firebase/firestore';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const ManageAccount = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const handleSubmit = () => { };
    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    });
    return (
        <Container
            maxWidth="lg"
            sx={{
                px: { xs: 2, sm: 3 },
                py: { xs: 4, sm: 6 },
                flexGrow: 1,
            }}>
            <Typography variant='h2'>Manage Your Account</Typography>
            <Divider sx={{ my: 4 }} />
            <Box>
                <Paper>
                    <Stack sx={{ p: 2 }}>
                        <Card elevation={3} sx={{ my: 2 }}>
                            <CardHeader title="Change Name" />
                            <CardContent>
                                <Box>
                                    <Typography>Current Name: <strong>CURRENT NAME HERE</strong></Typography>
                                </Box>
                                <Box sx={{ mt: 2 }}>
                                    <TextField label="Name" fullWidth ></TextField>
                                    <Divider sx={{ my: 4 }} />
                                    <Button type="submit" fullWidth variant='contained' onClick={handleSubmit}>Save</Button>
                                </Box>
                            </CardContent>
                        </Card>
                        <Divider sx={{ my: 2 }} />
                        <Card sx={{ my: 2 }} elevation={3}>
                            <CardHeader title="Change Username" />
                            <CardContent>
                                <Box>
                                    <Typography>Current Username: <strong>CURRENT NAME HERE</strong></Typography>
                                </Box>
                                <Box sx={{ mt: 2 }}>
                                    <TextField label="Username" fullWidth ></TextField >
                                    <Divider sx={{ my: 4 }} />
                                    <Button type="submit" fullWidth variant='contained' onClick={handleSubmit}>Save</Button>
                                </Box>
                            </CardContent>
                        </Card>
                        <Card sx={{ my: 2 }} elevation={3}>
                            <CardHeader title="Change Password" />
                            <CardContent>
                                <Box>
                                    <Typography>Current Username: <strong>CURRENT NAME HERE</strong></Typography>
                                </Box>
                                <Box sx={{ mt: 2 }}>
                                    <TextField label="Username" fullWidth ></TextField >
                                    <Divider sx={{ my: 4 }} />
                                    <Button type="submit" fullWidth variant='contained' onClick={handleSubmit}>Save</Button>
                                </Box>
                            </CardContent>
                        </Card>
                        <Card sx={{ my: 2 }} elevation={3}>
                            <CardHeader title="Change Username" />
                            <CardContent>
                                <Box>
                                    <Typography>Current PFP: <strong>CURRENT NAME HERE</strong></Typography>
                                </Box>
                                <Box sx={{ mt: 2 }}>
                                    <TextField label="Username" fullWidth ></TextField >
                                    <Divider sx={{ my: 4 }} />
                                    <Button type="submit" fullWidth variant='contained' onClick={handleSubmit}>Save</Button>
                                </Box>
                            </CardContent>
                        </Card>
                    </Stack>
                </Paper>
            </Box>
        </Container>
    );
};

export default ManageAccount;