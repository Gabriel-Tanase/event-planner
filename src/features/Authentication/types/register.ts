export type TRegisterResponse = {
	message: string;
	status: number;
	data?: any;
};

export type TRegisterPayload = {
	firstName: string;
	lastName: string;
	email: string;
	password: boolean;
};
