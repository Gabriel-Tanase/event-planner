import { TRequestError } from "@/shared/types/error/api";
import { useQuery, useQueryClient, UseQueryResult } from "react-query";
import { getUserFetcher } from "./fetchers";
import { TUserQueryResponse } from "./types";
import { TUserModel } from "../types/user";
import { TResponse } from "@/shared/types/api";
import { QUERY_KEYS } from "./constants";
import { useEffect, useState } from "react";
import { isEmpty } from "lodash";

export const useUserService = () => {
	const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
	const queryClient = useQueryClient();

	const userCache = queryClient.getQueryData([
		QUERY_KEYS.CURRENT_USER,
	]) as TResponse<TUserModel>;

	useEffect(() => {
		if (!isEmpty(userCache?.data?.id)) {
			setIsUserLoggedIn(true);
		}
	}, [userCache]);

	const useGetCurrentUser = (): TUserQueryResponse => {
		const {
			isError,
			isLoading,
			data,
		}: UseQueryResult<TResponse<TUserModel>, TRequestError> = useQuery(
			[QUERY_KEYS.CURRENT_USER],
			getUserFetcher,
			{
				retry: 0,
			}
		);

		return {
			isErrorCurrentUser: isError,
			isLoadingCurrentUser: isLoading,
			currentUserData: data?.data,
		};
	};

	return { useGetCurrentUser, isUserLoggedIn };
};
