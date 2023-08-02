import { generateHexColor } from "@/shared/utils";
import { hash } from "bcrypt";
import { isEmpty, isNil } from "lodash";
import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import prisma from "prisma/prisma";
import { schema } from "schemas/user";
import { registerSchema } from "@/shared/constants/validations";

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

// eslint-disable-next-line consistent-return
Register.post(async (req: NextApiRequest, res: NextApiResponse) => {
  const { firstName, lastName, email, password } = req.body;

  const userAlreadyExist = await prisma.user.findUnique({
		where: {
			email,
		},
  });

  const isSchemaValid = await registerSchema
    .validate({
      firstName,
      lastName,
      email,
      password,
    })
    .then(() => true)
    .catch(() => false);

  if (!isEmpty(userAlreadyExist) || !isNil(userAlreadyExist)) {
    return res.status(409).json({
      status: 409,
      message: "Email already exist.",
    });
  }

  // const verifyToken = '' GENERATE USING JWT, TO CRYPT USERID AND EXPIRE DATE

  if (isSchemaValid) {
    hash(password, 12, async (err, hash) => {
      if (!err) {
			schema.parse({
				firstName,
				lastName,
				email,
				password: hash,
				avatar: generateHexColor(),
			});
			return prisma.user
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
				.then((data: any) =>
					// [TBI] Send confirmation email
					res.status(201).json({
						userId: data.id,
					})
				)
				.catch((e: any) =>
					res.status(401).json({
						message: `Something went wrong, the user can't be created, ${e.message}`,
						status: 401,
					})
				);
		}
		return res.status(401).json({
			message: `[BCRYPT]:${err}`,
			status: 401,
		});
    });
  } else {
    return res.status(401).json({
      message: "Invalid credentials.",
      status: 401,
    });
  }
});

export default Register;
