import { PaletteModeEnum } from "@/shared/enum/theme";
import { PaletteMode, ThemeOptions } from "@mui/material";
import { isEqual } from "lodash";

type PaletteOptionsCustom = {
  text: string;
  textWhite: string;
  textBlack: string;
};
declare module "@mui/material/styles" {
  interface Palette {
    custom: Palette["primary"];
  }
  interface PaletteOptions {
    custom: PaletteOptionsCustom;
  }
}

export const generatePaletteByMode = (mode: PaletteMode): ThemeOptions => {
  const isDarkMode = isEqual(mode, PaletteModeEnum.Dark);

  return {
    typography: {
      allVariants: {
        color: isDarkMode ? "#DBD9D3" : "#2A2A28",
      },
    },
    palette: {
      mode,
      primary: {
        main: isDarkMode ? "#f2f2f2" : "#2a2a28",
      },
      secondary: {
        main: "#0b7a75",
      },
      custom: {
        text: isDarkMode ? "#CECBC1" : "#2A2A28",
        textWhite: "#CECBC1",
        textBlack: "#2A2A28",
      },
    },
  };
};
