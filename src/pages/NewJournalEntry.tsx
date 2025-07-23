/** REACT */

import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

/** AUTH CONTEXT */

import { AuthContext } from '../contexts/AuthContext';

/** MUI COMPONENTS */

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';

/** NEW JOURNAL PAGE */

const NewJournalPage = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [titleError, setTitleError] = useState<string | null>(null);
    const [desc, setDesc] = useState('');
    const [descError, setDescError] = useState<string | null>(null);
    const [submitDisable, setSubmitDisable] = useState(true);
    const handleSubmit = () => {
        setTitleError(null);
        setDescError(null);
    };
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
            <Box>
                <Typography variant='h2'>Create a New Journal</Typography>
                <Divider sx={{ my: 4 }} />
            </Box>
            <Box>
                <Paper component={'form'} sx={{ display: 'flex', flexDirection: 'column', padding: 2 }} onSubmit={handleSubmit}>
                    <Typography variant='h4'>New Journal</Typography>
                    <Divider sx={{ my: 2 }} />
                    <TextField label="Title" type="text" value={title} autoComplete='Title' variant='filled' required error={titleError != null} sx={{ my: 1 }} onChange={(e) => {
                        const newTitle = e.target.value;
                        setTitle(newTitle);
                        if (newTitle && desc) {
                            if (newTitle.trim().length > 0 && desc.trim().length > 0) {
                                setSubmitDisable(false);
                            }
                        }
                    }} />
                    <TextField label="Content" type="text" autoComplete='Content' variant='filled' required multiline minRows={4} sx={{ my: 1 }} error={descError != null} onChange={(e) => {
                        const newDesc = e.target.value;
                        setDesc(newDesc);
                        if (title && desc) {
                            if (title.trim().length > 0 && desc.trim().length > 0) {
                                setSubmitDisable(false);
                            }
                        }
                    }} />
                    <Divider sx={{ my: 2 }} />
                    <Button type="submit" variant="contained" disabled={submitDisable} color={"secondary"}>Submit</Button>
                </Paper>
            </Box>
        </Container>
    );
};

export default NewJournalPage;