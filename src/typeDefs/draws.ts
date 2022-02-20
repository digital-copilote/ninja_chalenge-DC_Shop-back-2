export const drawsGql = `
type Draws {
    idDraw: ID!
    name: String
    idUser: ID!
    user: Users
    idOrganization: ID!
    organization: Organizations
    idTheme: ID!
    urlDraw: String
    theme: Themes
    sizes: [Shirts]
  }

  type Query {
    AllDraws: [Draws]
    OneDraw(idDraw: ID!): Draws
  }

  input drawCreateInput {
    idDraw: ID
    name: String
    idUser: Int!
    idOrganization: Int
    idTheme: Int!
    urlDraw: String
  }

  input updateDrawInput {
    idDraw: ID
    name: String
    idUser: Int!
    idOrganization: Int
    idTheme: Int!
    urlDraw: String
  }

  type UpdateDrawResponse {
    message: String
    draw: Draws
  }
  type DeleteDrawResponse {
    message: String
    draw: Draws
  }

  type Mutation {
    createDraw(data: drawCreateInput!): Draws
    updateDraw(idDraw: ID!, data: updateDrawInput!): UpdateDrawResponse
    deleteDraw(idDraw: ID!): DeleteDrawResponse
  }
`;
