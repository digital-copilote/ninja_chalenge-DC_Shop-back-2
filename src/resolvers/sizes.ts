import { Context } from 'vm';
import { ISizes } from '../helpers/interfaces';
import { size } from '../JOI/validate';
import inputValidator from '../lib/inputValidator';
import { prisma } from '../lib/prisma';
import { formatSize } from '../lib/utils';
import { ErrorHandler } from '../Middleware/errors';

export const sizesQueries = {
  AllSizes: async () => {
    try {
      const sizes = await prisma.sizes.findMany();
      return sizes;
    } catch (err) {
      if (err instanceof Error) throw new ErrorHandler(500, err.message);
    }
  },

  OneSize: async (_parent: ParentNode, args: { idSize: number }, _context: Context) => {
    try {
      const size = await prisma.sizes.findUnique({
        where: {
          idSize: +args.idSize,
        },
        rejectOnNotFound: true,
      });
      return size;
    } catch (err) {
      throw new ErrorHandler(404, 'Not Found');
    }
  },
};

export const sizesMutations = {
  createSize: async (_parent: ParentNode, args: { data: ISizes }, _context: Context) => {
    inputValidator(size, args.data);
    try {
      const sizeCreated = await prisma.sizes.create({
        data: {
          name: formatSize(args.data.name),
        },
      });
      return sizeCreated;
    } catch (err) {
      if (err instanceof Error) throw new ErrorHandler(500, err.message);
    }
  },

  updateSize: async (
    _parent: ParentNode,
    args: { idSize: number; data: ISizes },
    _context: Context,
  ) => {
    inputValidator(size, args.data);
    try {
      const sizeUpdated = await prisma.sizes.update({
        where: {
          idSize: +args.idSize,
        },
        data: {
          name: formatSize(args.data.name),
        },
      });

      return {
        message: `Size ${sizeUpdated.name} has been updated!`,
      };
    } catch (err) {
      throw new ErrorHandler(404, 'Not Found');
    }
  },

  deleteSize: async (
    _parent: ParentNode,
    args: { idSize: number },
    _context: Context,
  ) => {
    try {
      const sizeDeleted = await prisma.sizes.delete({
        where: {
          idSize: +args.idSize,
        },
      });
      return { message: `Drawn ${sizeDeleted.name} has been deleted!` };
    } catch (err) {
      if (err instanceof Error) throw new ErrorHandler(404, 'Not Found');
    }
  },
};
