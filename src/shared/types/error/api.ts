import { AxiosError } from "axios";

export type TRequestError = AxiosError<{
  message: string;
  status: number;
}>;
