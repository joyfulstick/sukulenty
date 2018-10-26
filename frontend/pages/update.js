import PropTypes from 'prop-types'
import UpdateItem from '../components/UpdateItem'

const Update = props => <UpdateItem id={props.query.id} />

export default Update

Update.propTypes = {
  query: PropTypes.object.isRequired,
}
