import { TRequestError, TResponse } from "@/shared/types/error/api";
import {
	useMutation,
	UseMutationResult,
	useQuery,
	UseQueryResult,
} from "react-query";
import { TLoginPayload, TLoginResponse } from "../types/login";
import { TRegisterPayload, TRegisterResponse } from "../types/register";
import { postLoginFetcher, postRegisterFetcher } from "./fetcher";
import useSnackbarService from "@/hooks/useSnackbarService";
import { handleErrorMessage } from "@/shared/utils";

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
	const snackbarService = useSnackbarService();
	const useLoginMutation = () => {
		const mutation: UseMutationResult<
			TResponse<TLoginResponse>,
			TRequestError,
			TLoginPayload
		> = useMutation(
			async (payload: TLoginPayload) => postLoginFetcher(payload),
			{
				onSuccess: (response) =>
					snackbarService.showSuccess({
						message: response.message,
					}),
				onError: (error) =>
					snackbarService.showError({
						message: handleErrorMessage(error),
					}),
			}
		);
		return mutation;
	};

	const useRegisterMutation = () => {
		const mutation: UseMutationResult<
			TResponse<TRegisterResponse>,
			TRequestError,
			TRegisterPayload
		> = useMutation(
			async (payload: TRegisterPayload) => postRegisterFetcher(payload),
			{
				onSuccess: (response) =>
					snackbarService.showSuccess({
						message: response.message,
					}),
				onError: (error) =>
					snackbarService.showError({
						message: handleErrorMessage(error),
					}),
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
		}: UseQueryResult<TTestResponse, TRequestError> = useQuery(
			["test"],
			() => getTestQueryFetcher(),
			{
				select: (data: TTestResponse) => data,
				onSuccess: (response) => {},
				onError: (error) => {},
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
