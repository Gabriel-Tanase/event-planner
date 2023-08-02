import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";

import useTranslation from "next-translate/useTranslation";
import { Avatar } from "@mui/material";

import { Language } from "@/shared/enum/general";
import { LanguageOutlined } from "@mui/icons-material";
import useNavigationService from "@/hooks/useNavigationService";

const LanguageMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | any>(null);

  const { changeLocale } = useNavigationService();

  const { t } = useTranslation("locale");

  const open = Boolean(anchorEl);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.nativeEvent.target);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const changeLanguageTo = (language: Language) => {
    switch (language) {
		case Language.Ro:
			return changeLocale(Language.Ro);
		case Language.En:
			return changeLocale(Language.En);
		default:
			return changeLocale(Language.Ro);
	}
  };

  return (
    <Box>
      <Tooltip title="Languages">
        <IconButton
          onClick={handleMenuClick}
          size="small"
          sx={{ ml: 2 }}
          aria-controls={open ? "language-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <Avatar sx={{ width: 32, height: 32 }}>
            <LanguageOutlined />
          </Avatar>
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        id="language-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={() => changeLanguageTo(Language.Ro)}>
          <Typography>{t("GENERAL.ROMANIAN")}</Typography>
        </MenuItem>
        <MenuItem onClick={() => changeLanguageTo(Language.En)}>
          <Typography>{t("GENERAL.ENGLISH")}</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default LanguageMenu;
