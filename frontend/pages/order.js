import Guard from '../components/Guard'
import Order from '../components/Order'
import PropTypes from 'prop-types'

const OrderPage = props => (
  <Guard>
    <Order id={props.query.id} />
  </Guard>
)

OrderPage.propTypes = {
  query: PropTypes.object.isRequired,
}

export default OrderPage
