import Footer from "@/components/Footer";
import Navbar, { navbarHeight } from "@/components/Navbar";
import { Container } from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";

type LayoutProps = {
	children: JSX.Element;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
	return (
		<Box
			sx={{
				height: "100%",
				width: "100%",
				position: "relative",
				paddingTop: `${navbarHeight}px`,
			}}
		>
			<Navbar />
			<Container sx={{ py: "30px" }} maxWidth='lg'>
				{children}
			</Container>
			<Footer />
		</Box>
	);
};

export default Layout;
