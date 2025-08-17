import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import { cardStyles } from '../data/Styles';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import { VIEW_ENTRY } from '../data/Routes';
import { useNavigate } from 'react-router-dom';
import type { JournalEntry } from '../data/JournalEntry';
import type { Dispatch, SetStateAction } from 'react';

interface JournalCardProps {
    journal: JournalEntry;
    setOpenDialog: Dispatch<SetStateAction<boolean>>;
}

const JournalCard = (props: JournalCardProps) => {
    const navigate = useNavigate();
    return (
        <Card elevation={3} sx={cardStyles}>
            <CardHeader
                title={
                    <>
                        <Box>{props.journal.title}</Box>
                        <Divider sx={{ mt: 1 }} />
                    </>
                }
            />
            <CardContent>
                <Typography>
                    {props.journal.content.trim().length > 0
                        ? props.journal.getBrief()
                        : 'There is no content yet! Edit me!'}
                </Typography>
            </CardContent>
            <CardActions sx={{ paddingLeft: 1 }}>
                <Button onClick={() => {
                    if (props.journal.passwordProtected) {
                        props.setOpenDialog(true);
                    } else navigate(VIEW_ENTRY(props.journal.id));
                }} variant='text' sx={{
                    transition: '0.3s ease', '&:hover': {
                        bgcolor: ({ palette }) => palette.primary.main,
                        color: ({ palette }) => palette.text.primary,
                    }
                }}>
                    {props.journal.passwordProtected ? 'Unlock' : 'View Entry'}
                </Button>
            </CardActions>
        </Card>
    );
};

export default JournalCard;