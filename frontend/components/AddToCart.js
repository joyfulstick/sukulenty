import { CURRENT_USER_QUERY } from './User'
import { Mutation } from 'react-apollo'
import PropTypes from 'prop-types'
import React from 'react'
import gql from 'graphql-tag'

const ADD_TO_CART_MUTATION = gql`
  mutation ADD_TO_CART_MUTATION($id: ID!) {
    addToCart(id: $id) {
      id
      quantity
    }
  }
`

class AddToCart extends React.Component {
  static propTypes = {
    id: PropTypes.string,
  }
  render() {
    const { id } = this.props
    return (
      <Mutation
        mutation={ADD_TO_CART_MUTATION}
        variables={{
          id,
        }}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {(addToCart, { loading }) => (
          <button
            disabled={loading}
            onClick={() => addToCart(id).catch(err => alert(err.message))}
          >
            🛒 Dodaj
            {loading && 'e'} do Koszyka
          </button>
        )}
      </Mutation>
    )
  }
}

export { AddToCart as default, ADD_TO_CART_MUTATION }
