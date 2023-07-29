import { isEmpty } from "lodash";
import { TRequestError } from "./types/error/api";
import { ROUTES } from "./constants/routes";
import { QUERY_KEYS } from "@/features/Authentication/service/constants";
import { queryClient } from "config/reactQuery";

// Generate a random hex color
export const generateHexColor: () => string = () =>
	"#" + Math.floor(Math.random() * 16777215).toString(16);

// Handle API errors looking for a custom message
export const handleHttpErrorMessage = (error: TRequestError): string => {
	// If the token can't be verify invalidate VERIFY_USER_LOGGED_IN query
	if (
		typeof error.response?.data === "string" &&
		error.response?.data === ROUTES.HOMEPAGE &&
		error.response.status === 401
	) {
		queryClient.invalidateQueries(QUERY_KEYS.VERIFY_USER_LOGGED_IN);
		alert("USER UNAUTORIZED");
	}

	if (isEmpty(error.response)) {
		return "Something goes wrong!";
	}
	return error.response.data.message;
};
