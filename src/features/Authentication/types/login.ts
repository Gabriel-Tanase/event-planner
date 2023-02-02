export type TQueryResponseLogin = {
	isError: boolean;
	isLoading: boolean;
	data?: any;
};

export type TLoginPayload = {
	email: string;
	password: boolean;
};

export type TLoginMutationResponse = {
	message: string;
	status: number;
	data?: {
		userId: string;
	};
};
