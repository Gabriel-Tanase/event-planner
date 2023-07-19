import React, { useContext, useState } from "react";
import Link from "next/link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";

import useTranslation from "next-translate/useTranslation";
import { useTheme } from "@mui/material";

import Logout from "@mui/icons-material/Logout";
import Avatar from "@mui/material/Avatar";
import Brightness7Icon from "@mui/icons-material/Brightness4";
import Brightness4Icon from "@mui/icons-material/Brightness4";

import { useAuthenticationService } from "@/features/Authentication/service/useAuthenticationService";

import { ColorModeContext } from "@/pages/_app";
import { ROUTES } from "@/shared/constants/routes";
import Authentication from "@/features/Authentication";

const Account: React.FC = () => {
	const [proceedWithLogout, setProceedWithLogout] = useState(false);
	const [anchorEl, setAnchorEl] = useState<null | any>(null);

	const colorMode = useContext(ColorModeContext);
	const { t } = useTranslation("locale");

	const { useLogout, isUserLoggedIn } = useAuthenticationService();

	const onLogoutSuccess = () => {
		setProceedWithLogout(false);
		handleClose();
	};

	const {} = useLogout(proceedWithLogout, onLogoutSuccess);

	const open = Boolean(anchorEl);

	const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.nativeEvent.target);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const onClickLogout = () => {
		setProceedWithLogout(true);
	};

	const theme = useTheme();

	return (
		<Box>
			<Tooltip title='Account information'>
				<IconButton
					onClick={handleMenuClick}
					size='small'
					sx={{ ml: 2 }}
					aria-controls={open ? "account-menu" : undefined}
					aria-haspopup='true'
					aria-expanded={open ? "true" : undefined}
				>
					<Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
				</IconButton>
			</Tooltip>
			<Menu
				anchorEl={anchorEl}
				id='account-menu'
				open={open}
				onClose={handleClose}
				PaperProps={{
					elevation: 0,
					sx: {
						overflow: "visible",
						filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
						mt: 1.5,
						"& .MuiAvatar-root": {
							width: 32,
							height: 32,
							ml: -0.5,
							mr: 1,
						},
					},
				}}
				transformOrigin={{ horizontal: "right", vertical: "top" }}
				anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
			>
				{isUserLoggedIn && (
					<MenuItem onClick={handleClose}>
						<ListItemIcon>
							<Avatar />
						</ListItemIcon>
						<Link href={ROUTES.ACCOUNT}>
							<Typography fontWeight={600}>
								{t("BUTTONS.MY_ACCOUNT")}
							</Typography>
						</Link>
					</MenuItem>
				)}
				{isUserLoggedIn && <Divider />}
				<MenuItem onClick={colorMode.toggleColorMode}>
					<ListItemIcon>
						{theme.palette.mode === "dark" ? (
							<Brightness7Icon />
						) : (
							<Brightness4Icon />
						)}
					</ListItemIcon>
					<Typography fontWeight={600}>
						{t(
							`GENERAL.DARK_MODE_${
								theme.palette.mode === "dark" ? "OFF" : "ON"
							}`
						)}
					</Typography>
				</MenuItem>
				{isUserLoggedIn && (
					<MenuItem onClick={() => onClickLogout()}>
						<ListItemIcon>
							<Logout />
						</ListItemIcon>
						<Typography fontWeight={600}>
							{t("BUTTONS.LOGOUT")}
						</Typography>
					</MenuItem>
				)}
				{!isUserLoggedIn && (
					<MenuItem>
						<Authentication
							onAuthenticationSuccessfully={handleClose}
						/>
					</MenuItem>
				)}
			</Menu>
		</Box>
	);
};

export default Account;
