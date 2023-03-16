import { NextApiResponse } from "next";
import isEmpty from "lodash/isEmpty";
import nextConnect from "next-connect";
import prisma from "@/../prisma/prisma";
import { authorization } from "../middleware";

import { NextApiRequestAuthorized } from "@/shared/types/api";

const GetCurrentUser = nextConnect({
  onError(error, req: NextApiRequestAuthorized, res: NextApiResponse) {
    res.status(501).json({
      error: `Sorry something Happened! ${error.message}`,
    });
  },
  onNoMatch(req: NextApiRequestAuthorized, res: NextApiResponse) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

GetCurrentUser.get(
  async (req: NextApiRequestAuthorized, res: NextApiResponse) => {
    const user = await prisma.user.findUnique({
      where: {
        id: req.decoded.id,
      },
      //   include: {
      //     profile: {
      //       include: {
      //         gallery: true,
      //         plans: true,
      //         events: true,
      //         education: true,
      //         workExperience: true
      //       }
      //     }
      //   }
    });

    if (!isEmpty(user)) {
      return res.status(200).send({
        message: "Getting current user successfully.",
        status: 200,
        data: user,
      });
    } else {
      return res.status(200).send({
        message: "Cannot find the current user.",
        status: 200,
      });
    }
  }
);

export default authorization(GetCurrentUser);
