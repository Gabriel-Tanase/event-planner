import { Box, Typography } from "@mui/material";
import { getUserFetcher } from "@/features/UserProfile/service/fetchers";
import { useUserService } from "@/features/UserProfile/service/useUserService";
import { dehydrate, QueryClient } from "react-query";
import Layout from "@/Layouts/Layout";
import { isEmpty } from "lodash";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useAuthenticationService } from "@/features/Authentication/service/useAuthenticationService";

export default function Home() {
	const { useGetCurrentUser } = useUserService();
	const { isUserLoggedIn } = useAuthenticationService();
	console.log("index:::: ", isUserLoggedIn);
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

	return {
		props: {
			dehydrateState: dehydrate(queryClient),
		},
	};
};
