import { NextApiRequest, NextApiResponse } from "next";
import { isEmpty } from "lodash";
import nextConnect from "next-connect";
import prisma from "@/../prisma/prisma";

const GetUserById = nextConnect({
	onError(error, req: NextApiRequest, res: NextApiResponse) {
		res.status(501).json({
			error: `Sorry something Happened! ${error.message}`,
		});
	},
	onNoMatch(req: NextApiRequest, res: NextApiResponse) {
		res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
	},
});

GetUserById.get(async (req: NextApiRequest, res: NextApiResponse) => {
	const user = await prisma.user.findUnique({
		where: {
			id: req.query.id as string,
		},
		// include: {
		//   profile: {
		//     include: {
		//       gallery: true,
		//       plans: true,
		//       events: true,
		//       education: true,
		//       workExperience: true
		//     }
		//   }
		// }
	});

	if (!isEmpty(user)) {
		return res.status(200).send(user);
	}
	return res.status(200).send({
		message: "Can't find the user.",
	});
});

export default GetUserById;
