import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

export const client = new ApolloClient({
  link: new HttpLink({
    uri: "https://fashion-storehub.onrender.com/graphql",
  }),
  cache: new InMemoryCache(),
});