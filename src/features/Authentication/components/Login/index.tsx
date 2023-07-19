import { useAuthenticationService } from "@/features/Authentication/service/useAuthenticationService";
import {
	Box,
	Stack,
	TextField,
	Button,
	Typography,
	Container,
} from "@mui/material";
import useTranslation from "next-translate/useTranslation";
import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { upperFirst } from "lodash";
import { loginSchema } from "@/shared/constants/validations";
import { LoadingButton } from "@mui/lab";

type LoginProps = {
	onClose: (...args: any[]) => void;
	navigateToRegister: (...args: any[]) => void;
};

const Login: React.FC<LoginProps> = ({ onClose, navigateToRegister }) => {
	const { useLoginMutation } = useAuthenticationService();

	const mutation = useLoginMutation();
	const { mutate, isLoading, isSuccess } = mutation;
	const { t } = useTranslation("locale");

	const {
		handleSubmit,
		control,
		formState: { isDirty, isValid, errors },
	} = useForm({
		resolver: yupResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
		mode: "onChange",
	});

	const onClickContinue = handleSubmit((data) => mutate(data));

	useEffect(() => {
		if (isSuccess) {
			onClose();
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
								color={"error.main"}
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
								color={"error.main"}
								mt='10px'
							>
								{upperFirst(errors.password?.message)}
							</Typography>
						</Box>
						<Box justifyContent={"center"} display='flex' gap={2}>
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
								onClick={onClickContinue}
								variant='outlined'
								disabled={!isValid}
								color='success'
								loading={isLoading}
							>
								{t("BUTTONS.CONTINUE")}
							</LoadingButton>
						</Box>
						<Box textAlign='center'>
							<Typography variant='caption' display='block'>
								{t("AUTH.LOGIN_FOOTER_CONTENT")}
							</Typography>
							<Button
								onClick={navigateToRegister}
								variant='text'
								color='info'
								size='small'
							>
								{t("AUTH.LOGIN_FOOTER_BUTTON")}
							</Button>
						</Box>
					</Stack>
				</form>
			</Box>
		</Container>
	);
};

export default Login;
