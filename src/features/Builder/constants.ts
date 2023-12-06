import { StepType } from "@/components/Stepper/types";
import { StepPlaceholder } from "./components/StepPlaceholder/StepPlaceholder";
import { createContext } from "react";
import { BuilderStateType } from "./types";
import { ModelsSelectionStep } from "./components/ModelsSelectionStep/ModelsSelectionStep";

export const STEPS: Array<StepType> = [
	{
		order: 0,
		label: "Placeholder (0)",
		component: ModelsSelectionStep,
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

export const initialBuilderState: BuilderStateType = {
	modelId: null,
	props: null,
};

export const BuilderContext = createContext(initialBuilderState);

export const BUILDER_CONTEXT_ACTIONS = {
	ADD_MODEL_ID: "ADD_MODEL_ID",
	ADD_PROPS: "ADD_PROPS",
};