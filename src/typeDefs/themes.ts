export const themesGql = `
type Themes {
    idTheme: ID!
    name: String
    draws: [Draws]
  }

  type Query {
    AllThemes: [Themes]
    OneTheme(idTheme: ID!): Themes
  }

  input themeCreateInput {
    idTheme: ID
    name: String
  }

  input updateThemeInput {
    idTheme: ID
    name: String
  }

  type UpdateThemeResponse {
    message: String
    theme: Themes
  }
  type DeleteThemeResponse {
    message: String
    theme: Themes
  }

  type Mutation {
     createTheme(data: themeCreateInput!): Themes
    updateTheme(idTheme: ID!, data: updateThemeInput!): UpdateThemeResponse
    deleteTheme(idTheme: ID!): DeleteThemeResponse
  }
`;
