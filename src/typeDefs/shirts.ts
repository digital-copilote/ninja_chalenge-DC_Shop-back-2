export const shirtsGql = `
type Shirts {
    idShirt: ID!
    price: Float
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
`;
