import { ApolloClient, InMemoryCache, makeVar } from '@apollo/client'
// import { GET_FAVORITES } from './queries'

export const favoritesVars = makeVar([])

const client = new ApolloClient({
  uri: 'http://localhost:5000',
  cache: new InMemoryCache({})
})

export default client