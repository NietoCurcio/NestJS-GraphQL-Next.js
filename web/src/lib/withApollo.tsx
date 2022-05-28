import {
  ApolloClient,
  createHttpLink,
  from,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import { GetServerSidePropsContext, NextPage } from 'next';
import { ApolloProvider } from '@apollo/client';
import { parseCookies } from 'nookies';

export type ApolloClientContext = GetServerSidePropsContext;

export function getApolloClient(
  ctx?: ApolloClientContext,
  ssrCache?: NormalizedCacheObject
) {
  const cookies = parseCookies(ctx);
  const { 'cognito.accessToken': accessToken } = cookies;

  const httpLink = createHttpLink({
    uri: 'http://localhost:3332/graphql',
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
    fetch,
  });

  const cache = new InMemoryCache().restore(ssrCache ?? {});

  return new ApolloClient({
    link: from([httpLink]),
    cache,
  });
}

// HOC - High Order Component
// ApolloProvider is used only per page, and not around the whole app in _app.tsx
export const withApollo = (Component: NextPage) => {
  return function Provider(props: any) {
    return (
      <ApolloProvider client={getApolloClient(undefined, props.apolloState)}>
        <Component {...props} />
      </ApolloProvider>
    );
  };
};
