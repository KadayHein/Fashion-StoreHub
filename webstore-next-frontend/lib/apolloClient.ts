import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

export const client = new ApolloClient({
  link: new HttpLink({
    uri: "https://fashion-storehub.onrender.com/graphiql?path=/graphql",
  }),
  cache: new InMemoryCache(),
});