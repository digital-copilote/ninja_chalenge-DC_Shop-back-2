import { gql } from 'apollo-server-express';
import { authGql } from './auth';
import { drawsGql } from './draws';
import { ordersGql } from './orders';
import { ordersItemsGql } from './ordersItems';
import { organizationsGql } from './organizations';
import { shirtsGql } from './shirts';
import { sizesGql } from './sizes';
import { themesGql } from './themes';
import { usersGql } from './users';

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
  ${authGql}
`;

export default typeDefs;
