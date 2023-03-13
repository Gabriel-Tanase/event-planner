import {
	Box,
	Divider,
	IconButton,
	LoadingButton,
	Typography,
	useTheme,
} from "@mui/material";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import Brightness7Icon from "@mui/icons-material/Brightness4";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import { ColorModeContext } from "./_app";
import { useContext, useState } from "react";
import { useAuthenticationService } from "@/features/Authentication/service/useAuthenticationService";
import { LogoutOutlined } from "@mui/icons-material";
import { getUserFetcher } from "@/features/UserProfile/service/fetchers";
import { useUserService } from "@/features/UserProfile/service/useUserService";
import { dehydrate, QueryClient } from "react-query";
import { ROUTES } from "@/shared/constants/routes";

export default function Home() {
	const [proceedWithLogout, setProceedWithLogout] = useState(false);
	const { isUserLoggedIn, useGetCurrentUser } = useUserService();

	const { isLoadingCurrentUser, currentUserData } = useGetCurrentUser();
	console.log("isUserLoggedIn:: ", isUserLoggedIn);

	const { t } = useTranslation("locale");
	const theme = useTheme();
	const colorMode = useContext(ColorModeContext);

	const { useLogout } = useAuthenticationService();

	const { isLogoutLoading } = useLogout(proceedWithLogout);

	return (
		<>
			<Link href='/' locale='en'>
				<h2>EN</h2>
			</Link>
			<Link href='/' locale='ro'>
				<h2>RO</h2>
			</Link>
			<IconButton
				sx={{ ml: 1 }}
				onClick={colorMode.toggleColorMode}
				color='inherit'
			>
				{theme.palette.mode === "dark" ? (
					<Brightness7Icon />
				) : (
					<Brightness4Icon />
				)}
			</IconButton>
			{isUserLoggedIn && (
				<LoadingButton
					loading={isLogoutLoading}
					onClick={() => setProceedWithLogout(true)}
				>
					<LogoutOutlined />
				</LoadingButton>
			)}
			{isLoadingCurrentUser ? (
				<Typography>Loading...</Typography>
			) : (
				<Box>
					<Typography>{currentUserData.firstName}</Typography>
					<Typography>{currentUserData.lastName}</Typography>
					<Typography>{currentUserData.email}</Typography>
				</Box>
			)}
			<Box color={theme.palette.primary.main}>{t("welcome")}</Box>
			<Link href={ROUTES.REGISTER}>Register</Link>
			<Divider />
			<Link href={ROUTES.LOGIN}>Login</Link>
		</>
	);
}

export const getStaticProps = async () => {
	const queryClient = new QueryClient();

	await queryClient.prefetchQuery("currentUser", getUserFetcher);

	return {
		props: {
			dehydrateState: dehydrate(queryClient),
		},
	};
};
