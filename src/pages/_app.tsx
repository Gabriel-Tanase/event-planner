import "@/styles/globals.css";
import React, { createContext, useMemo, useState } from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";
import createEmotionCache from "../../config/createEmotionCache";
import { createTheme } from "@mui/material";
import { generatePaletteByMode } from "config/theme";
import { Hydrate, QueryClientProvider } from "react-query";
import { SnackbarProvider } from "material-ui-snackbar-provider";
import CustomSnackbarComponent from "@/components/CustomSnackbar/CustomSnackbar";
import ErrorBoundary from "@/components/ErrorBoundary";
import { queryClient } from "config/reactQuery";

interface MyAppProps extends AppProps {
	emotionCache: EmotionCache;
}

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();
export const ColorModeContext = createContext({ toggleColorMode: () => {} });

const App = (props: MyAppProps) => {
	const [mode, setMode] = useState<"light" | "dark">("light");

	const {
		Component,
		emotionCache = clientSideEmotionCache,
		pageProps,
	} = props;

	const colorMode = useMemo(
		() => ({
			toggleColorMode: () => {
				setMode((prevMode) =>
					prevMode === "light" ? "dark" : "light"
				);
			},
		}),
		[]
	);

	const theme = useMemo(
		() => createTheme(generatePaletteByMode(mode)),
		[mode]
	);

	return (
		<CacheProvider value={emotionCache}>
			<Head>
				<meta
					name='viewport'
					content='initial-scale=1, width=device-width'
				/>
			</Head>
			<ColorModeContext.Provider value={colorMode}>
				<ThemeProvider theme={theme}>
					<SnackbarProvider
						SnackbarComponent={CustomSnackbarComponent}
						SnackbarProps={{
							autoHideDuration: 200000,
							className: "Snackbar",
							anchorOrigin: {
								vertical: "bottom",
								horizontal: "center",
							},
						}}
					>
						<QueryClientProvider client={queryClient}>
							<Hydrate state={pageProps.dehydrateState}>
								<CssBaseline />
								<ErrorBoundary>
									<Component {...pageProps} />
								</ErrorBoundary>
							</Hydrate>
						</QueryClientProvider>
					</SnackbarProvider>
				</ThemeProvider>
			</ColorModeContext.Provider>
		</CacheProvider>
	);
};

export default App;