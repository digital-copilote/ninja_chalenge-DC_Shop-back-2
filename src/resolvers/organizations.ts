import { Context } from 'vm';
import { IOrganization } from '../helpers/interfaces';
import inputValidator from '../lib/inputValidator';
import { prisma } from '../lib/prisma';
import { ErrorHandler } from '../Middleware/errors';
import { organization } from '../JOI/validate';
import { formatText } from '../lib/utils';

export const organizationQueries = {
  AllOrganizations: async () => {
    try {
      const organizations = prisma.organizations.findMany({
        include: {
          user: true,
          draws: true,
        },
      });
      return organizations;
    } catch (err) {
      if (err instanceof Error) throw new ErrorHandler(500, err.message);
    }
  },
  OneOrganization: async (
    _parent: ParentNode,
    args: { idOrganization: number },
    _context: Context,
  ) => {
    try {
      const organization = await prisma.organizations.findUnique({
        where: {
          idOrganization: +args.idOrganization,
        },
        include: {
          user: true,
          draws: true,
        },
        rejectOnNotFound: true,
      });
      return organization;
    } catch (err) {
      throw new ErrorHandler(404, 'Not Found');
    }
  },
};

export const organizationMutations = {
  createOrganization: async (
    _parent: ParentNode,
    args: { data: IOrganization },
    _context: Context,
  ) => {
    inputValidator(organization, args.data);
    try {
      const organizationCreated = await prisma.organizations.create({
        data: {
          name: formatText(args.data.name),
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
    } catch (err) {
      if (err instanceof Error) throw new ErrorHandler(500, err.message);
    }
  },

  updateOrganization: async (
    _parent: ParentNode,
    args: { idOrganization: number; data: IOrganization },
    _context: Context,
  ) => {
    inputValidator(organization, args.data);
    try {
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
    } catch (err) {
      throw new ErrorHandler(404, 'Not Found');
    }
  },

  deleteOrganization: async (
    _parent: ParentNode,
    args: { idOrganization: number },
    _context: Context,
  ) => {
    try {
      const organizationDeleted = await prisma.organizations.delete({
        where: {
          idOrganization: +args.idOrganization,
        },
      });
      return organizationDeleted;
    } catch (err) {
      throw new ErrorHandler(404, 'Not Found');
    }
  },
};
