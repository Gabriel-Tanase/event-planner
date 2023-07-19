import { NextApiResponse } from "next";
import cookie from "cookie";
import { authorization } from "./middleware";
import nextConnect from "next-connect";

import { NextApiRequestAuthorized } from "@/shared/types/api";

const Logout = nextConnect({
	onError(error, req: NextApiRequestAuthorized, res: NextApiResponse) {
		res.status(501).json({
			error: `Sorry something Happened! ${error.message}`,
		});
	},
	onNoMatch(req: NextApiRequestAuthorized, res: NextApiResponse) {
		res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
	},
});

Logout.get(async (req: NextApiRequestAuthorized, res: NextApiResponse) => {
	res.setHeader("Set-Cookie", [
		cookie.serialize("auth-event-planner", "", {
			httpOnly: true,
			secure: process.env.NODE_ENV !== "development",
			sameSite: "strict",
			maxAge: -1,
			path: "/",
		}),
	]);
	return res.status(200).json({
		message: "Logout successfully.",
		status: 200,
	});
});

export default authorization(Logout);
