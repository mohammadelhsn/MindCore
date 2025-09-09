/** ======= React & Routing ======= */
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

/** ======= FIREBASE ======= */
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../data/Firebase';

/** ======= CONTEXT & DATA ======= */
import { JournalEntry, type firestoreJournalEntry } from '../data/JournalEntry';

/** ======= MUI COMPONENTS ======= */
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Checkbox from '@mui/material/Checkbox';
import Collapse from '@mui/material/Collapse';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

/** ======= MUI ICONS ======= */
import CategoryIcon from '@mui/icons-material/Category';
import DeleteIcon from '@mui/icons-material/Delete';
import DescriptionIcon from '@mui/icons-material/Description';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import PublishIcon from '@mui/icons-material/Publish';
import SettingsIcon from '@mui/icons-material/Settings';
import { useAuth } from '../contexts/useAuth';
import { alignTextIcon, containerStyle, iconStyle } from '../data/Styles';
import { DASHBOARD } from '../data/Routes';
import { useFeedback } from '../contexts/useFeedback';
import DeleteDialog from '../components/DeleteDIalog';

const ViewEntry = () => {
    const { user, userData } = useAuth();
    const { setFeedback } = useFeedback();
    const [journal, setJournal] = useState<JournalEntry | null>(null);
    const [isPrivate, setIsPrivate] = useState(false);
    const [category, setCategory] = useState('uncategorized');
    const [password, setPassword] = useState('');
    const [openDialog, setOpenDialog] = useState(false);
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
    }, [id, user, userData, navigate]);
    const handleChange = (_: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    if (!journal) return (<Typography>No such journal was found! Try again!</Typography>);
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
                    setFeedback('Successfully updated the title!', 'success');
                }
            } catch (error) {
                setFeedback('Oops, an unexpected error has occurred!', 'error');
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
                sx={{
                    cursor: 'pointer',
                    '&:hover': { textDecoration: 'underline' },
                    ...alignTextIcon
                }}
            >
                <NoteAltIcon sx={iconStyle} /> {journal.title || 'Click to edit title'}
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
                    setFeedback('Successfully updated the body!', 'success');
                }
            } catch (error) {
                setFeedback('Oops, an unexpected error has occurred!', 'error');
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
    const handleSubmit = () => { };
    const handleDelete = async () => {
        if (user && userData) {
            const docRef = doc(db, "users", user.uid);
            const temp = userData.journals.filter((jour) => jour.id !== journal.id);
            userData.journals = userData.journals.filter((jour) => jour.id !== journal.id);
            const updatedJournals: firestoreJournalEntry[] = [];
            temp.forEach((jour) => updatedJournals.push(jour.toFirestore()));
            await updateDoc(docRef, { journals: updatedJournals });
            setFeedback('Successfully deleted the journal', 'success');
            navigate(DASHBOARD);
            return;
        }
    };
    /*
    TODO: Possibly add re-login for deletion
    TODO: Add password check on this page in case someone tries to bypass it
    */
    return (
        <Container maxWidth="xl" sx={containerStyle}>
            <DeleteDialog openDialog={openDialog} setOpenDialog={setOpenDialog} handleDelete={handleDelete} />
            <Paper sx={{ p: 2 }}>
                <Tabs value={value} onChange={handleChange} aria-label='Journal Tabs'>
                    <Tab icon={<DescriptionIcon />} label="Content" />
                    <Tab icon={<SettingsIcon />} label="Config" />
                </Tabs>
                {value === 0 && (
                    <Card elevation={3} sx={{ mx: 'auto', mt: 5, p: 3 }}>
                        <CardHeader
                            title={
                                <>
                                    <EditableTitle />
                                    <Divider sx={{ my: 2 }} />
                                </>}
                        />
                        <CardContent>
                            <Box><EditableBody /></Box>
                        </CardContent>
                    </Card>
                )}
                {value === 1 && <>
                    <Card elevation={3} sx={{ mt: 5 }}>
                        <CardHeader title={
                            <>
                                <Typography variant='inherit' sx={alignTextIcon}><SettingsIcon sx={iconStyle} />Config</Typography>
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
                        <CardActions>
                            <Button
                                variant="outlined"
                                onClick={handleSubmit}
                                disabled={(!password && isPrivate) || !isPrivate}
                                startIcon={<PublishIcon />}
                            >
                                Submit
                            </Button>
                        </CardActions>
                    </Card>
                    <Divider sx={{ my: 2 }} />
                    <Card elevation={3}>
                        <CardHeader title={
                            <>
                                <Typography variant='inherit' sx={alignTextIcon}><CategoryIcon sx={iconStyle} />Categories</Typography>
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
                                <MenuItem value="" disabled>Select Category</MenuItem>
                                <MenuItem value="uncategorized">Uncategorized</MenuItem>
                                <MenuItem value="personal">Personal</MenuItem>
                                <MenuItem value="work">Work</MenuItem>
                                <MenuItem value="dreams">Dreams</MenuItem>
                            </Select>
                        </CardContent>
                        <CardActions>
                            <Button
                                variant="outlined"
                                onClick={handleSubmit}
                                startIcon={<PublishIcon />}
                            >
                                Submit
                            </Button>
                        </CardActions>
                    </Card>
                    <Divider sx={{ my: 4 }} />
                    <Card elevation={3}>
                        <CardHeader title={
                            <>
                                <Typography variant='inherit' sx={alignTextIcon}><DeleteIcon color='error' sx={{ mr: 1 }} />Delete this Journal</Typography>
                                <Divider sx={{ mt: 2 }} />
                            </>
                        }
                        />
                        <CardContent><Typography variant='inherit'>This will permanently delete your journal. This action cannot be undone.</Typography></CardContent>
                        <CardActions>
                            <Button variant='contained' onClick={() => setOpenDialog(true)} color='error' startIcon={<DeleteIcon />} sx={{ mt: 2 }}>Delete</Button>
                        </CardActions>
                    </Card>
                </>
                }
            </Paper>
        </Container >
    );
};
export default ViewEntry;