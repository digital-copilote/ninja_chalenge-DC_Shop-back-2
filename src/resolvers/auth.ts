import users from '../helpers/users';
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
          // I think httpOnly cookies are more safe than classic cookies. How many time the signed jwt is valid?
          const token = users.calculateToken(args.data.email, user.idUser);
          res.cookie('user_token', token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60, // 1 hour
            secure: !!(process.env.NODE_ENV === 'production'),
          });
          return user;
        }
      }
    } catch (err) {
      if (err instanceof Error) throw new ErrorHandler(500, err.message);
    }
  },
};
