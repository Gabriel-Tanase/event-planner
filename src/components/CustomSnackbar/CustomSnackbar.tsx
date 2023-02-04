import React from "react";
import { Alert, Snackbar, Button } from "@mui/material/";

const CustomSnackbarComponent = ({
	message,
	action,
	ButtonProps,
	SnackbarProps,
	customParameters,
}: any) => {
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
