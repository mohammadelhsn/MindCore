import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography'; import { divCenter } from '../data/Styles';
import Paper from '@mui/material/Paper';
;

const LoadingComp = () => {
    return (
        <Paper sx={{ ...divCenter, flexDirection: 'column', gap: 2, my: 2 }}>
            <CircularProgress size={80} />
            <Typography variant='h6' sx={{ py: 2 }}>Loading...</Typography>
        </Paper>
    );
};

export default LoadingComp;