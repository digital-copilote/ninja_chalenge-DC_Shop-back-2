export const ordersItemsGql = `
type OrdersItems {
    idOrderItem: ID!
    quantity: Int
    idShirt: ID!
    shirt: Shirts
    order: Orders
  }

  input orderItemCreateInput {
    idOrderItem: ID
    quantity: Int!
    idShirt: Int!
    idOrder: Int!
  }

  input updateOrderItemInput {
    idOrderItem: ID
    quantity: Int!
    idShirt: Int!
    idOrder: Int
  }

  type UpdateOrderItemResponse {
    message: String
    orderItem: OrdersItems
  }
  type DeleteOrderItemResponse {
    message: String
    orderItem: OrdersItems
  }

  type Query {
    AllOrderItems: [OrdersItems]
    OneOrderItem(idOrderItem: ID!): OrdersItems
  }

  type Mutation {
    createOrderItem(data: orderItemCreateInput!): OrdersItems
    updateOrderItem(
      idOrderItem: ID!
      data: updateOrderItemInput!
    ): UpdateOrderItemResponse
    deleteOrderItem(idOrderItem: ID!): DeleteOrderItemResponse
  }
`;
