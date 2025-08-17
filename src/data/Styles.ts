import { type SxProps, type Theme } from '@mui/material';

export const sx = (styles: SxProps<Theme>): SxProps<Theme> => styles;

export const cardStyles = sx({
	transition: '0.3s ease',
	'&:hover': {
		transform: 'scale(1.03)',
	},
});

export const containerStyle = sx({
	px: { xs: 2, sm: 3 },
	py: { xs: 4, sm: 6 },
	flexGrow: 1,
});

export const divCenter = sx({
	display: 'flex',
	alignItems: 'center', // div center
	justifyContent: 'center',
});

export const alignTextIcon = sx({
	display: 'flex',
	alignItems: 'center',
});

export const containerCenter = sx({
	px: { xs: 2, sm: 3 },
	py: { xs: 4, sm: 6 },
	flexGrow: 1,
	display: 'flex',
	alignItems: 'center', // div center
	justifyContent: 'center',
});

export const iconStyle = sx({
	mr: 1,
	color: ({ palette }) => palette.primary.main,
});

export const authButtonStyle = sx({
	...divCenter,
	transition: '0.3s ease',
	'&:hover': {
		transform: 'scale(1.02)',
		bgcolor: ({ palette }) => palette.primary.light,
		color: ({ palette }) => palette.text.primary,
	},
});

export const authPagesStyles = sx({
	display: 'flex',
	flexDirection: 'column',
	gap: 2,
});
