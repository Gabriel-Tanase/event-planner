import React, { ReactElement, useEffect } from "react";
import { useAuthenticationService } from "@/features/Authentication/service/useAuthenticationService";
import useNavigationService from "@/hooks/useNavigationService";

const ProtectedRoute: React.FC<{ children: ReactElement }> = ({ children }) => {
	const { isUserAuthenticated } = useAuthenticationService();
	const { navigateToHomepage } = useNavigationService();

	useEffect(() => {
		if (!isUserAuthenticated) {
			navigateToHomepage();
		}
	}, []);

	if (!isUserAuthenticated) {
		return (
			<>
				You are not authorized to access this page! Please logged in and
				make sure you have rights to do id.
			</>
		);
	}

	return <>{children}</>;
};

export default ProtectedRoute;
