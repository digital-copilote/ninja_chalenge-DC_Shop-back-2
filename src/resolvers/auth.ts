import users from '../../helpers/users';
import { Response } from 'express';
import { prisma } from '../lib/prisma';
import { ErrorHandler } from '../Middleware/errors';

interface IloggedIn {
  email: string;
  password: string;
}

export const authMutations = {
  loggedIn: async (
    _parent: ParentNode,
    args: { data: IloggedIn },
    { res }: { res: Response },
  ) => {
    try {
      const user = await prisma.users.findUnique({
        where: {
          email: args.data.email,
        },
      });

      if (!user) {
        throw new ErrorHandler(404, 'Not found');
      } else {
        const verifyPassword = await users.verifyPassword(
          args.data.password,
          user.password,
        );
        if (verifyPassword) {
          const token = users.calculateToken(args.data.email, user.idUser);
          res.cookie('user_token', token);
          return user;
        }
      }
    } catch (err) {
      if (err instanceof Error) throw new ErrorHandler(500, err.message);
    }
  },
};
