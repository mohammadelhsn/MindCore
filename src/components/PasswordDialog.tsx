import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import type { ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { VIEW_ENTRY } from '../data/Routes';
import type { PasswordDialogProps } from '../data/Types';

const PasswordDialog = (props: PasswordDialogProps) => {
    const navigate = useNavigate();
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        props.setPassword(e.target.value);
        props.setPasswordError(null);
    };
    const handleClick = () => {
        if (props.journalPassword === props.password) {
            navigate(VIEW_ENTRY(props.id));
        } else {
            props.setPasswordError('Incorrect Password!');
        }

    };
    return (
        <Dialog open={props.openDialog}>
            <DialogTitle>This Entry is password protected</DialogTitle>
            <DialogContent>
                <DialogContentText>Enter the password to view this</DialogContentText>
                <TextField
                    value={props.password}
                    type='password'
                    error={props.passwordError != null}
                    helperText={props.passwordError}
                    onChange={handleChange}
                />
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={handleClick}
                    disabled={!props.password || props.password.trim().length == 0}>
                    Unlock
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default PasswordDialog;