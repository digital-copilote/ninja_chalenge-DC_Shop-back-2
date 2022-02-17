import { Context } from 'vm';
import { IOrganization } from '../../helpers/interfaces';
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
  createOrganization: async (
    _parent: ParentNode,
    args: { data: IOrganization },
    _context: Context,
  ) => {
    const organizationCreated = await prisma.organizations.create({
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
    return organizationCreated;
  },

  updateOrganization: async (
    _parent: ParentNode,
    args: { idOrganization: number; data: IOrganization },
    _context: Context,
  ) => {
    const organizationUpdated = await prisma.organizations.update({
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
      message: `${organizationUpdated.name} has been updated!`,
    };
  },

  deleteOrganization: async (
    _parent: ParentNode,
    args: { idOrganization: number },
    _context: Context,
  ) => {
    const organizationDeleted = await prisma.organizations.delete({
      where: {
        idOrganization: +args.idOrganization,
      },
    });
    return {
      message: `${organizationDeleted.name} has been deleted!`,
    };
  },
};
