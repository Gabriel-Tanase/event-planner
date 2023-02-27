import { TResponse } from "@/shared/types/api";
import axiosInstance from "config/axiosInstance";
import { TUserModel } from "../types/user";
import { API_PATHS } from "./constants";

export const getUserFetcher = async (): Promise<TResponse<TUserModel>> => {
	const { data } = await axiosInstance.get(API_PATHS.CURRENT_USER);
	return data;
};
