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

import Login from "@mui/icons-material/Login";
import Logout from "@mui/icons-material/Logout";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Avatar from "@mui/material/Avatar";
import Brightness7Icon from "@mui/icons-material/Brightness4";
import Brightness4Icon from "@mui/icons-material/Brightness4";

import { useAuthenticationService } from "@/features/Authentication/service/useAuthenticationService";
import { useUserService } from "@/features/UserProfile/service/useUserService";

import { ColorModeContext } from "@/pages/_app";
import { ROUTES } from "@/shared/constants/routes";

const Account = () => {
	const [proceedWithLogout, setProceedWithLogout] = useState(false);
	const [anchorEl, setAnchorEl] = useState<null | any>(null);

	const colorMode = useContext(ColorModeContext);
	const { t } = useTranslation("locale");

	const { isUserLoggedIn } = useUserService();
	const { useLogout } = useAuthenticationService();
	const {} = useLogout(proceedWithLogout);

	const open = Boolean(anchorEl);

	const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.nativeEvent.target);
	};

	const handleClose = () => {
		setAnchorEl(null);
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
				onClick={handleClose}
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
							<Typography>{t("BUTTONS.MY_ACCOUNT")}</Typography>
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
					<Typography>
						{t(
							`GENERAL.DARK_MODE_${
								theme.palette.mode === "dark" ? "OFF" : "ON"
							}`
						)}
					</Typography>
				</MenuItem>
				{isUserLoggedIn && (
					<MenuItem onClick={() => setProceedWithLogout(true)}>
						<ListItemIcon>
							<Logout />
						</ListItemIcon>
						<Typography>{t("BUTTONS.LOGOUT")}</Typography>
					</MenuItem>
				)}
				{!isUserLoggedIn && (
					<MenuItem>
						<ListItemIcon>
							<PersonAdd />
						</ListItemIcon>
						<Link href={ROUTES.REGISTER}>
							<Typography>{t("BUTTONS.REGISTER")}</Typography>
						</Link>
					</MenuItem>
				)}
				{!isUserLoggedIn && (
					<MenuItem>
						<ListItemIcon>
							<Login />
						</ListItemIcon>
						<Link href={ROUTES.LOGIN}>
							<Typography>{t("BUTTONS.LOGIN")}</Typography>
						</Link>
					</MenuItem>
				)}
			</Menu>
		</Box>
	);
};

export default Account;
