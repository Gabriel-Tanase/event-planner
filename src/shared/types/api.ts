import { NextApiRequest } from "next/types";

export type TResponse<T> = {
  message: string;
  status: number;
  data?: T;
};

export type TDecodedJWT = {
  id: string;
  email: string;
};
export interface NextApiRequestAuthorized extends NextApiRequest {
  decoded: TDecodedJWT;
}