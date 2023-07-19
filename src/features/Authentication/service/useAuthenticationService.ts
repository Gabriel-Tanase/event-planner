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
import { QUERY_KEYS } from "@/features/UserProfile/service/constants";
import { useEffect, useState } from "react";
import { TUserModel } from "@/features/UserProfile/types/user";
import { isEmpty } from "lodash";
import { useUserService } from "@/features/UserProfile/service/useUserService";

export const useAuthenticationService = () => {
	const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
	const queryClient = useQueryClient();

	const userCache = queryClient.getQueryData([
		QUERY_KEYS.CURRENT_USER,
	]) as TUserModel;

	useEffect(() => {
		if (isEmpty(userCache?.id)) {
			setIsUserLoggedIn(false);
		} else {
			setIsUserLoggedIn(true);
		}
	}, [userCache]);

	console.log("user:: ", userCache);
	console.log("is logged in:: ", isUserLoggedIn);

	const snackbarService = useSnackbarService();

	const useLoginMutation = () => {
		const router = useRouter();
		// const { useGetCurrentUser } = useUserService();
		// const {} = useGetCurrentUser(isUserLoggedIn);

		const mutation: UseMutationResult<
			TResponse<TLoginResponse>,
			TRequestError,
			TLoginPayload
		> = useMutation(
			async (payload: TLoginPayload) => postLoginFetcher(payload),
			{
				onSuccess: (response) => {
					setIsUserLoggedIn(true);
					router.push(ROUTES.HOMEPAGE);
					snackbarService.showSuccess({
						message: response.message,
					});
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

	const useLogout = (
		proceedWithLogout: boolean,
		onLogoutSuccess: () => void
	): TLogoutResponse => {
		const queryClient = useQueryClient();

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

					queryClient.setQueryData(
						QUERY_KEYS.CURRENT_USER,
						undefined
					);

					setIsUserLoggedIn(false);
					onLogoutSuccess();
				},
			}
		);

		return {
			isLogoutLoading: isLoading,
		};
	};

	return { useLoginMutation, useRegisterMutation, useLogout, isUserLoggedIn };
};
