import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { JournalEntry, type firestoreJournalEntry } from '../data/JournalEntry';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../data/Firebase';
import Alert from '@mui/material/Alert';
import { Paper, Snackbar } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import Select from '@mui/material/Select';
import Collapse from '@mui/material/Collapse';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import DescriptionIcon from '@mui/icons-material/Description';
import SettingsIcon from '@mui/icons-material/Settings';
import CategoryIcon from '@mui/icons-material/Category';


const ViewEntry = () => {
    const { user, userData } = useContext(AuthContext);
    const [journal, setJournal] = useState<JournalEntry | null>(null);
    const [settingSuccess, setSettingSuccess] = useState(false);
    const [settingError, setSettingError] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const [isPrivate, setIsPrivate] = useState(false);
    const [category, setCategory] = useState('uncategorized');
    const [password, setPassword] = useState('');
    //const [openDialog, setOpenDialog] = useState(false);
    const [value, setValue] = useState(0);
    const { id } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        if (!user || !userData) {
            navigate('/login');
        } else {
            const j = userData.journals.find((jour) => jour.id === id);
            if (j == undefined) {
                setJournal(null);
            } else {
                setJournal(j);
            }
        }
    }, []);
    const handleChange = (_: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    if (journal === null) return (<Typography>No such journal was found! Try again!</Typography>);
    const EditableTitle = () => {
        const [editing, setEditing] = useState(false);
        const [tempTitle, setTempTitle] = useState(journal.title);

        const handleBlur = async () => {
            setEditing(false);
            if (journal.title === tempTitle) return;
            journal.title = tempTitle;
            try {
                if (user && userData) {
                    const docRef = doc(db, "users", user.uid);
                    const updatedJournals: firestoreJournalEntry[] = [];
                    userData.journals.forEach((jour) => updatedJournals.push(jour.toFirestore()));
                    await updateDoc(docRef, { journals: updatedJournals });
                    setMessage('Successfully updated the title!');
                    setSettingSuccess(true);
                }
            } catch (error) {
                setMessage('Oops, an unexpected error has occurred!');
                setSettingError(true);
                console.error(error);
            }
        };

        const handleKeyDown = (e: React.KeyboardEvent) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                handleBlur();
            }
        };

        return editing ? (
            <TextField
                label="Title"
                variant="standard"
                fullWidth
                size="small"
                value={tempTitle}
                onChange={(e) => setTempTitle(e.target.value)}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                autoFocus
                spellCheck={true}
                autoCapitalize='sentences'
                autoCorrect='on'
            />
        ) : (
            <Typography
                variant="h5"
                onClick={() => setEditing(true)}
                sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
            >
                {journal.title || 'Click to edit title'}
            </Typography>
        );
    };
    const EditableBody = () => {
        const [editing, setEditing] = useState(false);
        const [tempBody, setTempBody] = useState(journal.content);

        const handleBlur = async () => {
            setEditing(false);
            if (journal.content === tempBody) return;
            journal.content = (tempBody);
            try {
                if (user && userData) {
                    const docRef = doc(db, "users", user.uid);
                    const updatedJournals: firestoreJournalEntry[] = [];
                    userData.journals.forEach((jour) => updatedJournals.push(jour.toFirestore()));
                    await updateDoc(docRef, { journals: updatedJournals });
                    setMessage('Successfully updated the body!');
                    setSettingSuccess(true);
                }
            } catch (error) {
                setMessage('Oops, an unexpected error has occurred!');
                setSettingError(true);
                console.error(error);
            }
        };

        const handleKeyDown = (e: React.KeyboardEvent) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleBlur();
            }
        };

        return editing ? (
            <TextField
                label="Body"
                multiline
                minRows={4}
                maxRows={15}
                variant="outlined"
                fullWidth
                value={tempBody}
                onChange={(e) => setTempBody(e.target.value)}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                autoFocus
                spellCheck={true}
                autoCapitalize='sentences'
                autoCorrect='on'
                placeholder="Write your journal here..."
            />
        ) : (
            <Typography
                onClick={() => setEditing(true)}
                sx={{
                    whiteSpace: 'pre-wrap',
                    cursor: 'text',
                    padding: 1,
                    border: '1px solid transparent',
                    '&:hover': { borderColor: 'grey.400' },
                    minHeight: '120px',
                    color: journal.content ? 'text.primary' : 'text.disabled',
                    mt: 2,
                }}
            >
                {journal.content || 'Click to write your journal...'}
            </Typography>
        );
    };
    const handleSubmit = () => {
        if (user && userData) {

        }
    };
    const handleDelete = async () => {
        if (user && userData) {
            const docRef = doc(db, "users", user.uid);
            const temp = userData.journals.filter((jour) => jour.id !== journal.id);
            userData.journals = userData.journals.filter((jour) => jour.id !== journal.id);
            const updatedJournals: firestoreJournalEntry[] = [];
            temp.forEach((jour) => updatedJournals.push(jour.toFirestore()));
            await updateDoc(docRef, { journals: updatedJournals });
            setMessage('Successfully deleted the journal');
            setSettingSuccess(true);
            navigate('/dashboard');
        }
    };
    return (
        <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 }, py: { xs: 4, sm: 6 }, flexGrow: 1 }}>
            <Snackbar
                open={settingSuccess}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                autoHideDuration={5000}
                onClose={() => {
                    setSettingSuccess(false);
                    setMessage(null);
                }}
            >
                <Alert severity='success'>
                    {message}
                </Alert>
            </Snackbar>
            <Snackbar
                open={settingError}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                autoHideDuration={5000}
                onClose={() => {
                    setSettingError(false);
                    setMessage(null);
                }}
            >
                <Alert severity='error'>
                    {message}
                </Alert>
            </Snackbar>
            <Paper sx={{ p: 2 }}>
                <Tabs value={value} onChange={handleChange} aria-label='Journal Tabs'>
                    <Tab icon={<DescriptionIcon />} label="Content" />
                    <Tab icon={<SettingsIcon />} label="Config" />
                </Tabs>
                {value === 0 && (
                    <Card elevation={3} sx={{ mx: 'auto', mt: 5, p: 3 }}>
                        <CardHeader title={<><EditableTitle /><Divider sx={{ my: 2 }} /></>} />
                        <CardContent>
                            <Box mt={3}>
                                <EditableBody />
                            </Box>
                        </CardContent>
                    </Card>
                )}
                {value === 1 && <>
                    <Card elevation={3} sx={{ mt: 5 }}>
                        <CardHeader title={
                            <>
                                <Typography variant='inherit'>Config</Typography>
                                <Divider sx={{ mt: 2 }} />
                            </>
                        } />
                        <CardContent>
                            <FormControlLabel
                                control={
                                    <Checkbox checked={isPrivate} onChange={(e) => setIsPrivate(e.target.checked)} />
                                }
                                label="Private Entry"
                            />
                            <Collapse in={isPrivate} timeout={{ enter: 350, exit: 350 }}>
                                <Divider sx={{ my: 2 }} />
                                <TextField
                                    label="Password for Journal"
                                    type='password'
                                    autoComplete='password'
                                    fullWidth
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    sx={{ mt: 2 }}
                                />
                            </Collapse>
                        </CardContent>
                    </Card>
                    <Divider sx={{ my: 2 }} />
                    <Card elevation={3}>
                        <CardHeader title={
                            <>
                                <Typography variant='inherit' sx={{ display: 'flex', alignItems: 'center' }}><CategoryIcon sx={{ mr: 1 }} />Categories</Typography>
                                <Divider sx={{ mt: 2 }} />
                            </>
                        } />
                        <CardContent>
                            <Select
                                fullWidth
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                displayEmpty
                            >
                                <MenuItem value="" disabled>
                                    Select Category
                                </MenuItem>
                                <MenuItem value="uncategorized">Uncategorized</MenuItem>
                                <MenuItem value="personal">Personal</MenuItem>
                                <MenuItem value="work">Work</MenuItem>
                                <MenuItem value="dreams">Dreams</MenuItem>
                            </Select>
                        </CardContent>
                    </Card>
                    <Divider sx={{ my: 4 }} />
                    <Box sx={{ mb: 4 }}>
                        <Button
                            variant="contained"
                            fullWidth
                            onClick={handleSubmit}
                            disabled={!category || (!password && isPrivate)}
                        >
                            Submit
                        </Button>
                        <Button variant='contained' fullWidth onClick={handleDelete} color='error' sx={{ mt: 2 }}>Delete</Button>
                    </Box>
                </>
                }
            </Paper>
        </Container>
    );
};
export default ViewEntry;