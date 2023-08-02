import { TUserModel } from "../types/user";

export type TUserQueryResponse = {
	isErrorCurrentUser: boolean;
	isLoadingCurrentUser: boolean;
	currentUserData: TUserModel | undefined;
};
export type TUserByIdQueryResponse = {
	isErrorUser: boolean;
	isLoadingUser: boolean;
	userData: TUserModel | undefined;
};

export type TVerifyResponse = {
	isUserAuthenticated: boolean;
};
