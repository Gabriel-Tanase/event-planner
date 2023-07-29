import Layout from "@/Layouts/Layout";
import ProtectedRoute from "@/wrappers/ProtectedRoute/intex";
import { Box } from "@mui/material";
import React from "react";

const Builder = () => {
	return (
		<ProtectedRoute>
			<Layout>
				<Box>Builder page</Box>
			</Layout>
		</ProtectedRoute>
	);
};

export default Builder;
