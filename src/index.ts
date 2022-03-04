import { Application } from 'express';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import typeDefs from './typeDefs/typeDefs';
import { userMutations, userQueries } from './resolvers/users';
import { orderMutations, orderQueries } from './resolvers/orders';
import { ApolloServer } from 'apollo-server-express';
import { organizationMutations, organizationQueries } from './resolvers/organizations';
import { handleError } from './Middleware/errors';
import { drawsMutations, drawsQueries } from './resolvers/draws';
import { orderItemsMutations, orderItemsQueries } from './resolvers/orderItems';
import { sizesMutations, sizesQueries } from './resolvers/sizes';
import { themesMutations, themesQueries } from './resolvers/themes';
import { authMutations } from './resolvers/auth';
import { shirtsMutations, shirtsQueries } from './resolvers/shirts';

dotenv.config();

// More secure like that if port has been forgotten
const port = process.env.PORT || 9000;

const main = async () => {
  const app: Application = express();

  app.use(cors({ origin: '*', credentials: true }));

  app.use(express.json());

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers: {
      Query: {
        ...userQueries,
        ...orderQueries,
        ...organizationQueries,
        ...drawsQueries,
        ...orderItemsQueries,
        ...sizesQueries,
        ...themesQueries,
        ...shirtsQueries,
      },
      Mutation: {
        ...userMutations,
        ...orderMutations,
        ...organizationMutations,
        ...drawsMutations,
        ...orderItemsMutations,
        ...sizesMutations,
        ...themesMutations,
        ...authMutations,
        ...shirtsMutations,
      },
    },
    context: ({ res }) => ({ res }),
  });

  app.use(handleError);

  await apolloServer.start();

  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Server ready at http://localhost:${port}${apolloServer.graphqlPath}`);
  });
};

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.log(err);
});
