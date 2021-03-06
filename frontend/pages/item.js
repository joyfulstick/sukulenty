import PropTypes from 'prop-types'
import SingleItem from '../components/SingleItem'

const Item = props => <SingleItem id={props.query.id} />

Item.propTypes = {
  query: PropTypes.object.isRequired,
}

export default Item
