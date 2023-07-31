import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { ROUTES } from "@/shared/constants/routes";
import Grid from "@mui/material/Grid";
import { images } from "@/shared/images";
import Image from "next/image";
import Account from "./components/Account";
import DrawerMobile from "./components/DrawerMobile";
import LanguageMenu from "./components/Language";
import PlanEventButton from "./components/PlanEventButton";
import { noop } from "lodash";

type TNavbarProps = {
	window: any;
};

export const navbarHeight = 64;
const BrandingImage = images.Branding;

const Navbar: React.FC<TNavbarProps> = (props) => {
	const { window } = props;
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);

	const handleDrawerToggle = () => {
		setIsDrawerOpen((prevState) => !prevState);
	};

	return (
		<>
			<AppBar component='nav' sx={{ height: navbarHeight }}>
				<Toolbar sx={{ height: navbarHeight }}>
					<Grid container>
						<IconButton
							color='inherit'
							aria-label='open drawer'
							edge='start'
							onClick={handleDrawerToggle}
							sx={{
								top: "10px",
								position: "absolute",
								display: { md: "none" },
							}}
						>
							<MenuIcon />
						</IconButton>
						<Grid
							item
							xs={12}
							md={1}
							sx={{
								display: "flex",
								alignItems: "center",
								justifyContent: {
									xs: "center",
									md: "flex-start",
								},
							}}
						>
							<Link
								href={ROUTES.HOMEPAGE}
								style={{ height: navbarHeight - 10 }}
							>
								<Image
									height={navbarHeight - 10}
									alt='Branding logo'
									src={BrandingImage}
								/>
							</Link>
						</Grid>
						<Grid
							item
							xs={8}
							sx={{
								display: {
									xs: "none",
									md: "flex",
								},
								alignItems: "center",
								gap: "10px",
							}}
						>
							<Link href={ROUTES.HOMEPAGE}>
								<Typography color={"custom.textWhite"}>
									Link-1
								</Typography>
							</Link>
							<Link href={ROUTES.HOMEPAGE}>
								<Typography color={"custom.textWhite"}>
									Link-2
								</Typography>
							</Link>
							<Link href={ROUTES.HOMEPAGE}>
								<Typography color={"custom.textWhite"}>
									Link-3
								</Typography>
							</Link>
						</Grid>
						<Grid
							item
							xs={3}
							sx={{
								display: {
									xs: "none",
									md: "flex",
								},
								alignItems: "center",
								justifyContent: "flex-end",
							}}
						>
							<PlanEventButton />
							<LanguageMenu />
							<Account toggleDrawer={noop} />
						</Grid>
					</Grid>
				</Toolbar>
			</AppBar>
			<DrawerMobile
				window={window}
				isOpen={isDrawerOpen}
				toggleDrawer={handleDrawerToggle}
			/>
		</>
	);
};
export default Navbar;
