import React, { Component } from 'react'
import Error from '../components/ErrorMessage'
import Form from './styles/Form'
import { Mutation } from 'react-apollo'
import Router from 'next/router'
import formatMoney from '../lib/formatMoney'
import gql from 'graphql-tag'

const CREATE_ITEM_MUTATION = gql`
  mutation CREATE_ITEM_MUTATION(
    $title: String!
    $description: String!
    $price: Int!
    $image: String
    $largeImage: String
  ) {
    createItem(
      title: $title
      description: $description
      price: $price
      image: $image
      largeImage: $largeImage
    ) {
      id
    }
  }
`

class CreateItem extends Component {
  state = {
    title: '',
    description: '',
    price: 0,
    image: '',
    largeImage: '',
  }

  handleChange = e => {
    const { name, type, value } = e.target
    const val = Object.is(type, 'number') ? +value : value
    this.setState({ [name]: val })
  }

  // hendleSubmit = async e => {
  //   e.preventDefault()
  //   const res = await createItem()
  //   console.log(res)
  // }

  render() {
    const {
      state: { title, price, description, image, largeImage },
      handleChange,
      hendleSubmit,
    } = this
    return (
      <Mutation mutation={CREATE_ITEM_MUTATION} variables={this.state}>
        {(createItem, { loading, error }) => (
          <Form
            onSubmit={async e => {
              e.preventDefault()
              const res = await createItem()
              Router.push({
                pathname: '/item',
                query: { id: res.data.createItem.id },
              })
            }}
          >
            <Error error={error} />
            <fieldset disabled={loading} aria-busy={loading}>
              <label htmlFor="title">
                Nazwa
                <input
                  type="text"
                  name="title"
                  id="title"
                  placeholder="Nazwa"
                  value={title}
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
                  value={price}
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
                  value={description}
                  onChange={handleChange}
                  required
                />
              </label>
              <button type="submit">Dodaj</button>
            </fieldset>
          </Form>
        )}
      </Mutation>
    )
  }
}

export { CreateItem as default, CREATE_ITEM_MUTATION }
