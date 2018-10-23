import PropTypes from 'prop-types'
import UpdateItem from '../components/UpdateItem'

const Update = props => (
  <div>
    <UpdateItem id={props.query.id} />
  </div>
)

export default Update

Update.propTypes = {
  query: PropTypes.object.isRequired,
}
