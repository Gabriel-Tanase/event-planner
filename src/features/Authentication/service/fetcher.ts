import { TResponse } from "@/shared/types/error/api";
import axiosInstance from "config/axiosInstance";
import { TLoginPayload, TLoginResponse } from "../types/login";
import { TRegisterPayload, TRegisterResponse } from "../types/register";

export const postLoginFetcher = async (
	payload: TLoginPayload
): Promise<TResponse<TLoginResponse>> => {
	const { data } = await axiosInstance.post("login", payload);
	return data;
};

export const postRegisterFetcher = async (
	payload: TRegisterPayload
): Promise<TResponse<TRegisterResponse>> => {
	const { data } = await axiosInstance.post("register", payload);
	return data;
};

// Create axios instance and use it in fetchers #TODO
