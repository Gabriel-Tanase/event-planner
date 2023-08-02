import React from "react";
import { useRouter } from "next/router";
import { isEmpty } from "lodash";
import { Box, Typography } from "@mui/material";
import Layout from "@/Layouts/Layout";
import LoadingSpinner from "@/components/LoadingSpinner";
import {
	selectCurrentUser,
	useGetUserById,
} from "@/features/UserProfile/service/useUserService";
import { TUserModel } from "@/features/UserProfile/types/user";

export type TAccountIdProps = {
	currentUser: TUserModel;
};

const AccountId: React.FC<TAccountIdProps> = () => {
	const router = useRouter();
	const currentUser = selectCurrentUser();

	const accountId: string | null =
		(router.query?.accountId as string) || null;

	const { userData: accountUser, isLoadingUser } = useGetUserById(accountId);

	const isOwner = currentUser?.id === accountUser?.id;
	const user = isOwner ? currentUser : accountUser;

	return (
		<Layout>
			<>
				{isLoadingUser && <LoadingSpinner />}
				{!isEmpty(user) && (
					<Box>
						<Typography>First name: {user.firstName}</Typography>
						<Typography>Last name: {user.lastName}</Typography>
						<Typography>Email address: {user.email}</Typography>
						<Typography>
							Premium user: {String(user.isPremium)}
						</Typography>
						<Typography>Avatar hexCode: {user.avatar}</Typography>
					</Box>
				)}
			</>
		</Layout>
	);
};

export default AccountId;
