import React from "react";
import { useBuilderContext } from "../../hooks/useBuilderContext";

interface StepPlaceholderType {
	order: number;
}

export const StepPlaceholder: React.FC<StepPlaceholderType> = ({ order }) => {
	const { builderState, addModelId, addProps } = useBuilderContext();

	return (
		<div>
			<div>StepPlaceholder {order}</div>
			<div>{JSON.stringify(builderState)}</div>
			{order === 0 ? (
				<button type='button' onClick={() => addModelId("123456789")}>
					set model
				</button>
			) : (
				<button
					type='button'
					onClick={() =>
						addProps({
							title: "lorem",
							description: "ipsum",
						})
					}
				>
					set props
				</button>
			)}
		</div>
	);
};
