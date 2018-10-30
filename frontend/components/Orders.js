import React, { Component } from 'react'
import Error from './ErrorMessage'
import Link from 'next/link'
import OrderItemStyles from './styles/OrderItemStyles'
import { Query } from 'react-apollo'
import {
  format,
  // formatDistance
} from 'date-fns'
import formatMoney from '../lib/formatMoney'
import gql from 'graphql-tag'
import polishPlural from '../lib/polishPurals'
import styled from 'styled-components'

const USER_ORDERS_QUERY = gql`
  query USER_ORDERS_QUERY {
    orders(orderBy: createdAt_DESC) {
      id
      total
      createdAt
      items {
        id
        title
        price
        description
        quantity
        image
      }
    }
  }
`

const OrderUl = styled.ul`
  display: grid;
  grid-gap: 4rem;
  grid-template-columns: repeat(auto-fit, minmax(40%, 1fr));
`

class Orders extends Component {
  render() {
    return (
      <Query query={USER_ORDERS_QUERY}>
        {({ data: { orders }, loading, error }) => {
          if (loading) return <p>Wczytywanie...</p>
          if (error) return <Error erorr={error} />
          return (
            <section>
              <h2>
                Masz {orders.length}{' '}
                {polishPlural('zamówienie', 'zamówienia', 'zamówień')(
                  orders.length,
                )}
              </h2>
              <OrderUl>
                {orders.map(order => (
                  <OrderItemStyles key={order.id}>
                    <Link
                      href={{
                        pathname: '/order',
                        query: { id: order.id },
                      }}
                    >
                      <a>
                        <div className="order-meta">
                          <p>
                            {format(order.createdAt, 'd.MM.yyyy')}
                            {/* {formatDistance(order.createdAt, new Date())} */}
                          </p>
                          <p>
                            {order.items.reduce((a, b) => a + b.quantity, 0)}
                            🌵
                          </p>
                          <p>{formatMoney(order.total)}</p>
                        </div>
                        <figure className="images">
                          {order.items.map(item => (
                            <img
                              key={item.id}
                              src={item.image}
                              alt={item.title}
                            />
                          ))}
                        </figure>
                      </a>
                    </Link>
                  </OrderItemStyles>
                ))}
              </OrderUl>
            </section>
          )
        }}
      </Query>
    )
  }
}

export default Orders
