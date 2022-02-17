import { Context } from 'vm';
import { IOrga } from '../../helpers/interfaces';
import { prisma } from '../lib/prisma';

export const organizationQueries = {
  AllUsers: async () => {
    return await prisma.organizations.findMany();
  },

  OneUser: (_parent: ParentNode, args: { idOrganization: number }, _context: Context) => {
    return prisma.organizations.findUnique({
      where: {
        idOrganization: +args.idOrganization,
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
        idUser: args.idUser,
        siret: args.siret,
      },
    });
    return organization;
  },

  updateOrga: async (
    _parent: ParentNode,
    args: { idOrganization: number; data: IOrga },
    _context: Context,
  ) => {
    const orgaUpdated = await prisma.organizations.update({
      where: {
        idOrganization: +args.idOrganization,
      },
      data: {
        name: args.data.name,
        phone: args.data.phone,
        email: args.data.email,
        address: args.data.address,
        zipCode: args.data.zipCode,
        city: args.data.city,
        idUser: args.data.idUser,
        siret: args.data.siret,
      },
    });
    return {
      message: `${orgaUpdated.name} has been updated!`,
    };
  },

  deleteOrga: async (
    _parent: ParentNode,
    args: { idOrganization: number },
    _context: Context,
  ) => {
    const orgaDeleted = await prisma.organizations.delete({
      where: {
        idOrganization: +args.idOrganization,
      },
    });
    return orgaDeleted;
  },
};
