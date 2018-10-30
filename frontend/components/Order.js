import React, { Component } from 'react'
import Error from './ErrorMessage'
import Head from 'next/head'
import OrderStyles from './styles/OrderStyles'
import PropTypes from 'prop-types'
import { Query } from 'react-apollo'
import { format } from 'date-fns'
import formatMoney from '../lib/formatMoney'
import gql from 'graphql-tag'

const SINGLE_ORDER_QUERY = gql`
  query SINGLE_ORDER_QUERY($id: ID!) {
    order(id: $id) {
      id
      charge
      total
      createdAt
      user {
        id
      }
      items {
        id
        title
        description
        price
        image
        quantity
      }
    }
  }
`

class Order extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
  }
  render() {
    return (
      <Query query={SINGLE_ORDER_QUERY} variables={{ id: this.props.id }}>
        {({ data, error, loading }) => {
          if (error) return <Error error={error} />
          if (loading) return <p>Loading...</p>
          const { order } = data
          return (
            <OrderStyles data-test="order">
              <Head>
                <title>Sukulenty - Zamówienie {order.id}</title>
              </Head>
              <p>
                <span>Nr zamówienia:</span>
                <span>{this.props.id}</span>
              </p>
              <p>
                <span>Nr płatności:</span>
                <span>{order.charge}</span>
              </p>
              <p>
                <span>Data:</span>
                <span>{format(order.createdAt, 'd.MM.yyyy h:mm')}</span>
              </p>
              <p>
                <span>Suma:</span>
                <span>{formatMoney(order.total)}</span>
              </p>
              <p>
                <span>Ilość 🌵</span>
                <span>{order.items.length}</span>
              </p>
              <ul className="items">
                {order.items.map(item => (
                  <li className="order-item" key={item.id}>
                    <img src={item.image} alt={item.title} />
                    <section className="item-details">
                      <h2>{item.title}</h2>
                      <p>Ilość: {item.quantity}</p>
                      <p>Cena za szt.: {formatMoney(item.price)}</p>
                      <p>Razem: {formatMoney(item.price * item.quantity)}</p>
                      <p>{item.description}</p>
                    </section>
                  </li>
                ))}
              </ul>
            </OrderStyles>
          )
        }}
      </Query>
    )
  }
}

export { Order as default, SINGLE_ORDER_QUERY }
