import { Context } from 'vm';
import { IDraws } from '../helpers/interfaces';
import { draw } from '../JOI/validate';
import inputValidator from '../lib/inputValidator';
import { prisma } from '../lib/prisma';
import { formatText } from '../lib/utils';
import { ErrorHandler } from '../Middleware/errors';

export const drawsQueries = {
  AllDraws: async () => {
    try {
      const draws = await prisma.draws.findMany({
        include: {
          theme: true,
          user: true,
          organization: true,
        },
      });
      return draws;
    } catch (err) {
      if (err instanceof Error) throw new ErrorHandler(500, err.message);
    }
  },

  OneDraw: async (_parent: ParentNode, args: { idDraw: number }, _context: Context) => {
    try {
      const draw = await prisma.draws.findUnique({
        where: {
          idDraw: +args.idDraw,
        },
        include: {
          theme: true,
          user: true,
          organization: true,
        },
        rejectOnNotFound: true,
      });
      return draw;
    } catch (err) {
      throw new ErrorHandler(404, 'Not Found');
    }
  },
};

export const drawsMutations = {
  createDraw: async (_parent: ParentNode, args: { data: IDraws }, _context: Context) => {
    inputValidator(draw, args.data);
    try {
      const drawCreated = await prisma.draws.create({
        data: {
          name: formatText(args.data.name),
          idUser: args.data.idUser,
          urlDraw: args.data.urlDraw,
          idTheme: args.data.idTheme,
        },
      });
      return drawCreated;
    } catch (err) {
      if (err instanceof Error) throw new ErrorHandler(500, err.message);
    }
  },

  updateDraw: async (
    _parent: ParentNode,
    args: { idDraw: number; data: IDraws },
    _context: Context,
  ) => {
    inputValidator(draw, args.data);
    try {
      const drawUpdated = await prisma.draws.update({
        where: {
          idDraw: +args.idDraw,
        },
        data: {
          name: formatText(args.data.name),
          idUser: args.data.idUser,
          urlDraw: args.data.urlDraw,
          idTheme: args.data.idTheme,
        },
      });
      return {
        message: `Draw ${drawUpdated.name} has been updated!`,
      };
    } catch (err) {
      if (err instanceof Error) throw new ErrorHandler(500, err.message);
    }
  },

  deleteDraw: async (
    _parent: ParentNode,
    args: { idDraw: number },
    _context: Context,
  ) => {
    try {
      const drawDeleted = await prisma.draws.delete({
        where: {
          idDraw: +args.idDraw,
        },
      });
      return { message: `Drawn ${drawDeleted.name} has been deleted!` };
    } catch (err) {
      if (err instanceof Error) throw new ErrorHandler(404, 'Not Found');
    }
  },
};
