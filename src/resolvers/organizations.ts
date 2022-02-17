import { Context } from 'vm';
import { IOrga } from '../../helpers/interfaces';
import { prisma } from '../lib/prisma';

export const organizationQueries = {
  AllUsers: async () => {
    return await prisma.organizations.findMany();
  },

  OneUser: (
    _parent: ParentNode,
    args: { id_organization: number },
    _context: Context,
  ) => {
    return prisma.organizations.findUnique({
      where: {
        id_organization: +args.id_organization,
      },
    });
  },
};

export const organizationMutations = {
  createOrga: async (_parent: ParentNode, args: IOrga, _context: Context) => {
    const organization = await prisma.organizations.create({
      data: {
        name: args.name,
        phone: args.phone,
        email: args.email,
        address: args.address,
        zipCode: args.zipCode,
        city: args.city,
        id_user: args.id_user,
      },
    });
    return organization;
  },

  updateOrga: async (
    _parent: ParentNode,
    args: { id_organization: number; data: IOrga },
    _context: Context,
  ) => {
    const orgaUpdated = await prisma.organizations.update({
      where: {
        id_organization: +args.id_organization,
      },
      data: {
        name: args.data.name,
        phone: args.data.phone,
        email: args.data.email,
        address: args.data.address,
        zipCode: args.data.zipCode,
        city: args.data.city,
        id_user: args.data.id_user,
      },
    });
    return {
      message: `${orgaUpdated.name} has been updated!`,
    };
  },

  deleteOrga: async (
    _parent: ParentNode,
    args: { id_organization: number },
    _context: Context,
  ) => {
    const orgaDeleted = await prisma.organizations.delete({
      where: {
        id_organization: +args.id_organization,
      },
    });
    return orgaDeleted;
  },
};
