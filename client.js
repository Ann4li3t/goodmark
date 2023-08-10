import { ApolloClient, InMemoryCache } from "@apollo/client"
import { relayStylePagination } from "@apollo/client/utilities"

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        products: relayStylePagination(),
        productsCategories: {
          keyArgs: false, 
        },
      },
    },
  },
});

export const client = new ApolloClient({
  uri: process.env.WP_GRAPHQL_URL,
  cache,
});