import React, { Component } from 'react'
import Error from './ErrorMessage'
import Head from 'next/head'
import PropTypes from 'prop-types'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import styled from 'styled-components'

const SingleItemStyles = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  box-shadow: ${props => props.theme.boxShadow};
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  min-height: 360px;
  @media (max-width: 700px) {
    grid-auto-flow: row;
  }
  img {
    padding-top: 5em;
    width: 100%;
    object-fit: contain;
  }
  .details {
    margin: 3rem;
    font-size: 2rem;
  }
`

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    item(where: { id: $id }) {
      id
      title
      description
      largeImage
    }
  }
`

class SingleItem extends Component {
  render() {
    return (
      <Query
        query={SINGLE_ITEM_QUERY}
        variables={{
          id: this.props.id,
        }}
      >
        {({ error, loading, data }) => {
          if (error) return <Error error={error} />
          if (loading) return <p>Wczytywanie...</p>
          if (!data.item) {
            return <p>Nie znaleziono 🌵 dla id ${this.props.id}</p>
          }
          const { title, description, largeImage } = data.item
          return (
            <SingleItemStyles>
              <Head>
                <title>Sukulenty | {title}</title>
              </Head>
              <img src={largeImage} alt={title} />
              <article className="details">
                <h2>{title}</h2>
                <p>{description}</p>
              </article>
            </SingleItemStyles>
          )
        }}
      </Query>
    )
  }
}

SingleItem.propTypes = {
  id: PropTypes.string.isRequired,
}

export { SingleItem as default, SINGLE_ITEM_QUERY }
