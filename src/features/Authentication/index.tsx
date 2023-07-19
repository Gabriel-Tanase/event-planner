import React, { useState } from "react";
import DefaultDialog from "@/components/Dialogs/DefaultDialog";
import Login from "./components/Login";
import Register from "./components/Register";
import useTranslation from "next-translate/useTranslation";

import LoginIcon from "@mui/icons-material/Login";
import { Box, ListItemIcon, Typography } from "@mui/material";
import { delay } from "lodash";

type AuthenticationProps = {
	onAuthenticationSuccessfully: () => void;
};

const Authentication: React.FC<AuthenticationProps> = ({
	onAuthenticationSuccessfully,
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const [showLogin, setShowLogin] = useState(true);
	const { t } = useTranslation("locale");

	const handleOpen = () => setIsOpen(true);
	const handleClose = () => {
		setIsOpen(false);
		delay(() => setShowLogin(true), 1000);
		onAuthenticationSuccessfully();
	};
	const toggleBetweenLoginAndRegister = () =>
		setShowLogin((prevState) => !prevState);

	return (
		<>
			<Box
				onClick={handleOpen}
				display='flex'
				justifyContent='space-between'
			>
				<ListItemIcon>
					<LoginIcon />
				</ListItemIcon>
				<Typography fontWeight={600}>{t("BUTTONS.LOGIN")}</Typography>
			</Box>
			<DefaultDialog
				dialogTitle={
					showLogin ? t("BUTTONS.LOGIN") : t("BUTTONS.REGISTER")
				}
				isOpen={isOpen}
				handleClose={handleClose}
			>
				{showLogin ? (
					<Login
						onClose={handleClose}
						navigateToRegister={toggleBetweenLoginAndRegister}
					/>
				) : (
					<Register
						onClose={handleClose}
						switchToLogin={() => setShowLogin(true)}
						navigateToLogin={toggleBetweenLoginAndRegister}
					/>
				)}
			</DefaultDialog>
		</>
	);
};

export default Authentication;
