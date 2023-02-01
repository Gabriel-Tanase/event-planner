import "@/styles/globals.css";
import React, { useRef } from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";
import createEmotionCache from "../../config/createEmotionCache";
import { createTheme } from "@mui/material";
import { createContext, useMemo, useState } from "react";
import { generatePaletteByMode } from "config/theme";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
interface MyAppProps extends AppProps {
	emotionCache?: EmotionCache;
}

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();
export const ColorModeContext = createContext({ toggleColorMode: () => {} });

export default function App(props: MyAppProps) {
	const [mode, setMode] = useState<"light" | "dark">("light");
	const {
		Component,
		emotionCache = clientSideEmotionCache,
		pageProps,
	} = props;

	const queryClient = useRef(new QueryClient());

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
					<QueryClientProvider client={queryClient.current}>
						<Hydrate state={pageProps.dehydrateState}>
							<CssBaseline />
							<Component {...pageProps} />
						</Hydrate>
					</QueryClientProvider>
				</ThemeProvider>
			</ColorModeContext.Provider>
		</CacheProvider>
	);
}
