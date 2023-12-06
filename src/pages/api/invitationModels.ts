import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/prisma";
import nextConnect from "next-connect";

const InvitationModels = nextConnect({
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
InvitationModels.get(async (req: NextApiRequest, res: NextApiResponse) => {
	const invitations = await prisma.invitationModel.findMany();

	return res.status(200).json({
		message: "All invitation models",
		status: 200,
		data: invitations,
	});
});

export default InvitationModels;
