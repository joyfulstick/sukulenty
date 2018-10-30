import React, { Component } from 'react'
import User, { CURRENT_USER_QUERY } from './User'
import { Mutation } from 'react-apollo'
import NProgress from 'nprogress'
import Router from 'next/router'
import StripeCheckout from 'react-stripe-checkout'
import calcTotalPrice from '../lib/calcTotalPrice'
import gql from 'graphql-tag'
import totalItems from '../lib/calcTotalItems'

const CREATE_ORDER_MUTATION = gql`
  mutation CREATE_ORDER_MUTATION($token: String!) {
    createOrder(token: $token) {
      id
      charge
      total
      items {
        id
        title
      }
    }
  }
`
class Checkout extends Component {
  onToken = async (res, createOrder) => {
    NProgress.start()
    const order = await createOrder({
      variables: {
        token: res.id,
      },
    }).catch(err => {
      alert(err.message)
    })
    Router.push({
      pathname: '/order',
      query: { id: order.data.createOrder.id },
    })
  }
  render() {
    return (
      <User>
        {({ data: { me }, loading }) => {
          if (loading) return null
          return (
            <Mutation
              mutation={CREATE_ORDER_MUTATION}
              refetchQueries={[{ query: CURRENT_USER_QUERY }]}
            >
              {createOrder => (
                <StripeCheckout
                  amount={calcTotalPrice(me.cart)}
                  name="Sukulenty"
                  description={`Zamów ${totalItems(me.cart)} 🌵`}
                  image={
                    me.cart.length && me.cart[0].item && me.cart[0].item.image
                  }
                  stripeKey="pk_test_t4mGEh7bAv5jkeCup9hmqTae"
                  currency="PLN"
                  panelLabel="Zapłać"
                  email={me.email}
                  token={res => this.onToken(res, createOrder)}
                  allowRememberMe={false}
                >
                  {this.props.children}
                </StripeCheckout>
              )}
            </Mutation>
          )
        }}
      </User>
    )
  }
}

export { Checkout as default, CREATE_ORDER_MUTATION }
