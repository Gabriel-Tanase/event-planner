export type TQueryResponseLogin = {
	isError: boolean;
	isLoading: boolean;
	data?: any;
};

export type TLoginPayload = {
	email: string;
	password: boolean;
};

export type TLoginResponse = {
	userId: string;
};
