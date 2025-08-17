/** ========== REACT ========== */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

/** ========== FIREBASE ========== */
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../data/Firebase';

/** ========== INTERNAL DATA ========== */
import { JournalEntry } from '../data/JournalEntry';

/** ========== MUI COMPONENTS ========== */
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Checkbox from '@mui/material/Checkbox';
import Collapse from '@mui/material/Collapse';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useAuth } from '../contexts/useAuth';
import { containerStyle } from '../data/Styles';
import { useFeedback } from '../contexts/useFeedback';
import { VIEW_ENTRY } from '../data/Routes';

const steps = ['Title', 'Settings & Config'];

/** NEW JOURNAL PAGE */
const NewJournalPage = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [title, setTitle] = useState('');
    const [isPrivate, setIsPrivate] = useState(false);
    const [password, setPassword] = useState<string>('');
    const [category, setCategory] = useState('uncategorized');
    const { user, userData } = useAuth();
    const { setFeedback } = useFeedback();
    const navigate = useNavigate();
    const handleNext = () => setActiveStep((prev) => Math.min(prev + 1, steps.length - 1));
    const handleBack = () => setActiveStep((prev) => Math.max(prev - 1, 0));
    const handleSubmit = async () => {
        if (!user || !userData) return;

        const newJournalEntry = new JournalEntry({ authorId: userData.uid, title: title, content: '', tags: [], mood: '', passwordProtected: isPrivate, password: password, location: '' });
        const userRef = doc(db, "users", user.uid);
        try {
            const journals = [];
            journals.push(newJournalEntry.toFirestore());
            await updateDoc(userRef, { journals: journals });
            userData.journals.push(newJournalEntry);
            setFeedback('New journal successfully created', 'success');
            navigate(VIEW_ENTRY(newJournalEntry.id));
        } catch (error) {
            setFeedback('Oops, an unexpected error has occurred!', 'error');
            console.error(error);
        }
    };
    useEffect(() => {
        if (!user) navigate('/login');
        return;
    });
    return (
        <Container
            maxWidth="xl"
            sx={containerStyle}>
            <Box sx={{ width: '100%', maxWidth: 600, mx: 'auto', mt: 4 }}>
                <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                <Box sx={{ mt: 4 }}>
                    {activeStep === 0 && (
                        <>
                            <TextField
                                label="Title"
                                fullWidth
                                margin="normal"
                                required
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                                <Button variant="contained" onClick={handleNext} disabled={!title}>
                                    Next
                                </Button>
                            </Box>
                        </>
                    )}

                    {activeStep === 1 && (
                        <>
                            <Card>
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
                            <Card>
                                <CardHeader title={
                                    <>
                                        <Typography variant='inherit'>Categories</Typography>
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
                            </Card>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                                <Button variant="outlined" onClick={handleBack}>Back</Button>
                                <Button
                                    variant="contained"
                                    onClick={handleSubmit}
                                    disabled={!category || (!password && isPrivate)}
                                >
                                    Submit
                                </Button>
                            </Box>
                        </>
                    )}
                </Box>
            </Box>
        </Container>
    );
};

export default NewJournalPage;