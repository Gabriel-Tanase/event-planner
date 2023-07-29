import { TRequestError } from "@/shared/types/error/api";
import { useQuery, UseQueryResult } from "react-query";
import { getUserFetcher } from "./fetchers";
import { TUserQueryResponse } from "./types";
import { TUserModel } from "../types/user";
import { QUERY_KEYS } from "./constants";
import { handleHttpErrorMessage } from "@/shared/utils";

export const useGetCurrentUser = (
	isUserLoggedIn: boolean
): TUserQueryResponse => {
	const {
		isError,
		isLoading,
		data,
	}: UseQueryResult<TUserModel, TRequestError> = useQuery(
		[QUERY_KEYS.CURRENT_USER],
		getUserFetcher,
		{
			enabled: !!isUserLoggedIn,
			onError: (error) => handleHttpErrorMessage(error),
		}
	);

	return {
		isErrorCurrentUser: isError,
		isLoadingCurrentUser: isLoading,
		currentUserData: data,
	};
};
