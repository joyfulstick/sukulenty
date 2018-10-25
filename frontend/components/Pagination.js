import React, { Component } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import PaginationStyles from './styles/PaginationStyles'
import PropTypes from 'prop-types'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { perPage } from '../config'

const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY {
    itemsConnection {
      aggregate {
        count
      }
    }
  }
`

class Pagination extends Component {
  render() {
    return (
      <Query query={PAGINATION_QUERY}>
        {({ data, loading }) => {
          if (loading) return <p>Wczytywanie...</p>

          const { count } = data.itemsConnection.aggregate,
            pages = Math.ceil(count / perPage),
            { page } = this.props,
            counter = `Strona ${page}${String.fromCharCode(
              160,
            )}z${String.fromCharCode(160)}${pages}`

          return (
            <PaginationStyles>
              <Head>
                <title>Stick Fits! - {counter} </title>
              </Head>
              <Link
                prefetch
                href={{
                  pathname: 'items',
                  query: { page: page - 1 },
                }}
              >
                <a aria-disabled={page <= 1}>⬅️ Poprzednia</a>
              </Link>
              <p>{counter}</p>
              <p>{count} przedmiotów</p>
              <Link
                prefetch
                href={{
                  pathname: 'items',
                  query: { page: page + 1 },
                }}
              >
                <a aria-disabled={page >= pages}>Następna ➡️</a>
              </Link>
            </PaginationStyles>
          )
        }}
      </Query>
    )
  }
}

export default Pagination

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
}
