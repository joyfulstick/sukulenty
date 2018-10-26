import PropTypes from 'prop-types'
import SingleItem from '../components/SingleItem'

const Item = props => <SingleItem id={props.query.id} />

export default Item

Item.propTypes = {
  query: PropTypes.object.isRequired,
}
