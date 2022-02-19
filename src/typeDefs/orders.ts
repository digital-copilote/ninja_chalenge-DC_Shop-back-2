export const ordersGql = `
type Orders {
    idOrder: ID!
    price: Float
    date: Date
    address: String
    zipCode: String
    city: String
    idUser: ID!
    user: Users
    shirts: [OrdersItems]
  }

  type Query {
    AllOrders: [Orders]
    OneOrder(idOrder: ID!): Orders
  }
  
  input createOrderInput {
    idOrder: Int
    price: Float
    date: Date
    address: String
    zipCode: String
    city: String
    idUser: Int
  }

  input updateOrderInput {
    idOrder: Int
    price: Float
    date: Date
    address: String
    zipCode: String
    city: String
    idUser: Int
  }

  type UpdateOrderResponse {
    message: String
    order: Orders
  }

  type Mutation {
    createOrder(data: createOrderInput!): Orders
    updateOrder(idOrder: ID!, data: updateOrderInput!): UpdateOrderResponse
    deleteOrder(idOrder: ID!): Orders
  }
`;
