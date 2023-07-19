import DialogContent from "@mui/material/DialogContent";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import React, { ReactElement } from "react";

type DefaultDialogProps = {
	dialogTitle: string;
	handleClose: (...args: any[]) => void;
	isOpen: boolean;
	children: ReactElement<any, any>;
};

const DefaultDialog: React.FC<DefaultDialogProps> = (props) => {
	const { dialogTitle, handleClose, isOpen, children } = props;

	return (
		<Dialog onClose={handleClose} open={isOpen}>
			<DialogTitle align='center'>{dialogTitle}</DialogTitle>
			<DialogContent>{children}</DialogContent>
		</Dialog>
	);
};

export default DefaultDialog;
