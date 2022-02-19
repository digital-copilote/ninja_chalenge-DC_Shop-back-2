import { Context } from 'apollo-server-core';
import { IThemes } from '../helpers/interfaces';
import { prisma } from '../lib/prisma';
import { formatText } from '../lib/utils';
import { ErrorHandler } from '../Middleware/errors';

export const themesQueries = {
  AllThemes: async () => {
    try {
      const themes = await prisma.themes.findMany({
        include: {
          draws: true,
        },
      });
      return themes;
    } catch (err) {
      if (err instanceof Error) throw new ErrorHandler(500, err.message);
    }
  },

  OneTheme: async (_parent: ParentNode, args: { idTheme: number }, _context: Context) => {
    try {
      const theme = await prisma.themes.findUnique({
        where: {
          idTheme: +args.idTheme,
        },
        include: {
          draws: true,
        },
        rejectOnNotFound: true,
      });
      return theme;
    } catch (err) {
      throw new ErrorHandler(404, 'Not Found');
    }
  },
};

export const themesMutations = {
  createTheme: async (
    _parent: ParentNode,
    args: { data: IThemes },
    _context: Context,
  ) => {
    try {
      const themeCreated = await prisma.themes.create({
        data: {
          name: formatText(args.data.name),
        },
      });
      return themeCreated;
    } catch (err) {
      if (err instanceof Error) throw new ErrorHandler(500, err.message);
    }
  },

  updateTheme: async (
    _parent: ParentNode,
    args: { idTheme: number; data: IThemes },
    _context: Context,
  ) => {
    try {
      const drawUpdated = await prisma.themes.update({
        where: {
          idTheme: +args.idTheme,
        },
        data: {
          name: formatText(args.data.name),
        },
      });
      return {
        message: `Theme ${drawUpdated.name} has been updated !`,
      };
    } catch (err) {
      if (err instanceof Error) throw new ErrorHandler(500, err.message);
    }
  },

  deleteTheme: async (
    _parent: ParentNode,
    args: { idTheme: number },
    _context: Context,
  ) => {
    try {
      const themeDeleted = await prisma.themes.delete({
        where: {
          idTheme: +args.idTheme,
        },
      });
      return { message: `Theme ${themeDeleted.name} has been deleted!` };
    } catch (err) {
      if (err instanceof Error) throw new ErrorHandler(404, 'Not Found');
    }
  },
};
