import { StepType } from "@/components/Stepper/types";
import { StepPlaceholder } from "./components/StepPlaceholder/StepPlaceholder";
import { createContext } from "react";

export const STEPS: Array<StepType> = [
	{
		order: 0,
		label: "Placeholder (0)",
		component: StepPlaceholder,
	},
	{
		order: 1,
		label: "Placeholder (1)",
		component: StepPlaceholder,
	},
	{
		order: 2,
		label: "Placeholder (2)",
		component: StepPlaceholder,
	},
];

export const defaultBuilderContext = {
	model: "",
	props: [],
};

export const BuilderContext = createContext(defaultBuilderContext);
