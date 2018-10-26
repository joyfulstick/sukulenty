import React, { Component } from 'react'
import { ALL_ITEMS_QUERY } from './Items'
import Error from '../components/ErrorMessage'
import Form from './styles/Form'
import { Mutation } from 'react-apollo'
import { PAGINATION_QUERY } from './Pagination'
import Router from 'next/router'
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

  uploadFile = async e => {
    const [file] = e.target.files
    if (!file) return
    const body = new FormData()
    body.append('file', file)
    body.append('upload_preset', 'stickfits')
    const res = await fetch(
      'https://api.cloudinary.com/v1_1/joyfulstick/image/upload',
      { method: 'POST', body },
    )
    const img = await res.json()
    this.setState({
      image: img.secure_url,
      largeImage: img.eager[0].secure_url,
    })
  }

  render() {
    const {
      state: { title, price, description, image },
      handleChange,
      uploadFile,
    } = this
    return (
      <Mutation
        mutation={CREATE_ITEM_MUTATION}
        variables={this.state}
        refetchQueries={[
          { query: ALL_ITEMS_QUERY },
          { query: PAGINATION_QUERY },
        ]}
      >
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
              <label htmlFor="file">
                Zdjęcie
                {!image ? (
                  <input
                    type="file"
                    name="file"
                    id="file"
                    placeholder="Dodaj zdjęcie"
                    onChange={uploadFile}
                    required
                  />
                ) : (
                  <img
                    width="200"
                    src={image}
                    alt="Podląd przesłanego zdjęcia"
                  />
                )}
              </label>
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
                  value={description}
                  onChange={handleChange}
                  required
                />
              </label>
              <button type="submit" disabled={!image || !title || !description}>
                Dodaj
                {loading ? 'e' : ''}
              </button>
            </fieldset>
          </Form>
        )}
      </Mutation>
    )
  }
}

export { CreateItem as default, CREATE_ITEM_MUTATION }
