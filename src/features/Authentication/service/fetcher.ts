import axios from "axios";
import { TLoginPayload } from "../types/login";
import { TRegisterPayload, TRegisterResponse } from "../types/register";

export const postLoginFetcher = async (
	payload: TLoginPayload
): Promise<TRegisterResponse> => {
	const { data } = await axios.post("api/login", payload);
	return data;
};

export const postRegisterFetcher = async (
	payload: TRegisterPayload
): Promise<TRegisterResponse> => {
	const { data } = await axios.post("api/register", payload);
	return data;
};

// Create axios instance and use it in fetchers #TODO
