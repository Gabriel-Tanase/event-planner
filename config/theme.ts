import { PaletteModeEnum } from "@/shared/enum/theme";
import { PaletteMode, ThemeOptions } from "@mui/material";
import { isEqual } from "lodash";

export const generatePaletteByMode = (mode: PaletteMode): ThemeOptions => {
	const isDarkMode = isEqual(mode, PaletteModeEnum.Dark);

	return {
		palette: {
			mode,
			primary: {
				main: isDarkMode ? "#f2f2f2" : "#2a2a28",
			},
		},
	};
};
