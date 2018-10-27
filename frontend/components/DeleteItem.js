import {
  API_KEY,
  createSignature,
  getPublicId,
  timestamp,
} from '../lib/cloudinaryUtils'
import React, { Component } from 'react'
import { ALL_ITEMS_QUERY } from './Items'
import { Mutation } from 'react-apollo'
import { PAGINATION_QUERY } from './Pagination'
import PropTypes from 'prop-types'
import gql from 'graphql-tag'
import { perPage } from '../config'

const DELETE_ITEM_MUTATION = gql`
  mutation DELETE_ITEM_MUTATION($id: ID!) {
    deleteItem(id: $id) {
      id
    }
  }
`

class DeleteItem extends Component {
  destroyFile = () => {
    const { image } = this.props
    const body = new FormData()
    body.append('timestamp', timestamp)
    body.append('public_id', getPublicId(image))
    body.append('api_key', API_KEY)
    body.append('signature', createSignature(image))

    fetch('https://api.cloudinary.com/v1_1/joyfulstick/image/destroy', {
      method: 'POST',
      body,
    })
  }

  render() {
    const {
      props: { children, id, page },
    } = this
    return (
      <Mutation
        mutation={DELETE_ITEM_MUTATION}
        variables={{ id }}
        refetchQueries={[
          {
            query: ALL_ITEMS_QUERY,
            variables: {
              skip: page * perPage - perPage,
            },
          },
          { query: PAGINATION_QUERY },
        ]}
      >
        {deleteItem => (
          <button
            onClick={() => {
              if (confirm('Czy na pewno chcesz usunąć przedmiot?')) {
                deleteItem()
                this.destroyFile()
              }
            }}
          >
            {children}
          </button>
        )}
      </Mutation>
    )
  }
}

DeleteItem.propTypes = {
  id: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
}

export default DeleteItem
