import { TRequestError } from "@/shared/types/error/api";
import { useQuery, UseQueryResult } from "react-query";
import { getUserFetcher } from "./fetchers";
import { TUserQueryResponse } from "./types";
import { TUserModel } from "../types/user";
import { TResponse } from "@/shared/types/api";
import { QUERY_KEYS } from "./constants";

export const useUserService = () => {
	const useGetCurrentUser = (isUserLoggedIn: boolean): TUserQueryResponse => {
		const {
			isError,
			isLoading,
			data,
		}: UseQueryResult<TResponse<TUserModel>, TRequestError> = useQuery(
			[QUERY_KEYS.CURRENT_USER],
			getUserFetcher,
			{
				enabled: isUserLoggedIn,
				retry: 0,
				retryOnMount: false,
				refetchOnWindowFocus: false,
			}
		);

		return {
			isErrorCurrentUser: isError,
			isLoadingCurrentUser: isLoading,
			currentUserData: data,
		};
	};

	return { useGetCurrentUser };
};
