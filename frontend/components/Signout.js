import { CURRENT_USER_QUERY } from './User'
import { Mutation } from 'react-apollo'
import React from 'react'
import gql from 'graphql-tag'

const SIGN_OUT_MUTATION = gql`
  mutation SIGN_OUT_MUTATION {
    signout {
      message
    }
  }
`
const Signout = () => (
  <Mutation
    mutation={SIGN_OUT_MUTATION}
    refetchQueries={[{ query: CURRENT_USER_QUERY }]}
  >
    {signout => <button onClick={signout}>Wylogowanie</button>}
  </Mutation>
)

export default Signout
