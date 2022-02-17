import { Context } from 'vm';
import { CreateUser } from '../../helpers/interfaces';
import crypt from '../../helpers/users';
import { prisma } from '../lib/prisma';

export const userQueries = {
  AllUsers: async () => {
    return await prisma.users.findMany();
  },

  OneUser: (_parent: ParentNode, args: { id_user: number }, _context: Context) => {
    return prisma.users.findUnique({
      where: {
        id_user: +args.id_user,
      },
    });
  },
};

export const userMutations = {
  createUser: async (_parent: ParentNode, args: CreateUser, _context: Context) => {
    const hashedPassword = await crypt.hashPassword(args.hashedPassword);
    const user = await prisma.users.create({
      data: {
        lastname: args.lastname,
        firstname: args.firstname,
        birthday: args.birthday,
        phone: args.phone,
        email: args.email,
        hashedPassword: hashedPassword,
        address: args.address,
        zipCode: args.zipCode,
        city: args.city,
        role: args.role,
        bio: args.bio,
      },
    });

    return user;
  },

  updateUser: async (
    _parent: ParentNode,
    args: { id_user: number; data: CreateUser },
    _context: Context,
  ) => {
    const userUpdated = await prisma.users.update({
      where: {
        id_user: +args.id_user,
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
      },
    });
    return {
      message: `${userUpdated.firstname} ${userUpdated.lastname} has been updated!`,
    };
  },

  deleteUser: async (
    _parent: ParentNode,
    args: { id_user: number },
    _context: Context,
  ) => {
    const userDeleted = await prisma.users.delete({
      where: {
        id_user: +args.id_user,
      },
    });
    return userDeleted;
  },
};
