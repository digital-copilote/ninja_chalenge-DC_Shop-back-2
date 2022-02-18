import { Context } from 'vm';
import { IUser } from '../../helpers/interfaces';
import crypt from '../../helpers/users';
import { prisma } from '../lib/prisma';
import { formatText } from '../lib/utils';
import { ErrorHandler } from '../Middleware/errors';

export const userQueries = {
  AllUsers: async () => {
    try {
      const users = await prisma.users.findMany({
        include: {
          organisations: true,
          draws: true,
          orders: true,
        },
      });
      return users;
    } catch (err) {
      if (err instanceof Error) throw new ErrorHandler(500, err.message);
    }
  },

  OneUser: async (_parent: ParentNode, args: { idUser: number }, _context: Context) => {
    try {
      const user = await prisma.users.findUnique({
        where: {
          idUser: +args.idUser,
        },
        include: {
          organisations: true,
          draws: true,
          orders: true,
        },
        rejectOnNotFound: true,
      });
      return user;
    } catch (err) {
      throw new ErrorHandler(404, 'Not Found');
    }
  },
};

export const userMutations = {
  createUser: async (_parent: ParentNode, args: { data: IUser }, _context: Context) => {
    const emailExisting = await prisma.users.findUnique({
      where: {
        email: args.data.email,
      },
    });
    if (!emailExisting) {
      try {
        const hashedPassword = await crypt.hashPassword(args.data.password);
        const userCreated = await prisma.users.create({
          data: {
            lastname: formatText(args.data.lastname),
            firstname: formatText(args.data.firstname),
            birthday: args.data.birthday,
            phone: args.data.phone,
            email: args.data.email,
            address: args.data.address,
            zipCode: args.data.zipCode,
            city: args.data.city,
            role: args.data.role && formatText(args.data.role),
            bio: args.data.bio,
            password: hashedPassword,
          },
        });
        return userCreated;
      } catch (err) {
        if (err instanceof Error) throw new ErrorHandler(500, err.message);
      }
    } else {
      throw new ErrorHandler(409, 'Email already exists!');
    }
  },

  updateUser: async (
    _parent: ParentNode,
    args: { idUser: number; data: IUser },
    _context: Context,
  ) => {
    const emailExisting = await prisma.users.findUnique({
      where: {
        email: args.data.email,
      },
    });
    if (!emailExisting) {
      try {
        const hashedPassword =
          args.data.password && (await crypt.hashPassword(args.data.password));
        const userUpdated = await prisma.users.update({
          where: {
            idUser: +args.idUser,
          },
          data: {
            lastname: formatText(args.data.lastname),
            firstname: formatText(args.data.firstname),
            birthday: args.data.birthday,
            phone: args.data.phone,
            email: args.data.email,
            address: args.data.address,
            zipCode: args.data.zipCode,
            city: args.data.city,
            role: formatText(args.data.role),
            bio: args.data.bio,
            password: hashedPassword,
          },
        });
        return {
          message: `${userUpdated.firstname} ${userUpdated.lastname} has been updated!`,
        };
      } catch (err) {
        throw new ErrorHandler(404, 'Not Found');
      }
    } else {
      throw new ErrorHandler(409, 'Email Already exists');
    }
  },

  deleteUser: async (
    _parent: ParentNode,
    args: { idUser: number },
    _context: Context,
  ) => {
    try {
      const userDeleted = await prisma.users.delete({
        where: {
          idUser: +args.idUser,
        },
      });
      return userDeleted;
    } catch (err) {
      throw new ErrorHandler(404, 'Not Found');
    }
  },
};
