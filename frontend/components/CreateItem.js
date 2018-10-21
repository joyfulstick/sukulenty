import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import Form from './styles/Form'
// import formatMoney from '../lib/formatMoney'

class CreateItem extends Component {
  state = {
    title: '',
    description: '',
    image: '',
    largeImage: '',
    price: 0,
  }
  render() {
    const { title, description, image, largeImage, price } = this.state
    return (
      <Form>
        <fieldset>
          <label htmlFor="title">
            Nazwa
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Nazwa"
              value={title}
              required
            />
          </label>
        </fieldset>
      </Form>
    )
  }
}

export default CreateItem
