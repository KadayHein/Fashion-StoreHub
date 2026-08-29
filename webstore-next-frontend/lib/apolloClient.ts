import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const PUBLIC_GRAPHQL_URL = "https://fashion-storehub.onrender.com/graphql"
const LOCAL_GRAPHQL_URL = "http://localhost:8080/graphql"

export const client = new ApolloClient({
  link: new HttpLink({
    uri: PUBLIC_GRAPHQL_URL,
  }),
  cache: new InMemoryCache(),
});