import React, { Component } from 'react'
import { ALL_ITEMS_QUERY } from '../pages/items'
import { Mutation } from 'react-apollo'
import PropTypes from 'prop-types'
import gql from 'graphql-tag'

const DELETE_ITEM_MUTATION = gql`
  mutation DELETE_ITEM_MUTATION($id: ID!) {
    deleteItem(id: $id) {
      id
    }
  }
`

class DeleteItem extends Component {
  update = (cache, payload) => {
    const data = { ...cache.readQuery({ query: ALL_ITEMS_QUERY }) }
    data.items = data.items.filter(
      item => !Object.is(item.id, payload.data.deleteItem.id),
    )
    cache.writeQuery({ query: ALL_ITEMS_QUERY, data })
  }

  render() {
    const {
      props: { children, id },
      update,
    } = this
    return (
      <Mutation
        mutation={DELETE_ITEM_MUTATION}
        variables={{ id }}
        update={update}
      >
        {deleteItem => (
          <button
            onClick={() => {
              if (confirm('Czy na pewno chcesz usunąć przedmiot?')) {
                deleteItem()
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

export default DeleteItem

DeleteItem.propTypes = {
  id: PropTypes.string.isRequired,
}
