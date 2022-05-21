import {
  ApolloClient,
  createHttpLink,
  from,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client'
import { GetServerSidePropsContext, NextPage } from 'next'
import { ApolloProvider } from '@apollo/client'

export type ApolloClientContext = GetServerSidePropsContext

export function getApolloClient(
  ctx?: ApolloClientContext,
  ssrCache?: NormalizedCacheObject
) {
  const httpLink = createHttpLink({
    uri: 'http://localhost:3332/graphql',
    fetch,
  })

  const cache = new InMemoryCache().restore(ssrCache ?? {})

  return new ApolloClient({
    link: from([httpLink]),
    cache,
  })
}

// HOC - High Order Component
export const withApollo = (Component: NextPage) => {
  return function Provider(props: any) {
    return (
      <ApolloProvider client={getApolloClient(undefined, props.apolloState)}>
        <Component {...props} />
      </ApolloProvider>
    )
  }
}
