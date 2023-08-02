import Layout from "@/Layouts/Layout";
import { Box, Typography } from "@mui/material";
import React from "react";
import { isEmpty } from "lodash";
import ProtectedRoute from "@/wrappers/ProtectedRoute/intex";
import { selectCurrentUser } from "@/features/UserProfile/service/useUserService";
import LoadingSpinner from "@/components/LoadingSpinner";

const Account: React.FC = () => {
	const currentUser = selectCurrentUser();

	return (
		<Layout>
			<ProtectedRoute>
				<>
					{isEmpty(currentUser) && <LoadingSpinner />}
					{!isEmpty(currentUser) && (
						<Box>
							<Typography>
								First name: {currentUser.firstName}
							</Typography>
							<Typography>
								Last name: {currentUser.lastName}
							</Typography>
							<Typography>
								Email address: {currentUser.email}
							</Typography>
							<Typography>
								Premium user: {String(currentUser.isPremium)}
							</Typography>
							<Typography>
								Avatar hexCode: {currentUser.avatar}
							</Typography>
						</Box>
					)}
				</>
			</ProtectedRoute>
		</Layout>
	);
};

export default Account;
