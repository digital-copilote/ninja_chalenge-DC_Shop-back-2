import { Context } from 'vm';
import { IOrder } from '../../helpers/interfaces';
import { prisma } from '../lib/prisma';

export const orderQueries = {
  AllOrders: async () => {
    return await prisma.orders.findMany();
  },

  OneOrder: (_parent: ParentNode, args: { idOrder: number }, _context: Context) => {
    return prisma.orders.findUnique({
      where: {
        idOrder: +args.idOrder,
      },
    });
  },
};

export const orderMutations = {
  createOrder: async (_parent: ParentNode, args: IOrder, _context: Context) => {
    const order = await prisma.orders.create({
      data: {
        price: args.price,
        date: args.date,
        address: args.address,
        zipCode: args.zipCode,
        city: args.city,
        idUser: args.idUser,
      },
    });
    return order;
  },

  updateOrder: async (
    _parent: ParentNode,
    args: { idOrder: number; data: IOrder },
    _context: Context,
  ) => {
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
  },

  deleteOrder: async (
    _parent: ParentNode,
    args: { idOrder: number },
    _context: Context,
  ) => {
    const orderDeleted = await prisma.orders.delete({
      where: {
        idOrder: +args.idOrder,
      },
    });
    return orderDeleted;
  },
};
