import { Context } from 'vm';
import { prisma } from '../lib/prisma';

export const userQueries = {
  AllUsers: async () => {
    return await prisma.users.findMany();
  },

  OneUser: (_parent: ParentNode, args: { id_user: number }, _context: Context) => {
    return prisma.users.findUnique({
      where: {
        id_user: args.id_user,
      },
    });
  },
};
