// import { TRequestError } from "@/shared/types/error/api";
// import {
// 	useMutation,
// 	UseMutationResult,
// 	useQuery,
// 	useQueryClient,
// 	UseQueryResult,
// } from "react-query";
// import {
// 	getLogoutFetcher,
// } from "./fetcher";
// import useSnackbarService from "@/hooks/useSnackbarService";
// import { handleHttpErrorMessage } from "@/shared/utils";
// import { useRouter } from "next/router";
// import { ROUTES } from "@/shared/constants/routes";
// import { QUERY_KEYS } from "@/features/UserProfile/service/constants";
// import { QUERY_KEYS as AUTH_QUERY_KEYS } from "@/features/Authentication/service/constants";

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

// 	const useLogout = (
// 		proceedWithLogout: boolean,
// 		onLogoutSuccess: () => void
// 	): TLogoutResponse => {
// 		const queryClient = useQueryClient();

// 		const { isLoading }: UseQueryResult<null, TRequestError> = useQuery(
// 			["logout"],
// 			getLogoutFetcher,
// 			{
// 				enabled: proceedWithLogout,
// 				onSuccess: () => {
// 					snackbarService.showSuccess({
// 						message: "Logout successfully.",
// 					});

// 					queryClient.setQueryData(
// 						QUERY_KEYS.CURRENT_USER,
// 						undefined
// 					);

// 					queryClient.setQueryData(
// 						AUTH_QUERY_KEYS.VERIFY_USER_LOGGED_IN,
// 						undefined
// 					);

// 					onLogoutSuccess();
// 				},
// 			}
// 		);

// 		return {
// 			isLogoutLoading: isLoading,
// 		};
// 	};

// 	return {
// 		useLoginMutation,
// 		useRegisterMutation,
// 		useLogout,
// 		isUserAuthenticated,
// 		useVerifyLoggedIn,
// 	};
// };
