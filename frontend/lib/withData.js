import { endpoint, endpointProd } from '../config'
import ApolloClient from 'apollo-boost'
import { LOCAL_STATE_QUERY } from '../components/Cart'
import withApollo from 'next-with-apollo'

function createClient({ headers }) {
  return new ApolloClient({
    uri: process.env.NODE_ENV === 'development' ? endpoint : endpointProd,
    request: operation => {
      operation.setContext({
        fetchOptions: {
          credentials: 'include',
        },
        headers,
      })
    },
    clientState: {
      resolvers: {
        Mutation: {
          toggleCart(_, variables, { cache }) {
            const { cartOpen } = cache.readQuery({
              query: LOCAL_STATE_QUERY,
            })
            const data = {
              data: { cartOpen: !cartOpen },
            }
            cache.writeData(data)
            return data
          },
        },
      },
      defaults: {
        cartOpen: false,
      },
    },
  })
}

export default withApollo(createClient)
