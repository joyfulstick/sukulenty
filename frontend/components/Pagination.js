import React, { Component } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import PaginationStyles from './styles/PaginationStyles'
import PropTypes from 'prop-types'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { perPage } from '../config'
import polishPlural from '../lib/polishPurals'

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
            { page } = this.props,
            nbsp = String.fromCharCode(160)

          let pages = Math.ceil(count / perPage)
          pages = pages <= 0 ? 1 : pages
          const counter = `Strona ${page}${nbsp}z${nbsp}${pages}`

          return (
            <PaginationStyles data-test="pagination">
              <Head>
                <title>Sukulenty! - {counter} </title>
              </Head>
              <Link
                prefetch
                href={{
                  pathname: '/items',
                  query: { page: page - 1 },
                }}
              >
                <a aria-disabled={page <= 1} data-test="prev">
                  ⬅️ Poprzednia
                </a>
              </Link>
              <p data-test="total-pages">{counter}</p>
              <p>
                <span>{count} </span>
                {polishPlural('sukulent', 'sukulenty', 'sukulentów')(count)}
              </p>
              <Link
                prefetch
                href={{
                  pathname: '/items',
                  query: { page: page + 1 },
                }}
              >
                <a aria-disabled={page >= pages} data-test="next">
                  Następna ➡️
                </a>
              </Link>
            </PaginationStyles>
          )
        }}
      </Query>
    )
  }
}

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
}

export { Pagination as default, PAGINATION_QUERY }
