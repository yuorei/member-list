import { ApolloClient, InMemoryCache } from "@apollo/client";
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";
import { setContext } from '@apollo/client/link/context';

const url = `${process.env.NEXT_PUBLIC_API_URL}/graphql`

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const uploadLink = createUploadLink({
  uri: url,
});

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(uploadLink),
});
