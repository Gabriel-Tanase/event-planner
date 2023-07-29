import { dehydrate, QueryClient } from "react-query";
import { isEmpty } from "lodash";
import { Box, Typography } from "@mui/material";
import { getUserFetcher } from "@/features/UserProfile/service/fetchers";
import { useGetCurrentUser } from "@/features/UserProfile/service/useUserService";
import Layout from "@/Layouts/Layout";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useAuthenticationService } from "@/features/Authentication/service/useAuthenticationService";
import { getVerifyFetcher } from "@/features/Authentication/service/fetcher";

export default function Home() {
	const { useVerifyLoggedIn } = useAuthenticationService();
	const { isUserLoggedIn } = useVerifyLoggedIn();
	const { isLoadingCurrentUser, currentUserData } =
		useGetCurrentUser(isUserLoggedIn);

	return (
		<Layout>
			<>
				{isLoadingCurrentUser && <LoadingSpinner />}
				{!isEmpty(currentUserData) && (
					<Box>
						<Typography>{currentUserData.firstName}</Typography>
						<Typography>{currentUserData.lastName}</Typography>
						<Typography>{currentUserData.email}</Typography>
					</Box>
				)}
				{isEmpty(currentUserData) && (
					<Typography>No records found</Typography>
				)}
			</>
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
