import { isEmpty } from "lodash";
import { TRequestError } from "./types/error/api";

// Generate a random hex color
export const generateHexColor: () => string = () =>
  "#" + Math.floor(Math.random() * 16777215).toString(16);

// Handle API errors looking for a custom message
export const handleErrorMessage = (error: TRequestError): string => {
  if (isEmpty(error.response)) {
    return "Something goes wrong!";
  }
  return error.response.data.message;
};
