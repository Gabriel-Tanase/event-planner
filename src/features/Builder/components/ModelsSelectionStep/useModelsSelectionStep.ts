import { useGetInvitationModels } from "../../service/useBuilder";

export const useModelsSelectionStep = () => {
	const { data: invitationModels } = useGetInvitationModels();

	return { invitationModels };
};
