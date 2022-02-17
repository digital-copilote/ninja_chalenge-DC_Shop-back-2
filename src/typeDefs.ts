import { gql } from 'apollo-server-express';

const typeDefs = gql`
  scalar Date

  type Users {
    idUser: ID!
    lastname: String
    firstname: String
    birthday: Date
    phone: String
    email: String!
    password: String
    address: String
    zipCode: String
    city: String
    role: String
    bio: String
    orders: [Orders]
    organizations: [Organizations]
    draws: [Draws]
  }

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

  type Organizations {
    idOrganization: ID!
    name: String
    phone: String
    email: String
    address: String
    zipCode: String
    city: String
    idUser: ID!
    user: Users
    draws: [Draws]
  }

  type Themes {
    idTheme: ID!
    name: String
    draws: [Draws]
  }

  type Draws {
    idDraw: ID!
    name: String
    idUser: ID!
    user: Users
    idOrganization: ID!
    organization: Organizations
    idTheme: ID!
    theme: Themes
    sizes: [Shirts]
  }

  type Shirts {
    idShirt: ID!
    price: Float
    idDraw: ID!
    draw: Draws
    idSize: ID!
    size: Sizes
    orders: [OrdersItems]
  }

  type Sizes {
    idSize: ID!
    name: String
    draws: [Shirts]
  }

  type OrdersItems {
    idOrderItem: ID!
    quantity: Int
    idShirt: ID!
    shirt: Shirts
    order: Orders
  }

  type Query {
    AllUsers: [Users]
    OneUser(idUser: ID!): Users
    UserOrganization(idUser: ID!): [Organizations]
    AllOrders: [Orders]
    OneOrder(idOrderItem: ID!): Orders
    AllOrganizations: [Organizations]
    OneOrganization(idOrganization: ID!): Organizations
    AllThemes: [Themes]
    OneTheme(idTheme: ID!): Themes
    AllDraws: [Draws]
    OneDraw(idDraw: ID!): Draws
    AllSizes: [Sizes]
    OneSize(idSize: ID!): Sizes
    AllShirts: [Shirts]
    OneShirt(idShirt: ID!): Shirts
    AllOrderItem: [OrdersItems]
    OneOrderItem(idOrderItem: ID!): OrdersItems
  }

  input userCreateInput {
    lastname: String
    firstname: String
    birthday: Date
    phone: String
    email: String!
    password: String
    address: String
    zipCode: String
    city: String
    role: String
    bio: String
  }

  input updateUserInput {
    lastname: String
    firstname: String
    birthday: Date
    phone: String
    email: String!
    password: String
    address: String
    zipCode: String
    city: String
    role: String
    bio: String
  }

  type UpdateUserResponse {
    message: String
    user: Users
  }
  input createOrganizationInput {
    idOrganization: Int
    name: String
    phone: String
    email: String
    address: String
    zipCode: String
    city: String
    idUser: Int
    siret: String
  }

  input updateOrganizationInput {
    idOrganization: Int
    name: String
    phone: String
    email: String
    address: String
    zipCode: String
    city: String
    idUser: Int
    siret: String
  }
  type UpdateOrganizationResponse {
    message: String
    organization: Organizations
  }
  type DeleteOrganizationResponse {
    message: String
    organization: Organizations
  }

  type Mutation {
    createUser(data: userCreateInput!): Users
    updateUser(idUser: ID!, data: updateUserInput!): UpdateUserResponse
    deleteUser(idUser: ID!): Users
    createOrganization(data: createOrganizationInput!): Organizations
    updateOrganization(
      idOrganization: ID!
      data: updateOrganizationInput!
    ): UpdateOrganizationResponse
    deleteOrganization(idOrganization: ID!): DeleteOrganizationResponse
  }
`;

export default typeDefs;
