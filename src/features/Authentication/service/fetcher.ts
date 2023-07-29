import axiosInstance from "config/axiosInstance";
import { PATHS } from "./constants";
import {
	TRegisterPayload,
	TRegisterResponse,
	TLoginPayload,
	TLoginResponse,
	TVerifyTokenResponse,
} from "./types";

export const postLoginFetcher = async (
	payload: TLoginPayload
): Promise<TLoginResponse> => {
	const { data } = await axiosInstance.post(PATHS.LOGIN, payload);
	return data;
};

export const postRegisterFetcher = async (
	payload: TRegisterPayload
): Promise<TRegisterResponse> => {
	const { data } = await axiosInstance.post(PATHS.REGISTER, payload);
	return data;
};

export const getLogoutFetcher = async (): Promise<null> => {
	const { data } = await axiosInstance.get(PATHS.LOGOUT);
	return data;
};

export const getVerifyFetcher = async (): Promise<TVerifyTokenResponse> => {
	const { data } = await axiosInstance.get(PATHS.VERIFY);
	return data;
};
