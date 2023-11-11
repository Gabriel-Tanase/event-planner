import { useState } from "react";

export const useStepper = (initActiveStep: number) => {
	const [activeStep, setActiveStep] = useState(initActiveStep);

	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};
	return { activeStep, handleNext, handleBack };
};
