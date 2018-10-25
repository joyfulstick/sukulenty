import React, { Component } from 'react'
import Error from './ErrorMessage'
import Item from './Item'
import Pagination from './Pagination'
import PropTypes from 'prop-types'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import styled from 'styled-components'

const ALL_ITEMS_QUERY = gql`
  query ALL_ITEMS_QUERY {
    items {
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
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
`

class Items extends Component {
  render() {
    return (
      <Center>
        <Pagination page={this.props.page} />
        <Query query={ALL_ITEMS_QUERY}>
          {({ data, error, loading }) => {
            if (loading) return <p>Wczytywanie...</p>
            if (error) return <Error error={error} />
            return (
              <ItemsList>
                {data.items.map(item => (
                  <Item key={item.id} item={item}>
                    {item.title}
                  </Item>
                ))}
              </ItemsList>
            )
          }}
        </Query>
        <Pagination page={this.props.page} />
      </Center>
    )
  }
}

export { Items as default, ALL_ITEMS_QUERY }

Items.propTypes = {
  page: PropTypes.number.isRequired,
}
