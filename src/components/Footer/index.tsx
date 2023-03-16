import { Box, Typography } from "@mui/material";
import React, { FC } from "react";

const Footer: FC<any> = () => {
  return (
    <Box
      sx={{
        height: "150px",
        width: "100%",
        backgroundColor: "custom.dark",
      }}
    >
      <Typography></Typography>
    </Box>
  );
};

export default Footer;
