import { Context } from 'vm';
import { IUser } from '../../helpers/interfaces';
import crypt from '../../helpers/users';
import { prisma } from '../lib/prisma';
import { ErrorHandler } from '../Middleware/errors';

export const userQueries = {
  AllUsers: async () => {
    return await prisma.users.findMany();
  },

  OneUser: (_parent: ParentNode, args: { idUser: number }, _context: Context) => {
    return prisma.users.findUnique({
      where: {
        idUser: +args.idUser,
      },
    });
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
      const hashedPassword = await crypt.hashPassword(args.data.password);
      const user = await prisma.users.create({
        data: {
          lastname: args.data.lastname,
          firstname: args.data.firstname,
          birthday: args.data.birthday,
          phone: args.data.phone,
          email: args.data.email,
          password: hashedPassword,
          address: args.data.address,
          zipCode: args.data.zipCode,
          city: args.data.city,
          role: args.data.role,
          bio: args.data.bio,
        },
      });
      return user;
    } else {
      throw new ErrorHandler(409, 'Email already exists!');
    }
  },

  updateUser: async (
    _parent: ParentNode,
    args: { idUser: number; data: IUser },
    _context: Context,
  ) => {
    const hashedPassword =
      args.data.password && (await crypt.hashPassword(args.data.password));
    const userUpdated = await prisma.users.update({
      where: {
        idUser: +args.idUser,
      },
      data: {
        lastname: args.data.lastname,
        firstname: args.data.firstname,
        birthday: args.data.birthday,
        phone: args.data.phone,
        email: args.data.email,
        address: args.data.address,
        zipCode: args.data.zipCode,
        city: args.data.city,
        role: args.data.role,
        bio: args.data.bio,
        password: hashedPassword,
      },
    });
    return {
      message: `${userUpdated.firstname} ${userUpdated.lastname} has been updated!`,
    };
  },

  deleteUser: async (
    _parent: ParentNode,
    args: { idUser: number },
    _context: Context,
  ) => {
    const userDeleted = await prisma.users.delete({
      where: {
        idUser: +args.idUser,
      },
    });
    return userDeleted;
  },
};
