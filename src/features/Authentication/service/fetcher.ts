import { TResponse } from "@/shared/types/api";
import axiosInstance from "config/axiosInstance";
import { PATHS } from "./constants";
import {
	TRegisterPayload,
	TRegisterResponse,
	TLoginPayload,
	TLoginResponse,
} from "./types";

export const postLoginFetcher = async (
	payload: TLoginPayload
): Promise<TResponse<TLoginResponse>> => {
	const { data } = await axiosInstance.post(PATHS.LOGIN, payload);
	return data;
};

export const postRegisterFetcher = async (
	payload: TRegisterPayload
): Promise<TResponse<TRegisterResponse>> => {
	const { data } = await axiosInstance.post(PATHS.REGISTER, payload);
	return data;
};

export const getLogoutFetcher = async (): Promise<TResponse<null>> => {
	const { data } = await axiosInstance.get(PATHS.LOGOUT);
	return data;
};

// Create axios instance and use it in fetchers #TODO
