// React

import React, { useContext } from 'react';

// Material UI 

import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';

import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import PsychologyIcon from '@mui/icons-material/Psychology';
//import LoginIcon from '@mui/icons-material/Login';
//import Button from '@mui/material/Button';

// import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
// import Link from '@mui/material/Link';
// import { auth } from '../data/Firebase';

// Icons 

// import DarkModeIcon from '@mui/icons-material/DarkModeOutlined';
// import LightModeIcon from '@mui/ico//ns-material/LightModeOutlined';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../data/Firebase';

const StyledExternalLink = styled(NavLink)(({ theme }) => ({
    color: 'inherit',
    textDecoration: 'none',
    marginRight: theme.spacing(2),
    fontWeight: 'normal',
    display: 'inline-flex',
    alignItems: 'center',
    '&:hover': {
        textDecoration: 'none',
    },
}));

const Header = () => {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const { user } = useContext(AuthContext);
    return (
        <AppBar
            position="static"
            sx={{
                bgcolor: (theme) => theme.palette.background.default,
                color: (theme) => theme.palette.text.primary,
            }}
        >
            <Toolbar>
                <PsychologyIcon sx={{ mr: 1 }} />
                <StyledExternalLink to="/">
                    <Button color="inherit" variant="text">
                        Home
                    </Button>
                </StyledExternalLink>
                <StyledExternalLink to="/dashboard">
                    <Button color="inherit" variant="text">
                        Dashboard
                    </Button>
                </StyledExternalLink>
                <StyledExternalLink to="/learn">
                    <Button color="inherit" variant='text'>
                        Learn
                    </Button>
                </StyledExternalLink>
                <Typography sx={{
                    flexGrow: 1,
                }} />
                {!user &&
                    <Box>
                        <StyledExternalLink to="/login">
                            <Button color="inherit" variant='contained'>
                                Login
                            </Button>
                        </StyledExternalLink>
                        <StyledExternalLink to="/signup">
                            <Button color="inherit" variant='contained'>
                                Sign Up
                            </Button>
                        </StyledExternalLink>
                    </Box>
                }
                {user && (
                    <>
                        <Stack direction="row" spacing={2} alignItems="center">
                            <Tooltip title="Account settings">
                                <IconButton
                                    onClick={handleClick}
                                    size="small"
                                    sx={{ ml: 2 }}
                                    aria-controls={open ? 'account-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                >
                                    <Avatar src={user.photoURL || undefined}>
                                        {!user.photoURL && user.displayName?.[0]}
                                    </Avatar>
                                </IconButton>
                            </Tooltip>
                        </Stack>
                        <Menu
                            anchorEl={anchorEl}
                            id="account-menu"
                            open={open}
                            onClose={handleClose}
                            onClick={handleClose}
                            slotProps={{
                                paper: {
                                    elevation: 0,
                                    sx: {
                                        overflow: 'visible',
                                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                        mt: 1.5,
                                        '& .MuiAvatar-root': {
                                            width: 32,
                                            height: 32,
                                            ml: -0.5,
                                            mr: 1,
                                        },
                                        '&::before': {
                                            content: '""',
                                            display: 'block',
                                            position: 'absolute',
                                            top: 0,
                                            right: 14,
                                            width: 10,
                                            height: 10,
                                            bgcolor: 'background.paper',
                                            transform: 'translateY(-50%) rotate(45deg)',
                                            zIndex: 0,
                                        },
                                    },
                                },
                            }}
                            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                        >
                            <MenuItem onClick={() => {
                                navigate('/manageAccount');
                            }}>
                                <Avatar src={user.photoURL || undefined}>
                                    {!user.photoURL && user.displayName?.[0]}
                                </Avatar> Manage my Account
                            </MenuItem>
                            <Divider />
                            <MenuItem onClick={() => {
                                navigate('/settings');
                            }}>
                                <ListItemIcon>
                                    <Settings fontSize="small" color='primary' />
                                </ListItemIcon>
                                Settings
                            </MenuItem>
                            <MenuItem onClick={() => {
                                signOut(auth);
                            }}>
                                <ListItemIcon>
                                    <Logout fontSize="small" color='primary' />
                                </ListItemIcon>
                                Logout
                            </MenuItem>
                        </Menu>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Header;
