import PropTypes from 'prop-types'
import UpdateItem from '../components/UpdateItem'

const Update = props => <UpdateItem id={props.query.id} />

Update.propTypes = {
  query: PropTypes.object.isRequired,
}

export default Update
