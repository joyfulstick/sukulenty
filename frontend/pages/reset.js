import PropTypes from 'prop-types'
import Reset from '../components/Reset'

const ResetPage = props => <Reset resetToken={props.query.resetToken} />

export default ResetPage

ResetPage.propTypes = {
  query: PropTypes.object.isRequired,
}
