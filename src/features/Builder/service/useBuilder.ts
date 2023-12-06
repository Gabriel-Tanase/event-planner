// import { TRequestError } from "@/shared/types/error/api";
import { useQuery } from "react-query";
// import {
// 	getLogoutFetcher,
// } from "./fetcher";
// import useSnackbarService from "@/hooks/useSnackbarService";
// import { handleHttpErrorMessage } from "@/shared/utils";
// import { useRouter } from "next/router";
// import { ROUTES } from "@/shared/constants/routes";
// import { QUERY_KEYS } from "@/features/UserProfile/service/constants";
// import { QUERY_KEYS as AUTH_QUERY_KEYS } from "@/features/Authentication/service/constants";

import { getInvitationModels } from "./fetcher";

// export const useAuthenticationService = () => {

// 	const snackbarService = useSnackbarService();

// 	const useRegisterMutation = () => {
// 		const router = useRouter();

// 		const mutation: UseMutationResult<
// 			TRegisterResponse,
// 			TRequestError,
// 			TRegisterPayload
// 		> = useMutation(
// 			async (payload: TRegisterPayload) => postRegisterFetcher(payload),
// 			{
// 				onSuccess: () => {
// 					snackbarService.showSuccess({
// 						message: "Create account successfully.",
// 					});
// 					router.push(ROUTES.HOMEPAGE);
// 				},

// 				onError: (error) =>
// 					snackbarService.showError({
// 						message: handleHttpErrorMessage(error),
// 					}),
// 			}
// 		);
// 		return mutation;
// 	};

export const useGetInvitationModels = (): any => {
	const { data } = useQuery(["INVITATION_MODELS"], getInvitationModels);
	return {
		data,
	};
};

// 	return {
// 		useLoginMutation,
// 		useRegisterMutation,
// 		useLogout,
// 		isUserAuthenticated,
// 		useVerifyLoggedIn,
// 	};
// };
