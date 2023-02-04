import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import Brightness7Icon from "@mui/icons-material/Brightness4";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import { ColorModeContext } from "./_app";
import { useContext } from "react";
import { dehydrate, QueryClient } from "react-query";
import {
	getTestQueryFetcher,
	useAuthenticationService,
} from "@/features/Authentication/service/useAuthenticationService";

export default function Home() {
	const { t } = useTranslation("locale");
	const theme = useTheme();
	const colorMode = useContext(ColorModeContext);

	const { useGetTest, useRegisterMutation } = useAuthenticationService();
	const { isTestError, isTestLoading, testData } = useGetTest();

	const mutation = useRegisterMutation();

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
			<Box>
				<Typography>{isTestError}</Typography>
				<Typography>{isTestLoading}</Typography>
				<Typography>{testData}</Typography>
			</Box>
			<Box color={theme.palette.primary.main}>{t("welcome")}</Box>
			<Link href={"/register"}>Register</Link>
			<Divider />
			<Link href={"/login"}>Login</Link>
		</>
	);
}

export const getStaticProps = async () => {
	const queryClient = new QueryClient();

	await queryClient.prefetchQuery("test", getTestQueryFetcher);

	return {
		props: {
			dehydrateState: dehydrate(queryClient),
		},
	};
};
