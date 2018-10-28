import { CURRENT_USER_QUERY } from './User'
import { Query } from 'react-apollo'
import Signin from './Signin'

const Guard = props => (
  <Query query={CURRENT_USER_QUERY}>
    {({ data, loading }) => {
      if (loading) return <p>Loading...</p>
      if (!data.me) {
        return (
          <div>
            <h3>Proszę zaloguj się</h3>
            <Signin />
          </div>
        )
      }
      return props.children
    }}
  </Query>
)

export default Guard
