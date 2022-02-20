export const organizationsGql = `
type Organizations {
    idOrganization: ID!
    name: String
    phone: String
    email: String
    address: String
    zipCode: String
    city: String
	siret: String
    idUser: ID!
    user: Users
    draws: [Draws]
  }

  type Query {
    AllOrganizations: [Organizations]
    OneOrganization(idOrganization: ID!): Organizations
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
    createOrganization(data: createOrganizationInput!): Organizations
    updateOrganization(
      idOrganization: ID!
      data: updateOrganizationInput!
    ): UpdateOrganizationResponse
    deleteOrganization(idOrganization: ID!): DeleteOrganizationResponse
  }
`;
