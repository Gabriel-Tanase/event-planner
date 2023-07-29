import { QueryClient } from "react-query";

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 30 * 1000,
			retry: 2,
		},
	},
});
