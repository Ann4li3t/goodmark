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
  uri: process.env.NEXT_PUBLIC_GRAPHQL_DOMAIN,
  cache,
});