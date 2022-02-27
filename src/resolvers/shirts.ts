import { Context } from 'vm';
import { IShirt } from '../helpers/interfaces';
import { shirt } from '../JOI/validate';
import inputValidator from '../lib/inputValidator';
import { prisma } from '../lib/prisma';
import { ErrorHandler } from '../Middleware/errors';

export const shirtsQueries = {
  AllShirts: async (
    _parent: ParentNode,
    args: { idTheme: number },
    _context: Context,
  ) => {
    try {
      if (args.idTheme) {
        const shirtsCollection = await prisma.shirts.findMany({
          where: {
            draw: {
              idTheme: +args.idTheme,
            },
          },
          include: {
            size: true,
            draw: {
              include: {
                theme: true,
                user: true,
              },
            },
          },
        });
        return shirtsCollection;
      } else {
        const shirts = await prisma.shirts.findMany({
          where: {
            idSize: 2,
          },
          include: {
            size: true,
            draw: {
              include: {
                theme: true,
                user: true,
              },
            },
          },
        });
        return shirts;
      }
    } catch (err) {
      if (err instanceof Error) throw new ErrorHandler(500, err.message);
    }
  },

  OneShirt: async (_parent: ParentNode, args: { idShirt: number }, _context: Context) => {
    try {
      const shirt = await prisma.shirts.findUnique({
        where: {
          idShirt: +args.idShirt,
        },
        include: {
          size: true,
          draw: {
            include: {
              user: true,
              theme: true,
              organization: true,
            },
          },
        },
        rejectOnNotFound: true,
      });
      return shirt;
    } catch (err) {
      throw new ErrorHandler(404, 'Not Found');
    }
  },
};

export const shirtsMutations = {
  createShirt: async (_parent: ParentNode, args: { data: IShirt }, _context: Context) => {
    inputValidator(shirt, args.data);
    try {
      const shirtCreated = await prisma.shirts.create({
        data: {
          price: args.data.price,
          idDraw: args.data.idDraw,
          idSize: args.data.idSize,
        },
      });
      return shirtCreated;
    } catch (err) {
      if (err instanceof Error) throw new ErrorHandler(500, err.message);
    }
  },

  updateShirt: async (
    _parent: ParentNode,
    args: { idShirt: number; data: IShirt },
    _context: Context,
  ) => {
    inputValidator(shirt, args.data);
    try {
      const shirtUpdated = await prisma.shirts.update({
        where: {
          idShirt: +args.idShirt,
        },
        data: {
          idShirt: args.data.idShirt,
          idDraw: args.data.idDraw,
          idSize: args.data.idSize,
          price: args.data.price,
        },
      });
      return {
        message: `Shirt n°${shirtUpdated.idShirt} has been updated!`,
      };
    } catch (err) {
      if (err instanceof Error) throw new ErrorHandler(500, err.message);
    }
  },

  deleteShirt: async (
    _parent: ParentNode,
    args: { idShirt: number },
    _context: Context,
  ) => {
    try {
      const shirtDeleted = await prisma.shirts.delete({
        where: {
          idShirt: +args.idShirt,
        },
      });
      return { message: `Shirt n°${shirtDeleted.idShirt} has been deleted!` };
    } catch (err) {
      if (err instanceof Error) throw new ErrorHandler(404, 'Not Found');
    }
  },
};
