import { validation } from "@/shared/constants/regEx";
import { generateHexColor } from "@/shared/utils";
import { hash } from "bcrypt";
import { isEmpty, isNil } from "lodash";
import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import prisma from "prisma/prisma";
import { schema } from "schemas/users";

const Register = nextConnect({
	onError(error, req: NextApiRequest, res: NextApiResponse) {
		res.status(501).json({
			error: `Sorry something Happened! ${error.message}`,
		});
	},
	onNoMatch(req: NextApiRequest, res: NextApiResponse) {
		res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
	},
});

Register.post(async (req: NextApiRequest, res: NextApiResponse) => {
	const { firstName, lastName, email, password } = req.body;

	const userAlreadyExist = await prisma.users.findUnique({
		where: {
			email: email,
		},
	});

	const validName =
		validation.lettersOnly.test(firstName.trim()) &&
		validation.lettersOnly.test(lastName.trim());
	const validEmail = validation.email.test(email.toLowerCase());
	const validPassword = validation.oneLowerUpperDigit.test(password);

	if (!isEmpty(userAlreadyExist) || !isNil(userAlreadyExist)) {
		return res.status(409).json({
			message: "Email already exist.",
		});
	}

	// const verifyToken = '' GENERATE USING JWT, TO CRYPT USERID AND EXPIRE DATE

	if (validName && validEmail && validPassword) {
		hash(password, 12, async (err, hash) => {
			if (!err) {
				schema.parse({
					firstName,
					lastName,
					email,
					password: hash,
					avatar: generateHexColor(),
				});
				return await prisma.users
					.create({
						data: {
							firstName,
							lastName,
							email,
							password: hash,
							avatar: generateHexColor(),

							// profile: {
							//   create: {
							// 	sports: [],
							// 	sessionTypes: [],
							// 	sessionLocations: []
							//   }
							// }
						},
					})
					.then((data: any) => {
						// [TBI] Send confirmation email
						return res.status(201).json({
							message: "User was created.",
							status: 200,
							data,
						});
					})
					.catch((e: any) => {
						return res.status(401).json({
							message:
								"Something went wrong, the user can't be created, " +
								e.message,
							status: 401,
							data: {},
						});
					});
			} else
				return res.status(401).json({
					message: `[BCRYPT]:${err}`,
					status: 401,
					data: {},
				});
		});
	} else {
		return res.status(401).json({
			message: "Invalid credentials.",
			status: 401,
			data: {},
		});
	}
});

export default Register;
