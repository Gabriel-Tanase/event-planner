export type TQueryResponseLogin = {
	isError: boolean;
	isLoading: boolean;
	data?: any;
};

export type TLoginPayload = {
	email: string;
	password: string;
};

export type TLoginResponse = {
	userId: string;
};

export type TLogoutResponse = {
	isLogoutLoading: boolean;
};

export type TRegisterPayload = {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
};

export type TRegisterResponse = {
	userId: string;
};

export type TVerifyTokenResponse = {
	isUserLoggedIn: boolean;
};
