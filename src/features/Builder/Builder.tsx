import React, { useState } from "react";
import Layout from "@/Layouts/Layout";
import ProtectedRoute from "@/wrappers/ProtectedRoute";
import { Stepper } from "@/components/Stepper/Stepper";
import { BuilderContext, STEPS, defaultBuilderContext } from ".";

export const Builder = () => {
	const [builderConfiguration, setBuilderConfiguration] = useState(
		defaultBuilderContext
	);

	// create reducer for context
	// handle changes in step components

	const onClickLastStep = () => {
		console.log("Last Step");
	};

	return (
		<ProtectedRoute>
			<Layout>
				<BuilderContext.Provider value={builderConfiguration}>
					<Stepper steps={STEPS} onClickLastStep={onClickLastStep} />
				</BuilderContext.Provider>
			</Layout>
		</ProtectedRoute>
	);
};
