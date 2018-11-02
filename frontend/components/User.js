import PropTypes from 'prop-types'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

const CURRENT_USER_QUERY = gql`
  query {
    me {
      id
      email
      name
      permissions
      orders {
        id
      }
      cart {
        id
        quantity
        item {
          id
          title
          price
          image
        }
      }
    }
  }
`
const User = props => (
  <Query query={CURRENT_USER_QUERY} {...props}>
    {payload => props.children(payload)}
  </Query>
)

User.propTypes = {
  children: PropTypes.func.isRequired,
}

export { User as default, CURRENT_USER_QUERY }
