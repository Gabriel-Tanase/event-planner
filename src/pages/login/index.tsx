import { useAuthenticationService } from "@/features/Authentication/service/useAuthenticationService";
import { Box, Stack, TextField, Button, Typography } from "@mui/material";
import useTranslation from "next-translate/useTranslation";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { upperFirst } from "lodash";
import { loginSchema } from "@/shared/constants/validations";
import Layout from "@/Layouts/Layout";

const Login = () => {
	const { useLoginMutation } = useAuthenticationService();

	const mutation = useLoginMutation();
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

	const onClickCancel = () => console.log("cancel");
	const onClickContinue = handleSubmit((data) => mutation.mutate(data));

	return (
		<Layout>
			<Box
				sx={{
					maxWidth: "420px",
					margin: "0 auto",
				}}
			>
				<Typography
					variant='h4'
					mb={2}
					textAlign='center'
					fontWeight='600'
				>
					{t("BUTTONS.LOGIN")}
				</Typography>
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
						<Box justifyContent={"center"} display='flex'>
							<Button onClick={onClickCancel}>
								{t("BUTTONS.CANCEL")}
							</Button>
							<Button
								type='submit'
								onClick={onClickContinue}
								disabled={!isValid}
							>
								{t("BUTTONS.CONTINUE")}
							</Button>
						</Box>
					</Stack>
				</form>
			</Box>
		</Layout>
	);
};

export default Login;
