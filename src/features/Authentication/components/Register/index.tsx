import { useAuthenticationService } from "@/features/Authentication/service/useAuthenticationService";
import {
	Box,
	Stack,
	TextField,
	Button,
	Typography,
	Checkbox,
} from "@mui/material";
import Container from "@mui/material/Container";
import useTranslation from "next-translate/useTranslation";
import React, { BaseSyntheticEvent, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { upperFirst } from "lodash";
import { registerSchema } from "@/shared/constants/validations";
import { LoadingButton } from "@mui/lab";
import { TRegisterPayload } from "../../service/types";

type RegisterProps = {
	switchToLogin: () => void;
	onClose: () => void;
	navigateToLogin: () => void;
};

const Register: React.FC<RegisterProps> = ({
	onClose,
	switchToLogin,
	navigateToLogin,
}) => {
	const [isAgreeWithTerms, setIsAgreeWithTerms] = useState(false);
	const { useRegisterMutation } = useAuthenticationService();

	const mutation = useRegisterMutation();
	const { mutate, isSuccess, isLoading } = mutation;
	const { t } = useTranslation("locale");

	const {
		handleSubmit,
		control,
		formState: { errors, isValid },
	} = useForm({
		resolver: yupResolver(registerSchema),
		defaultValues: {
			firstName: "",
			lastName: "",
			email: "",
			password: "",
		},
		mode: "onChange",
	});

	const onClickRegister = handleSubmit((data) => {
		mutate(data as TRegisterPayload);
	});

	useEffect(() => {
		if (isSuccess) {
			switchToLogin();
		}
	}, [isSuccess]);
	return (
		<Container sx={{ paddingTop: "20px" }} maxWidth='md'>
			<Box>
				<form>
					<Stack spacing={4}>
						<Box>
							<Controller
								control={control}
								name='firstName'
								render={({ field }) => (
									<TextField
										{...field}
										fullWidth
										label={t("FORM.FIRST_NAME")}
										type='text'
										error={false}
									/>
								)}
							/>
							<Typography
								variant='subtitle2'
								color='error.main'
								mt='10px'
							>
								{upperFirst(errors.firstName?.message)}
							</Typography>
						</Box>
						<Box>
							<Controller
								control={control}
								name='lastName'
								render={({ field }) => (
									<TextField
										{...field}
										fullWidth
										label={t("FORM.LAST_NAME")}
										type='text'
										error={false}
									/>
								)}
							/>
							<Typography
								variant='subtitle2'
								color='error.main'
								mt='10px'
							>
								{upperFirst(errors.lastName?.message)}
							</Typography>
						</Box>
						<Box>
							<Controller
								control={control}
								name='email'
								render={({ field }) => (
									<TextField
										{...field}
										fullWidth
										label={t("FORM.EMAIL")}
										type='email'
										error={false}
									/>
								)}
							/>
							<Typography
								variant='subtitle2'
								color='error.main'
								mt='10px'
							>
								{upperFirst(errors.email?.message)}
							</Typography>
						</Box>
						<Box>
							<Controller
								control={control}
								name='password'
								render={({ field }) => (
									<TextField
										autoComplete='off'
										{...field}
										fullWidth
										label={t("FORM.PASSWORD")}
										type='password'
										error={false}
									/>
								)}
							/>
							<Typography
								variant='subtitle2'
								color='error.main'
								mt='10px'
							>
								{upperFirst(errors.password?.message)}
							</Typography>
						</Box>
						<Box>
							<Box display='flex'>
								<Checkbox
									checked={isAgreeWithTerms}
									onClick={(e: BaseSyntheticEvent) => {
										setIsAgreeWithTerms(e.target.checked);
									}}
								/>
								<Typography>
									By checking this box, you are agree to our
									Terms and Conditions.
								</Typography>
							</Box>
						</Box>
						<Box justifyContent='center' display='flex' gap={2}>
							<Button
								onClick={onClose}
								variant='outlined'
								color='error'
								disabled={isLoading}
							>
								{t("BUTTONS.CANCEL")}
							</Button>
							<LoadingButton
								type='submit'
								onClick={onClickRegister}
								variant='outlined'
								disabled={!isValid || !isAgreeWithTerms}
								color='success'
								loading={isLoading}
							>
								{t("BUTTONS.REGISTER")}
							</LoadingButton>
						</Box>
						<Box textAlign='center'>
							<Typography variant='caption' display='block'>
								{t("AUTH.REGISTER_FOOTER_CONTENT")}
							</Typography>
							<Button
								onClick={navigateToLogin}
								variant='text'
								color='info'
								size='small'
							>
								{t("AUTH.REGISTER_FOOTER_BUTTON")}
							</Button>
						</Box>
					</Stack>
				</form>
			</Box>
		</Container>
	);
};

export default Register;
