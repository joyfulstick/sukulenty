import Items from '../components/Items'
import PropTypes from 'prop-types'

const Home = props => <Items page={+props.query.page || 1} />

export default Home

Home.propTypes = {
  query: PropTypes.shape({
    page: PropTypes.string,
  }),
}
