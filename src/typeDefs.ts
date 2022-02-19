import { gql } from 'apollo-server-express';
import { drawsGql } from './typeDefs/draws';
import { ordersGql } from './typeDefs/orders';
import { ordersItemsGql } from './typeDefs/ordersItems';
import { organizationsGql } from './typeDefs/organizations';
import { shirtsGql } from './typeDefs/shirts';
import { sizesGql } from './typeDefs/sizes';
import { themesGql } from './typeDefs/themes';
import { usersGql } from './typeDefs/users';

const typeDefs = gql`
  scalar Date
  ${usersGql}
  ${ordersGql}
  ${organizationsGql}
  ${themesGql}
  ${drawsGql}
  ${sizesGql}
  ${ordersItemsGql}
  ${shirtsGql}
`;

export default typeDefs;
