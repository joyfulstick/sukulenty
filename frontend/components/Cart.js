import { Mutation, Query } from 'react-apollo'
import CartItem from './CartItem'
import CartStyles from './styles/CartStyles'
import CloseButton from './styles/CloseButton'
import React from 'react'
import StickButton from './styles/StickButton'
import Supreme from './styles/Supreme'
import User from './User'
import { adopt } from 'react-adopt'
import calcTotalPrice from '../lib/calcTotalPrice'
import formatMoney from '../lib/formatMoney'
import gql from 'graphql-tag'

const LOCAL_STATE_QUERY = gql`
  query {
    cartOpen @client
  }
`

const TOGGLE_CART_MUTATION = gql`
  mutation {
    toggleCart @client
  }
`
/* eslint-disable */
const Composed = adopt({
  user: ({ render }) => <User>{render}</User>,
  toggleCart: ({ render }) => (
    <Mutation mutation={TOGGLE_CART_MUTATION}>{render}</Mutation>
  ),
  localState: ({ render }) => <Query query={LOCAL_STATE_QUERY}>{render}</Query>,
})
/* eslint-enable */

const Cart = () => (
  <Composed>
    {({ user, toggleCart, localState }) => {
      const { me } = user.data
      if (!me) return null
      return (
        <CartStyles open={localState.data.cartOpen}>
          <header>
            <CloseButton onClick={toggleCart} title="close">
              &times;
            </CloseButton>
            <Supreme>{me.name}</Supreme>
            <p>Masz {me.cart.length} 🌵 w koszyku</p>
          </header>
          <ul>
            {me.cart.map(cartItem => (
              <CartItem key={cartItem.id} cartItem={cartItem} />
            ))}
          </ul>
          <footer>
            <p>{formatMoney(calcTotalPrice(me.cart))}</p>
            {me.cart.length && <StickButton>Zapłać</StickButton>}
          </footer>
        </CartStyles>
      )
    }}
  </Composed>
)

export { Cart as default, LOCAL_STATE_QUERY, TOGGLE_CART_MUTATION }
