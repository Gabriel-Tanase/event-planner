import * as yup from "yup";

export const loginSchema = yup.object().shape({
	email: yup.string().email().required(),
	password: yup.string().min(6).max(32).required(),
});

export const registerSchema = yup.object().shape({
	firstName: yup.string().min(3).max(32).required(),
	lastName: yup.string().min(3).max(32).required(),
	email: yup.string().email().required(),
	password: yup.string().min(6).max(32).required(),
});
