import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/prisma";
import { compare } from "bcrypt";
import { isEmpty } from "lodash";
import { sign } from "jsonwebtoken";
import cookie from "cookie";
import nextConnect from "next-connect";

const Login = nextConnect({
	onError(error, req: NextApiRequest, res: NextApiResponse) {
		res.status(501).json({
			error: `Sorry something Happened! ${error.message}`,
		});
	},
	onNoMatch(req: NextApiRequest, res: NextApiResponse) {
		res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
	},
});

// eslint-disable-next-line consistent-return
Login.post(async (req: NextApiRequest, res: NextApiResponse) => {
	const { email, password } = req.body;

	const user = await prisma.user.findUnique({
		where: {
			email,
		},
	});

	if (!isEmpty(user)) {
		// eslint-disable-next-line consistent-return
		compare(password, user.password, async (err, result) => {
			if (!err && result) {
				const claims = { id: user.id, email };
				const JWT = sign(claims, process.env.JWT_KEY as string, {
					expiresIn: 172800000,
				});
				res.setHeader(
					"Set-Cookie",
					cookie.serialize("authorization", JWT, {
						httpOnly: true,
						secure: process.env.NODE_ENV !== "development",
						sameSite: "strict",
						maxAge: 172800000, // same as token expiresIn
						path: "/",
					})
				);
				res.status(200).json({
					userId: user.id,
				});
				res.end();
			} else
				return res.status(401).json({
					message: "Email or password incorrect.",
					status: 401,
				});
		});
	} else {
		return res.status(401).json({
			message: "Email or password incorrect.",
			status: 401,
		});
	}
});

export default Login;
