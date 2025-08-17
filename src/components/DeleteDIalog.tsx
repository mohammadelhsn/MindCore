/** ======= REACT ======= */
import type { SetStateAction } from 'react';

/** ======= MUI COMPONENTS ======= */
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

/** ======= MUI ICONS ======= */
import DeleteIcon from '@mui/icons-material/Delete';

/** ======= STYLES ======= */
import { alignTextIcon } from '../data/Styles';

/** */
const DeleteDialog = ({ openDialog, setOpenDialog, handleDelete }: { openDialog: boolean, setOpenDialog: (value: SetStateAction<boolean>) => void, handleDelete: () => Promise<void>; },) => {
    return (
        <Dialog open={openDialog}>
            <DialogTitle sx={alignTextIcon}><DeleteIcon color='error' sx={{ mr: 1 }} />Delete Journal</DialogTitle>
            <DialogContent>
                <DialogContentText>Are you sure you want to delete this?</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpenDialog(false)} >Close</Button>
                <Button variant='contained' onClick={handleDelete} color='error'>Delete</Button>
            </DialogActions>
        </Dialog>
    );
};


export default DeleteDialog;