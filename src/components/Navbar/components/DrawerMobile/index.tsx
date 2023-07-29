import { ROUTES } from "@/shared/constants/routes";
import { Drawer, List, ListItem } from "@mui/material";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import React, { FC } from "react";
import Account from "../Account";
import LanguageMenu from "../Language";

const drawerWidth = 240;

const drawerInnerContainer = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  height: "100%",
  mb: 2,
};

type TDrawerMobile = {
  window: any;
  isOpen: boolean;
  toggleDrawer: () => void;
};

const DrawerMobile: FC<TDrawerMobile> = ({ window, isOpen, toggleDrawer }) => {
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
		<Box component='nav'>
			<Drawer
				container={container}
				variant='temporary'
				open={isOpen}
				onClose={toggleDrawer}
				ModalProps={{
					keepMounted: true, // Better open performance on mobile.
				}}
				sx={{
					display: { xs: "block", sm: "none" },
					"& .MuiDrawer-paper": {
						boxSizing: "border-box",
						width: drawerWidth,
					},
				}}
			>
				<Box sx={drawerInnerContainer}>
					<Box>
						<Typography
							variant='h6'
							sx={{ my: 2, textAlign: "center" }}
						>
							Event planner
						</Typography>
						<Divider />
						<List onClick={toggleDrawer}>
							<ListItem>
								<Link href={ROUTES.HOMEPAGE}>
									<Typography color={"custom.text"}>
										Link-1
									</Typography>
								</Link>
							</ListItem>
							<ListItem>
								<Link href={ROUTES.HOMEPAGE}>
									<Typography color={"custom.text"}>
										Link-2
									</Typography>
								</Link>
							</ListItem>
							<ListItem>
								<Link href={ROUTES.HOMEPAGE}>
									<Typography color={"custom.text"}>
										Link-3
									</Typography>
								</Link>
							</ListItem>
						</List>
					</Box>
					<Box>
						<Account toggleDrawer={toggleDrawer} />
						<LanguageMenu />
					</Box>
				</Box>
			</Drawer>
		</Box>
  );
};

export default DrawerMobile;
