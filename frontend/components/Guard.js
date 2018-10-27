import { CURENT_USER_QUERY } from './User'
import { Query } from 'react-apollo'
import Signin from './Signin'

const Guard = props => (
  <Query query={CURENT_USER_QUERY}>
    {({ data, loading }) => {
      if (loading) return <p>Loading...</p>
      if (!data.me) {
        return (
          <article>
            <h3>Proszę zaloguj się</h3>
            <Signin />
          </article>
        )
      }
      return props.children
    }}
  </Query>
)

export default Guard
