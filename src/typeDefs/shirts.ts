export const shirtsGql = `
type Shirts {
    idShirt: ID!
    price: Float!
    idDraw: ID!
    draw: Draws
    idSize: ID!
    size: Sizes
    orders: [OrdersItems]
  }

  type Query {
    AllShirts: [Shirts]
    OneShirt(idShirt: ID!): Shirts
  }

  input shirtCreateInput {
    price: Float!
    idSize: Int!
    idDraw: Int!
  }

  input updateShirtInput {
    idShirt: ID
    price: Float!
    idSize: Int!
    idDraw: Int!
  }

  type UpdateShirtResponse {
    message: String
    shirt: Shirts
  }
  type DeleteShirtResponse {
    message: String
    shirt: Shirts
  }

  type Mutation {
    createShirt(data: shirtCreateInput!): Shirts
    updateShirt(idShirt: ID!, data: updateShirtInput!): UpdateShirtResponse
    deleteShirt(idShirt: ID!): DeleteShirtResponse
  }
`;
