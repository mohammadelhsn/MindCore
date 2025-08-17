/** ======= MUI COMPONENTS ======= */
import Button from '@mui/material/Button';

/** ======= STYLES, FUNCTIONS & TYPES ======= */
import { authButtonStyle } from '../data/Styles';
import { capitalize } from '../data/Functions';
import type { AuthButtonProps } from '../data/Types';

/** */
const AuthButton = (props: AuthButtonProps) => {
    return (
        <Button
            variant={props.variant ?? 'outlined'}
            onClick={props.handler}
            startIcon={props.startIcon ?? (<img src={`https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/${props.provider}.svg`} alt={capitalize(props.provider)} width={20} />)}
            loading={props.loading}
            sx={props.sx ?? authButtonStyle}
        >
            {props.action} with {capitalize(props.provider)}
        </Button>
    );
};

export default AuthButton;