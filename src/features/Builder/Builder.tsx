import React from "react";
import Layout from "@/Layouts/Layout";
import ProtectedRoute from "@/wrappers/ProtectedRoute";
import { Stepper } from "@/components/Stepper/Stepper";
import { BuilderContext, STEPS } from ".";
import { useBuilderContext } from "./hooks/useBuilderContext";

export const Builder = () => {
	const { builderState } = useBuilderContext();
	// const { invitationModels } = useBuilder();
	// create reducer for context
	// handle changes in step components
	// console.log(invitationModels);
	const onClickLastStep = () => {
		console.log("Last Step");
	};

	return (
		<ProtectedRoute>
			<Layout>
				<BuilderContext.Provider value={builderState}>
					<Stepper steps={STEPS} onClickLastStep={onClickLastStep} />
				</BuilderContext.Provider>
			</Layout>
		</ProtectedRoute>
	);
};
