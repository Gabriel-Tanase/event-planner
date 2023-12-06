import { useReducer } from "react";
import { builderReducer } from "../reducer";
import { BUILDER_CONTEXT_ACTIONS, initialBuilderState } from "../constants";

export const useBuilderContext = () => {
	const [builderState, dispatch] = useReducer(
		builderReducer,
		initialBuilderState
	);

	const addModelId = (modelId: string | null) => {
		dispatch({
			type: BUILDER_CONTEXT_ACTIONS.ADD_MODEL_ID,
			value: modelId,
		});
	};

	const addProps = (props: { [key: string]: string | number } | null) => {
		dispatch({
			type: BUILDER_CONTEXT_ACTIONS.ADD_PROPS,
			value: props,
		});
	};

	return {
		builderState,
		addModelId,
		addProps,
	};
};
