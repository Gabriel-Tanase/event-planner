import axiosInstance from "config/axiosInstance";

// export const postLoginFetcher = async (payload: any): Promise<any> => {
// 	const { data } = await axiosInstance.post("", payload);
// 	return data;
// };

export const getInvitationModels = async (): Promise<null> => {
	const { data } = await axiosInstance.get("invitationModels");
	return data;
};
