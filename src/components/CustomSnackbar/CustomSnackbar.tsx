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
	message: string;
	action: string;
	ButtonProps: ButtonProps;
	SnackbarProps: SnackbarProps;
	customParameters: {
		autoHideDuration?: number;
		type?: AlertColor;
	};
};

const CustomSnackbarComponent: React.FC<TCustomSnackbarComponentProps> = ({
	message,
	action,
	ButtonProps,
	SnackbarProps,
	customParameters,
}) => {
	return (
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
};

export default CustomSnackbarComponent;
