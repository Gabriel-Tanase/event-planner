import { useUserService } from "@/features/UserProfile/service/useUserService";
import useNavigationService from "@/hooks/useNavigationService";
import { alpha, useTheme } from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import useTranslation from "next-translate/useTranslation";
import React from "react";

const PlanEventButton = () => {
	const { isUserLoggedIn } = useUserService();
	const { navigateToBuilder, navigateToLogin } = useNavigationService();
	const { t } = useTranslation("locale");
	const theme = useTheme();

	const onClickStartPlanning = () => {
		if (isUserLoggedIn) {
			navigateToBuilder();
		} else {
			navigateToLogin();
		}
	};

	return (
		<Button
			onClick={onClickStartPlanning}
			sx={{
				backgroundColor: alpha(theme.palette.secondary.main, 0.7),
				":hover": {
					backgroundColor: "secondary.main",
				},
			}}
		>
			<Typography color={"custom.textWhite"}>
				{t("BUTTONS.START_PLANNING")}
			</Typography>
		</Button>
	);
};

export default PlanEventButton;
