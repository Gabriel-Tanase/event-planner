import axiosInstance from "config/axiosInstance";
import { TUserModel } from "../types/user";
import { API_PATHS } from "./constants";

export const getUserFetcher = async (): Promise<TUserModel> => {
	const { data } = await axiosInstance.get(API_PATHS.USER);

	return data;
};

export const getUserByIdFetcher = async (
	userId: string | null
): Promise<TUserModel> => {
	const { data } = await axiosInstance.get(`${API_PATHS.USER}/${userId}`);

	return data;
};
