import { RequestError, TResponse } from "@/shared/types/error/api";
import {
	useMutation,
	UseMutationResult,
	useQuery,
	UseQueryResult,
} from "react-query";
import { TLoginPayload, TLoginResponse } from "../types/login";
import { TRegisterPayload, TRegisterResponse } from "../types/register";
import { postLoginFetcher, postRegisterFetcher } from "./fetcher";

// #TODO
type TTestQueryResponse = {
	isTestError: boolean;
	isTestLoading: boolean;
	testData: TTestResponse;
};
type TTestResponse = any;
export const getTestQueryFetcher = () => ({ data: "this is a test" });
// #TODO

export const useAuthenticationService = () => {
	const useLoginMutation = () => {
		const mutation: UseMutationResult<
			TResponse<TLoginResponse>,
			RequestError,
			TLoginPayload
		> = useMutation(
			async (payload: TLoginPayload) => postLoginFetcher(payload),
			{
				onSuccess: () => {},
				onError: () => {},
			}
		);
		return mutation;
	};

	const useRegisterMutation = () => {
		const mutation: UseMutationResult<
			TResponse<TRegisterResponse>,
			RequestError,
			TRegisterPayload
		> = useMutation(
			async (payload: TRegisterPayload) => postRegisterFetcher(payload),
			{
				onSuccess: () => {},
				onError: () => {},
			}
		);
		return mutation;
	};

	// Model only #TODO
	const useGetTest = (): TTestQueryResponse => {
		const {
			isError,
			isLoading,
			data,
		}: UseQueryResult<TTestResponse, RequestError> = useQuery(
			["test"],
			() => getTestQueryFetcher(),
			{
				select: (data: TTestResponse) => data,
				onSuccess: (data: TTestResponse) => {},
				onError: (error: RequestError) => {},
			}
		);

		return {
			isTestError: isError,
			isTestLoading: isLoading,
			testData: data.data,
		};
	};

	return { useLoginMutation, useRegisterMutation, useGetTest };
};
