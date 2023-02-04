export type TRegisterPayload = {
	firstName: string;
	lastName: string;
	email: string;
	password: boolean;
};

export type TRegisterResponse = {
	userId: string;
};
