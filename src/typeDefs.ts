import { gql } from 'apollo-server-express';

const typeDefs = gql`
  scalar Date

  type User {
    id_user: ID!
    lastname: String
    firstname: String
    birthday: Date
    phone: String
    email: String!
    hashedPassword: String
    address: String
    zipCode: String
    city: String
    role: String
    bio: String
    Orders: [Orders]
    Organizations: [Organizations]
    Draws: [Draws]
  }

  type Orders {
    id_order: ID!
    price: Float
    date: Date
    address: String
    zipCode: String
    city: String
    id_user: ID!
    user: User
    Shirts: [OrderItem]
  }

  type Organizations {
    id_organisation: ID!
    name: String
    phone: String
    email: String
    address: String
    zipCode: String
    city: String
    id_user: ID!
    user: User
    Draws: [Draws]
  }

  type Themes {
    id_theme: ID!
    name: String
    Draws: [Draws]
  }

  type Draws {
    id_draw: ID!
    name: String
    id_user: ID!
    user: User
    id_organisation: ID!
    organisation: Organizations
    id_theme: ID!
    theme: Themes
    Sizes: [Shirts]
  }

  type Shirts {
    id_shirt: ID!
    price: Float
    id_draw: ID!
    draw: Draws
    id_size: ID!
    size: Sizes
    Orders: [OrderItem]
  }

  type Sizes {
    id_size: ID!
    name: String
    Draws: [Shirts]
  }

  type OrderItem {
    id_orders_has_shirts: ID!
    quantity: Int
    id_shirt: ID!
    shirt: Shirts
    id_order: ID!
    order: Orders
  }

  type Query {
    AllUsers: [User]
    OneUser(id_user: ID!): User
    UserOrganization(id_user: ID!): [Organizations]
    AllOrders: [Orders]
    OneOrder(id_order: ID!): Orders
    AllOrganizations: [Organizations]
    OneOrganization(id_organisation: ID!): Organizations
    AllThemes: [Themes]
    OneTheme(id_theme: ID!): Themes
    AllDraws: [Draws]
    OneDraw(id_drawn: ID!): Draws
    AllSizes: [Sizes]
    OneSize(id_size: ID!): Sizes
    AllShirts: [Shirts]
    OneShirt(id_shirt: ID!): Shirts
    AllOrderItem: [OrderItem]
    OneOrderItem(id_orders_has_shirts: ID!): OrderItem
  }

  input userCreateInput {
    lastname: String
    firstname: String
    birthday: Date
    phone: String
    email: String!
    hashedPassword: String
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
    hashedPassword: String
    address: String
    zipCode: String
    city: String
    role: String
    bio: String
  }

  type UpdateUserResponse {
    message: String
    user: User
  }

  type Mutation {
    createUser(data: userCreateInput!): User
    updateUser(id_user: ID!, data: updateUserInput!): UpdateUserResponse
    deleteUser(id_user: ID!): User
  }
`;

export default typeDefs;
