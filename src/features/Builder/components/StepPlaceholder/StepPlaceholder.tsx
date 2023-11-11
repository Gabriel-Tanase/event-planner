import React from "react";

interface StepPlaceholderType {
	order: number;
}

export const StepPlaceholder: React.FC<StepPlaceholderType> = ({ order }) => (
	<div>StepPlaceholder {order}</div>
);
