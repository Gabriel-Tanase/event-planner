import { TRequestError } from "@/shared/types/error/api";
import { useQuery, UseQueryResult } from "react-query";
import { getUserByIdFetcher, getUserFetcher } from "./fetchers";
import { TUserByIdQueryResponse, TUserQueryResponse } from "./types";
import { TUserModel } from "../types/user";
import { QUERY_KEYS } from "./constants";
import { handleHttpErrorMessage } from "@/shared/utils";
import { queryClient } from "config/reactQuery";

export const useGetCurrentUser = (
	isUserAuthenticated: boolean
): TUserQueryResponse => {
	const {
		isError,
		isLoading,
		data,
	}: UseQueryResult<TUserModel, TRequestError> = useQuery(
		[QUERY_KEYS.CURRENT_USER],
		getUserFetcher,
		{
			enabled: !!isUserAuthenticated,
			onError: (error) => handleHttpErrorMessage(error),
		}
	);

	return {
		isErrorCurrentUser: isError,
		isLoadingCurrentUser: isLoading,
		currentUserData: data,
	};
};

export const useGetUserById = (
	userId: string | null
): TUserByIdQueryResponse => {
	const {
		isError,
		isLoading,
		data,
	}: UseQueryResult<TUserModel, TRequestError> = useQuery(
		[`${QUERY_KEYS.USER}${userId}`],
		() => getUserByIdFetcher(userId),
		{
			enabled: !!userId,
			onError: (error) => handleHttpErrorMessage(error),
		}
	);

	return {
		isErrorUser: isError,
		isLoadingUser: isLoading,
		userData: data,
	};
};

export const selectCurrentUser = () =>
	queryClient.getQueryData<TUserModel>(QUERY_KEYS.CURRENT_USER);