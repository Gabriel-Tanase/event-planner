import { TRequestError } from "@/shared/types/error/api";
import {
	useMutation,
	UseMutationResult,
	useQuery,
	UseQueryResult,
} from "react-query";
import {
	TLogoutResponse,
	TRegisterPayload,
	TRegisterResponse,
	TLoginPayload,
	TLoginResponse,
} from "./types";
import {
	getLogoutFetcher,
	postLoginFetcher,
	postRegisterFetcher,
} from "./fetcher";
import useSnackbarService from "@/hooks/useSnackbarService";
import { handleErrorMessage } from "@/shared/utils";
import { TResponse } from "@/shared/types/api";
import { useRouter } from "next/router";
import { ROUTES } from "@/shared/constants/routes";

export const useAuthenticationService = () => {
	const snackbarService = useSnackbarService();
	const useLoginMutation = () => {
		const router = useRouter();
		const mutation: UseMutationResult<
			TResponse<TLoginResponse>,
			TRequestError,
			TLoginPayload
		> = useMutation(
			async (payload: TLoginPayload) => postLoginFetcher(payload),
			{
				onSuccess: (response) => {
					snackbarService.showSuccess({
						message: response.message,
					});
					router.push(ROUTES.HOMEPAGE);
				},
				onError: (error) =>
					snackbarService.showError({
						message: handleErrorMessage(error),
					}),
			}
		);
		return mutation;
	};

	const useRegisterMutation = () => {
		const router = useRouter();

		const mutation: UseMutationResult<
			TResponse<TRegisterResponse>,
			TRequestError,
			TRegisterPayload
		> = useMutation(
			async (payload: TRegisterPayload) => postRegisterFetcher(payload),
			{
				onSuccess: (response) => {
					snackbarService.showSuccess({
						message: response.message,
					});
					router.push(ROUTES.HOMEPAGE);
				},

				onError: (error) =>
					snackbarService.showError({
						message: handleErrorMessage(error),
					}),
			}
		);
		return mutation;
	};

	const useLogout = (proceedWithLogout: boolean): TLogoutResponse => {
		const {
			isLoading,
		}: UseQueryResult<TResponse<null>, TRequestError> = useQuery(
			["logout"],
			getLogoutFetcher,
			{
				enabled: proceedWithLogout,
				onSuccess: (response) => {
					snackbarService.showSuccess({
						message: response.message,
					});
				},
			}
		);

		return {
			isLogoutLoading: isLoading,
		};
	};

	return { useLoginMutation, useRegisterMutation, useLogout };
};
