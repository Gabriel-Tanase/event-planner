import { BUILDER_CONTEXT_ACTIONS } from "./constants";
import { BuilderStateType } from "./types";

export const builderReducer = (
	builder: BuilderStateType,
	action: {
		type: string;
		value: any;
	}
) => {
	switch (action.type) {
		case BUILDER_CONTEXT_ACTIONS.ADD_MODEL_ID: {
			return {
				...builder,
				modelId: action.value,
			};
		}
		case BUILDER_CONTEXT_ACTIONS.ADD_PROPS: {
			return {
				...builder,
				props: {
					...builder.props,
					...action.value,
				},
			};
		}
		default: {
			throw Error(`Unknown action: ${action.type}`);
		}
	}
};
