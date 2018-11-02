import { Mutation, Query } from 'react-apollo'
import React, { Component } from 'react'
import Error from './ErrorMessage'
import Form from './styles/Form'
import PropTypes from 'prop-types'
import Router from 'next/router'
import gql from 'graphql-tag'

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    item(where: { id: $id }) {
      id
      title
      description
      price
    }
  }
`

const UPDATE_ITEM_MUTATION = gql`
  mutation UPDATE_ITEM_MUTATION(
    $id: ID!
    $title: String
    $description: String
    $price: Int
  ) {
    updateItem(
      id: $id
      title: $title
      description: $description
      price: $price
    ) {
      id
      title
      description
      price
    }
  }
`

class UpdateItem extends Component {
  state = {}

  handleChange = e => {
    const { name, type, value } = e.target
    const val = Object.is(type, 'number') ? +value : value
    this.setState({ [name]: val })
  }

  handleUpdateItem = async (e, updateItem) => {
    e.preventDefault()
    const {
      props: { id },
      state,
    } = this
    updateItem({
      variables: {
        id,
        ...state,
      },
    })
      .then(val => {
        if (val) {
          Router.push({
            pathname: '/item',
            query: { id },
          })
        }
      })
      .catch(err => {
        console.log(err) // eslint-disable-line
      })
  }

  render() {
    const {
      props: { id },
      handleUpdateItem,
      handleChange,
    } = this
    return (
      <Query
        query={SINGLE_ITEM_QUERY}
        variables={{
          id,
        }}
      >
        {({ data, loading }) => {
          if (loading) return <p>Wczytywanie...</p>
          if (!data.item) return <p>Nie znaleziono przedmiotu o ID {id}</p>
          return (
            <Mutation mutation={UPDATE_ITEM_MUTATION}>
              {(updateItem, { loading, error }) => (
                <Form onSubmit={e => handleUpdateItem(e, updateItem)}>
                  <Error error={error} />
                  <fieldset disabled={loading} aria-busy={loading}>
                    <label htmlFor="title">
                      Nazwa
                      <input
                        type="text"
                        name="title"
                        id="title"
                        placeholder="Nazwa"
                        defaultValue={data.item.title}
                        onChange={handleChange}
                        required
                      />
                    </label>
                    <label htmlFor="price">
                      Cena
                      <input
                        type="number"
                        name="price"
                        id="price"
                        placeholder="Cena"
                        defaultValue={data.item.price}
                        min="0"
                        onChange={handleChange}
                        required
                      />
                    </label>
                    <label htmlFor="description">
                      Dodaj opis
                      <textarea
                        name="description"
                        id="description"
                        placeholder="Dodaj opis"
                        defaultValue={data.item.description}
                        onChange={handleChange}
                        required
                      />
                    </label>
                    <button type="submit">
                      Zapi
                      {loading ? 'uje' : 'sz'}
                    </button>
                  </fieldset>
                </Form>
              )}
            </Mutation>
          )
        }}
      </Query>
    )
  }
}

UpdateItem.propTypes = {
  id: PropTypes.string.isRequired,
}

export { UpdateItem as default, UPDATE_ITEM_MUTATION }
