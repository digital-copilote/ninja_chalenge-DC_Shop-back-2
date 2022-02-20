export const sizesGql = `
type Sizes {
    idSize: ID!
    name: String
    draws: [Shirts]
  }

  type Query {
    AllSizes: [Sizes]
    OneSize(idSize: ID!): Sizes
  }

  input sizeCreateInput {
    idSize: ID
    name: String
  }

  input updateSizeInput {
    idSize: ID
    name: String
  }

  type UpdateSizeResponse {
    message: String
    size: Sizes
  }
  type DeleteSizeResponse {
    message: String
    size: Sizes
  }

  type Mutation {
    createSize(data: sizeCreateInput!): Sizes
    updateSize(idSize: ID!, data: updateSizeInput!): UpdateSizeResponse
    deleteSize(idSize: ID!): DeleteSizeResponse
  }
`;
