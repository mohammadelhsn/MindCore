import type { SxProps, Theme } from '@mui/material';
import type { Dispatch, ReactNode, SetStateAction } from 'react';

export type FeedbackType = 'success' | 'error' | 'info' | 'warning';

export interface FeedbackContextProps {
	message: string | null;
	type: FeedbackType;
	setFeedback: (msg: string, type?: FeedbackType) => void;
	clearFeedback: () => void;
}

export type FirebaseRawData<T> = {
	/** @description Success state of the operation */
	success: boolean;
	/** @description Data */
	data: T | null;
	/** @description The error itself (non readable version) */
	error: string | null;
	/** @description Response message for the user */
	message: string;
};

export type ProviderName = 'google' | 'github' | 'facebook';

export type LoginButtonState = {
	google: boolean;
	github: boolean;
	facebook: boolean;
};

type AuthButtonAction = 'signup' | 'login';

export interface AuthButtonProps {
	provider: ProviderName;
	action: AuthButtonAction;
	handler: () => Promise<void>;
	variant?: 'text' | 'outlined' | 'contained';
	startIcon?: ReactNode;
	loading?: boolean;
	sx?: SxProps<Theme>;
}

export interface PasswordDialogProps {
	openDialog: boolean;
	setOpenDialog: Dispatch<SetStateAction<boolean>>;
	password: string;
	setPassword: Dispatch<SetStateAction<string>>;
	passwordError: string | null;
	setPasswordError: Dispatch<SetStateAction<string | null>>;
	journalPassword: string;
	id: string;
}
