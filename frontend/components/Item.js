import React, { Component } from 'react'
import AddToCart from './AddToCart'
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
      page,
    } = this.props
    return (
      <ItemStyles>
        <Link
          href={{
            pathname: '/item',
            query: { id },
          }}
        >
          <a>
            {image && <img src={image} alt={title} />}
            <Title>
              <h3>{title}</h3>
            </Title>
            <PriceTag>{formatMoney(price)}</PriceTag>
            <p>{description}</p>
          </a>
        </Link>
        <div className="buttonList">
          <Link
            href={{
              pathname: '/update',
              query: { id },
            }}
          >
            <a>Edytuj 📝</a>
          </Link>
          <AddToCart id={id} />
          <DeleteItem id={id} image={image} page={page}>
            ❎ Usuń przedmiot
          </DeleteItem>
        </div>
      </ItemStyles>
    )
  }
}

Item.propTypes = {
  item: PropTypes.object.isRequired,
  page: PropTypes.number.isRequired,
}

export default Item
