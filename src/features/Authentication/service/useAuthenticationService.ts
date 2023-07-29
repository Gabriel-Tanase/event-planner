import { TRequestError } from "@/shared/types/error/api";
import {
	useMutation,
	UseMutationResult,
	useQuery,
	useQueryClient,
	UseQueryResult,
} from "react-query";
import {
	TLogoutResponse,
	TRegisterPayload,
	TRegisterResponse,
	TLoginPayload,
	TLoginResponse,
	TVerifyTokenResponse,
} from "./types";
import {
	getLogoutFetcher,
	getVerifyFetcher,
	postLoginFetcher,
	postRegisterFetcher,
} from "./fetcher";
import useSnackbarService from "@/hooks/useSnackbarService";
import { handleHttpErrorMessage } from "@/shared/utils";
import { useRouter } from "next/router";
import { ROUTES } from "@/shared/constants/routes";
import { QUERY_KEYS } from "@/features/UserProfile/service/constants";
import { QUERY_KEYS as AUTH_QUERY_KEYS } from "@/features/Authentication/service/constants";
import { TVerifyResponse } from "@/features/UserProfile/service/types";


export const useAuthenticationService = () => {
	const queryClient = useQueryClient();

	const isUserAuthenticated = Boolean(
		queryClient.getQueryData<TVerifyTokenResponse>([
			AUTH_QUERY_KEYS.VERIFY_USER_LOGGED_IN,
		])?.isUserAuthenticated
	);

	const snackbarService = useSnackbarService();

	const useLoginMutation = () => {
		const router = useRouter();

		const mutation: UseMutationResult<
			TLoginResponse,
			TRequestError,
			TLoginPayload
		> = useMutation(
			async (payload: TLoginPayload) => postLoginFetcher(payload),
			{
				onSuccess: () => {
					router.push(ROUTES.HOMEPAGE);
					snackbarService.showSuccess({
						message: "Login successfully!",
					});

					queryClient.invalidateQueries(
						AUTH_QUERY_KEYS.VERIFY_USER_LOGGED_IN
					);
				},
				onError: (error) =>
					snackbarService.showError({
						message: handleHttpErrorMessage(error),
					}),
			}
		);
		return mutation;
	};

	const useRegisterMutation = () => {
		const router = useRouter();

		const mutation: UseMutationResult<
			TRegisterResponse,
			TRequestError,
			TRegisterPayload
		> = useMutation(
			async (payload: TRegisterPayload) => postRegisterFetcher(payload),
			{
				onSuccess: (response) => {
					snackbarService.showSuccess({
						message: "Create account successfully.",
					});
					router.push(ROUTES.HOMEPAGE);
				},

				onError: (error) =>
					snackbarService.showError({
						message: handleHttpErrorMessage(error),
					}),
			}
		);
		return mutation;
	};

	const useLogout = (
		proceedWithLogout: boolean,
		onLogoutSuccess: () => void
	): TLogoutResponse => {
		const queryClient = useQueryClient();

		const { isLoading }: UseQueryResult<null, TRequestError> = useQuery(
			["logout"],
			getLogoutFetcher,
			{
				enabled: proceedWithLogout,
				onSuccess: () => {
					snackbarService.showSuccess({
						message: "Logout successfully.",
					});

					queryClient.setQueryData(
						QUERY_KEYS.CURRENT_USER,
						undefined
					);

					queryClient.setQueryData(
						AUTH_QUERY_KEYS.VERIFY_USER_LOGGED_IN,
						undefined
					);

					onLogoutSuccess();
				},
			}
		);

		return {
			isLogoutLoading: isLoading,
		};
	};

	const useVerifyLoggedIn = (
		proceedWithVerify: boolean = true
	): TVerifyResponse => {
		console.log("here");
		const { data }: UseQueryResult<TVerifyResponse, TRequestError> =
			useQuery(
				[AUTH_QUERY_KEYS.VERIFY_USER_LOGGED_IN],
				getVerifyFetcher,
				{
					// enabled: !!proceedWithVerify,
				}
			);

		return {
			isUserAuthenticated: data?.isUserAuthenticated as boolean,
		};
	};

	return {
		useLoginMutation,
		useRegisterMutation,
		useLogout,
		isUserAuthenticated,
		useVerifyLoggedIn,
	};
};
