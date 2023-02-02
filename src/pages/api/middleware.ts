import { NextApiHandler, NextApiResponse } from "next";
import { verify } from "jsonwebtoken";

import { NextApiRequestAuthorized } from "@/shared/types/error/api";
import { PATHS } from "@/features/Authentication/constants";

export const authorization =
	(fn: NextApiHandler) =>
	async (req: NextApiRequestAuthorized, res: NextApiResponse) => {
		return verify(
			req.cookies.authorization as string,
			process.env.JWT_KEY as string,
			async (err: any, decoded: any) => {
				if (!err && decoded) {
					req.decoded = decoded;
					return await fn(req as NextApiRequestAuthorized, res);
				}

				return res.redirect(401, PATHS.LOGIN);
			}
		);
	};
