import React from "react";
import {
	Alert,
	Snackbar,
	Button,
	ButtonProps,
	SnackbarProps,
	AlertColor,
} from "@mui/material/";

type TCustomSnackbarComponentProps = {
	message?: string;
	action?: string;
	ButtonProps?: Partial<ButtonProps>;
	SnackbarProps: Partial<SnackbarProps>;
	customParameters: {
		autoHideDuration?: number;
		type?: AlertColor;
	};
};

const CustomSnackbarComponent: React.ComponentType<
	TCustomSnackbarComponentProps
> = ({ message, action, ButtonProps, SnackbarProps, customParameters }) => (
	<Snackbar autoHideDuration={3000} {...SnackbarProps}>
		<Alert
			severity={customParameters?.type}
			action={
				action != null && (
					<Button color='inherit' size='small' {...ButtonProps}>
						{action}
					</Button>
				)
			}
		>
			{message}
		</Alert>
	</Snackbar>
);

export default CustomSnackbarComponent;
