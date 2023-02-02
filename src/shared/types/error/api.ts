import { NextApiRequest } from "next/types";

export type RequestError = {
	status: number;
	message: string;
};

export type TDecodedJWT = {
	id: string;
	email: string;
};
export interface NextApiRequestAuthorized extends NextApiRequest {
	decoded: TDecodedJWT;
}
