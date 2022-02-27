export const usersGql = `
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
  
  type Query {
    AllUsers: [Users]
	AllArtists(role: String): [Users]
    OneUser(idUser: ID!): Users
    UserOrganization(idUser: ID!): [Organizations]
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

  type Mutation {
    createUser(data: userCreateInput!): Users
    updateUser(idUser: ID!, data: updateUserInput!): UpdateUserResponse
    deleteUser(idUser: ID!): Users
  }
`;
