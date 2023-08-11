import { dehydrate, QueryClient } from "react-query";
import { Typography } from "@mui/material";
import { getUserFetcher } from "@/features/UserProfile/service/fetchers";
import Layout from "@/Layouts/Layout";
import { getVerifyFetcher } from "@/features/Authentication/service/fetcher";
import { useAuthenticationService } from "@/features/Authentication/service/useAuthenticationService";
import { useGetCurrentUser } from "@/features/UserProfile/service/useUserService";
import { useEffect } from "react";
import Hotjar from "@hotjar/browser";

const siteId = 3610112;
const hotJarVersion = 6;

export default function Home() {
	const { useVerifyLoggedIn } = useAuthenticationService();
	const { isUserAuthenticated } = useVerifyLoggedIn();

	useGetCurrentUser(isUserAuthenticated);

	useEffect(() => {
		Hotjar.init(siteId, hotJarVersion);
	}, []);

	return (
		<Layout>
			<Typography variant='h4'>
				Welcome to the Event Planner (presentation homepage)
			</Typography>
		</Layout>
	);
}

export const getStaticProps = async () => {
	const queryClient = new QueryClient();

	await queryClient.prefetchQuery("currentUser", getUserFetcher);
	await queryClient.prefetchQuery("isCurrentUserLogged", getVerifyFetcher);

	return {
		props: {
			dehydrateState: dehydrate(queryClient),
		},
	};
};
