import React from "react";
import { first, last } from "lodash";
import useTranslation from "next-translate/useTranslation";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import {
	Box,
	Button,
	Grid,
	Stepper as MUIStepper,
	Step,
	StepLabel,
} from "@mui/material";
import { useStepper } from "./useStepper";
import { STEPS } from "@/features/Builder";
import { StepType } from "./types";

interface StepperProps {
	steps: Array<StepType>;
	onClickLastStep: () => void;
}

export const Stepper: React.FC<StepperProps> = ({ steps, onClickLastStep }) => {
	const { t } = useTranslation("locale");
	const { activeStep, handleBack, handleNext } = useStepper(
		first(steps)?.order ?? 0
	);

	const renderStepComponent = () => {
		const StepComponent = steps[activeStep].component;
		return <StepComponent order={activeStep} />;
	};

	return (
		<Grid container rowSpacing={2} sx={{ pt: 2 }}>
			<Grid item xs={12}>
				<MUIStepper activeStep={activeStep} alternativeLabel>
					{STEPS.map((step: StepType) => (
						<Step key={step.order}>
							<StepLabel>{step.label}</StepLabel>
						</Step>
					))}
				</MUIStepper>
				{renderStepComponent()}
				<Box
					sx={{
						display: "flex",
						justifyContent: "space-between",
						gap: 2,
					}}
				>
					<Button
						size='small'
						onClick={handleBack}
						disabled={activeStep === first(steps)?.order ?? 0}
					>
						<KeyboardArrowLeft />
						{t("GENERAL.BACK")}
					</Button>
					<Button
						size='small'
						onClick={
							activeStep === last(steps)?.order
								? onClickLastStep
								: handleNext
						}
					>
						{activeStep === last(steps)?.order
							? t("GENERAL.FINISH")
							: t("GENERAL.NEXT")}
						<KeyboardArrowRight />
					</Button>
				</Box>
			</Grid>
		</Grid>
	);
};
