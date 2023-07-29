import { NextApiResponse } from "next";
import { verify } from "jsonwebtoken";

import { NextApiRequestAuthorized } from "@/shared/types/api";
import { NextConnect } from "next-connect";
import { ROUTES } from "@/shared/constants/routes";

export const authorization =
  (fn: NextConnect<NextApiRequestAuthorized, NextApiResponse<any>>) =>
  async (req: NextApiRequestAuthorized, res: NextApiResponse) => {
    return verify(
      req.cookies.authorization as string,
      process.env.JWT_KEY as string,
      async (err: any, decoded: any) => {
			if (!err && decoded) {
				req.decoded = decoded;
				return await fn(req as NextApiRequestAuthorized, res);
			}

			return res.redirect(401, ROUTES.HOMEPAGE);
		}
    );
  };
