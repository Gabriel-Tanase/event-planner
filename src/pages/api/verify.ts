import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";

import { verify } from "jsonwebtoken";

const Verify = nextConnect({
	onError(error, req: NextApiRequest, res: NextApiResponse) {
		res.status(501).json({
			error: `Sorry something Happened! ${error.message}`,
		});
	},
	onNoMatch(req: NextApiRequest, res: NextApiResponse) {
		res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
	},
});

Verify.get(async (req: NextApiRequest, res: NextApiResponse) => {
	return verify(
		req.cookies.authorization as string,
		process.env.JWT_KEY as string,
		async (err: any, decoded: any) => {
			if (!err && decoded) {
				console.log(decoded);
				return res.status(200).json({
					isUserAuthenticated: true,
				});
			}

			return res.status(200).json({
				isUserAuthenticated: false,
			});
		}
	);
});

export default Verify;
