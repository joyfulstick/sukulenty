import React, { Component } from 'react'
import { CURRENT_USER_QUERY } from './User'
import { Mutation } from 'react-apollo'
import PropTypes from 'prop-types'
import gql from 'graphql-tag'
import styled from 'styled-components'

const REMOVE_FROM_CART_MUTATION = gql`
  mutation REMOVE_FROM_CART_MUTATION($id: ID!) {
    removeFromCart(id: $id) {
      id
    }
  }
`

const BigButton = styled.button`
  font-size: 3rem;
  background: none;
  border: 0;
  &:hover {
    color: ${props => props.theme.green};
    cursor: pointer;
  }
`

class RemoveFromCart extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
  }

  update = (cache, payload) => {
    const data = { ...cache.readQuery({ query: CURRENT_USER_QUERY }) }
    const { id } = payload.data.removeFromCart
    data.me.cart = data.me.cart.filter(item => !Object.is(item.id, id))
    cache.writeQuery({ query: CURRENT_USER_QUERY, data })
  }
  render() {
    const {
      props: { id },
      update,
    } = this
    return (
      <Mutation
        mutation={REMOVE_FROM_CART_MUTATION}
        variables={{ id }}
        update={update}
        optimisticResponse={{
          __typename: 'Mutation',
          removeFromCart: {
            __typename: 'CartItem',
            id,
          },
        }}
      >
        {(removeFromCart, { loading }) => (
          <BigButton
            disabled={loading}
            onClick={() => {
              removeFromCart().catch(err => alert(err.message))
            }}
            title="Delete Item"
          >
            &times;
          </BigButton>
        )}
      </Mutation>
    )
  }
}

export { RemoveFromCart as default, REMOVE_FROM_CART_MUTATION }
