export type TUserQueryResponse = {
	isErrorCurrentUser: boolean;
	isLoadingCurrentUser: boolean;
	currentUserData: any;
};

export type TVerifyResponse = {
	isUserLoggedIn: boolean;
};