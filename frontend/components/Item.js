import React, { Component } from 'react'
import DeleteItem from './DeleteItem'
import ItemStyles from './styles/ItemStyles'
import Link from 'next/link'
import PriceTag from './styles/PriceTag'
import PropTypes from 'prop-types'
import Title from './styles/Title'
import formatMoney from '../lib/formatMoney'

class Item extends Component {
  render() {
    const {
      item: { id, title, price, description, image },
    } = this.props
    return (
      <ItemStyles>
        {image && <img src={image} alt={title} />}
        <Title>
          <Link
            href={{
              pathname: '/item',
              query: { id },
            }}
          >
            <a>{title}</a>
          </Link>
        </Title>
        <PriceTag>{formatMoney(price)}</PriceTag>
        <p>{description}</p>
        <div className="buttonList">
          <Link
            href={{
              pathname: 'update',
              query: { id },
            }}
          >
            <a>Edytuj 📝</a>
          </Link>
          <button>🛒 Dodaj do koszyka</button>
          <DeleteItem id={id} image={image}>❎ Usuń przedmiot</DeleteItem>
        </div>
      </ItemStyles>
    )
  }
}

Item.propTypes = {
  item: PropTypes.object.isRequired,
}

export default Item
