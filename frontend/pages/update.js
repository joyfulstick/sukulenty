import Guard from '../components/Guard'
import PropTypes from 'prop-types'
import UpdateItem from '../components/UpdateItem'

const Update = props => (
  <Guard>
    <UpdateItem id={props.query.id} />
  </Guard>
)

Update.propTypes = {
  query: PropTypes.object.isRequired,
}

export default Update
