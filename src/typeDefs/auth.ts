export const authGql = `
type Auth {
    email: String!
	password: String!
  }

  input loggedInCreateInput {
    email: String!
	password: String!
  }

  type Mutation {
    loggedIn(data: loggedInCreateInput!): Users
  }
`;
