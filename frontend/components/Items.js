import React, { Component } from 'react'
import Error from './ErrorMessage'
import Item from './Item'
import Pagination from './Pagination'
import PropTypes from 'prop-types'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { perPage } from '../config'
import styled from 'styled-components'

const ALL_ITEMS_QUERY = gql`
  query ALL_ITEMS_QUERY($skip: Int = 0, $first: Int = ${perPage}) {
    items(skip: $skip, first: $first, orderBy: createdAt_DESC) {
      id
      title
      price
      description
      image
      largeImage
    }
  }
`
const Center = styled.div`
  text-align: center;
`
const ItemsList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 60px;
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
`

class Items extends Component {
  render() {
    const { page } = this.props
    return (
      <Center>
        <Pagination page={page} />
        <Query
          fetchPolicy="cache-and-network"
          query={ALL_ITEMS_QUERY}
          variables={{
            skip: page * perPage - perPage,
          }}
        >
          {({ data, error, loading }) => {
            if (loading) return <p>Wczytywanie...</p>
            if (error) return <Error error={error} />
            return (
              <ItemsList>
                {data.items.map(item => (
                  <Item key={item.id} item={item} page={page}>
                    {item.title}
                  </Item>
                ))}
              </ItemsList>
            )
          }}
        </Query>
        <Pagination page={page} />
      </Center>
    )
  }
}

Items.propTypes = {
  page: PropTypes.number.isRequired,
}

export { Items as default, ALL_ITEMS_QUERY }
