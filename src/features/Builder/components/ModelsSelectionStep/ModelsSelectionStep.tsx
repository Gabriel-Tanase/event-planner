import React from "react";
import { useModelsSelectionStep } from "./useModelsSelectionStep";
import { Box, Card, Typography } from "@mui/material";
import { InvitationModel } from "schemas/invitationmodel";

export const ModelsSelectionStep = () => {
	const { invitationModels } = useModelsSelectionStep();
	return (
		<Box
			sx={{
				display: "flex",
				flexWrap: "wrap",
				gap: 2,
			}}
		>
			{invitationModels?.data.map((model: InvitationModel) => {
				console.log("model: ", model);
				return (
					<Card variant='outlined' key={model.id}>
						<Typography>{model.name}</Typography>
						<Typography>{model.eventType}</Typography>
					</Card>
				);
			})}
		</Box>
	);
};
