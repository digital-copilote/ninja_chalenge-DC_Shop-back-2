import { Context } from 'vm';
import { IOrder } from '../../helpers/interfaces';
import { prisma } from '../lib/prisma';
import { ErrorHandler } from '../Middleware/errors';

export const orderQueries = {
  AllOrders: async () => {
    try {
      const orders = await prisma.orders.findMany();
      return orders;
    } catch (err) {
      if (err instanceof Error) throw new ErrorHandler(500, err.message);
    }
  },

  OneOrder: async (_parent: ParentNode, args: { idOrder: number }, _context: Context) => {
    try {
      const order = await prisma.orders.findUnique({
        where: {
          idOrder: +args.idOrder,
        },
        include: {
          user: true,
        },
        rejectOnNotFound: true,
      });
      return order;
    } catch (err) {
      throw new ErrorHandler(404, 'Not Found');
    }
  },
};

export const orderMutations = {
  createOrder: async (_parent: ParentNode, args: { data: IOrder }, _context: Context) => {
    try {
      const order = await prisma.orders.create({
        data: {
          price: args.data.price,
          date: args.data.date,
          address: args.data.address,
          zipCode: args.data.zipCode,
          city: args.data.city,
          idUser: args.data.idUser,
        },
      });
      return order;
    } catch (err) {
      if (err instanceof Error) throw new ErrorHandler(500, err.message);
    }
  },

  updateOrder: async (
    _parent: ParentNode,
    args: { idOrder: number; data: IOrder },
    _context: Context,
  ) => {
    try {
      const orderUpdated = await prisma.orders.update({
        where: {
          idOrder: +args.idOrder,
        },
        data: {
          price: args.data.price,
          date: args.data.date,
          address: args.data.address,
          zipCode: args.data.zipCode,
          city: args.data.city,
          idUser: args.data.idUser,
        },
      });
      return {
        message: `The order n°${orderUpdated.idOrder} has been updated!`,
      };
    } catch (err) {
      throw new ErrorHandler(404, 'Not Found');
    }
  },

  deleteOrder: async (
    _parent: ParentNode,
    args: { idOrder: number },
    _context: Context,
  ) => {
    try {
      const orderDeleted = await prisma.orders.delete({
        where: {
          idOrder: +args.idOrder,
        },
      });
      return orderDeleted;
    } catch (err) {
      throw new ErrorHandler(404, 'Not Found');
    }
  },
};
