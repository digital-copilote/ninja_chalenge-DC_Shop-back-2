import { Context } from 'vm';
import { IOrderItems } from '../helpers/interfaces';
import { orderItem } from '../JOI/validate';
import inputValidator from '../lib/inputValidator';
import { prisma } from '../lib/prisma';
import { ErrorHandler } from '../Middleware/errors';

export const orderItemsQueries = {
  AllOrderItems: async () => {
    try {
      const orderItems = await prisma.ordersItems.findMany({
        include: {
          order: true,
          shirt: true,
        },
      });
      return orderItems;
    } catch (err) {
      if (err instanceof Error) throw new ErrorHandler(500, err.message);
    }
  },

  OneOrderItem: async (
    _parent: ParentNode,
    args: { idOrderItem: number },
    _context: Context,
  ) => {
    try {
      const orderItem = await prisma.ordersItems.findUnique({
        where: {
          idOrderItem: +args.idOrderItem,
        },
        include: {
          order: true,
          shirt: true,
        },
        rejectOnNotFound: true,
      });
      return orderItem;
    } catch (err) {
      throw new ErrorHandler(404, 'Not Found');
    }
  },
};

export const orderItemsMutations = {
  createOrderItem: async (
    _parent: ParentNode,
    args: { data: IOrderItems },
    _context: Context,
  ) => {
    inputValidator(orderItem, args.data);
    try {
      const orderItemCreated = await prisma.ordersItems.create({
        data: {
          quantity: args.data.quantity,
          idOrder: args.data.idOrder,
          idShirt: args.data.idShirt,
        },
      });
      return orderItemCreated;
    } catch (err) {
      if (err instanceof Error) throw new ErrorHandler(500, err.message);
    }
  },

  updateOrderItem: async (
    _parent: ParentNode,
    args: { idOrderItem: number; data: IOrderItems },
    _context: Context,
  ) => {
    inputValidator(orderItem, args.data);
    try {
      const orderItemUpdated = await prisma.ordersItems.update({
        where: {
          idOrderItem: +args.idOrderItem,
        },
        data: {
          quantity: args.data.quantity,
          idOrder: args.data.idOrder,
          idShirt: args.data.idShirt,
        },
      });
      return {
        message: `Item n° ${orderItemUpdated.idOrderItem} has been updated!`,
      };
    } catch (err) {
      if (err instanceof Error) throw new ErrorHandler(500, err.message);
    }
  },

  deleteOrderItem: async (
    _parent: ParentNode,
    args: { idOrderItem: number },
    _context: Context,
  ) => {
    try {
      const orderItemDeleted = await prisma.ordersItems.delete({
        where: {
          idOrderItem: +args.idOrderItem,
        },
      });
      return { message: `Item n° ${orderItemDeleted.idOrderItem} has been deleted!` };
    } catch (err) {
      if (err instanceof Error) throw new ErrorHandler(404, 'Not Found');
    }
  },
};
