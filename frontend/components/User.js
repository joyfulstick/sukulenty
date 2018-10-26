import PropTypes from 'prop-types'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

const CURENT_USER_QUERY = gql`
  query {
    me {
      id
      email
      name
      permissions
    }
  }
`
const User = props => (
  <Query query={CURENT_USER_QUERY} {...props}>
    {payload => props.children(payload)}
  </Query>
)

User.propTypes = {
  children: PropTypes.func.isRequired,
}

export { User as default, CURENT_USER_QUERY }
