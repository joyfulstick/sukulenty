import Error from './ErrorMessage'
import { Query } from 'react-apollo'
import Table from './styles/Table'
import gql from 'graphql-tag'
import StickButton from './styles/StickButton'

const posiblePermissions = [
  'ADMIN',
  'USER',
  'ITEMCREATE',
  'ITEMUPDATE',
  'ITEMCDELATE',
  'PERMISIONUPDATE',
]

const ALL_USERS_QUERY = gql`
  query {
    users {
      id
      name
      email
      permissions
    }
  }
`

const Permissions = props => (
  <Query query={ALL_USERS_QUERY}>
    {({ data, loading, error }) => (
      <>
        <Error error={error} />
        <article>
          <h2>Zarządzaj uprawnieniami</h2>
          <Table>
            <thead>
              <tr>
                <th>Nazwa</th>
                <th>Email</th>
                {posiblePermissions.map(permission => (
                  <th key={permission}>{permission}</th>
                ))}
                <th>👇</th>
              </tr>
            </thead>
            <tbody>
              {data.users.map(user => (
                <UserPermissions key={user.id} user={user} />
              ))}
            </tbody>
          </Table>
        </article>
      </>
    )}
  </Query>
)

class UserPermissions extends React.Component {
  render() {
    const {
      user: { id, name, email },
    } = this.props
    return (
      <tr>
        <td>{name}</td>
        <td>{email}</td>
        {posiblePermissions.map(permission => (
          <td key={`${id}-permission-${permission}`}>
            <label htmlFor={`${id}-permission-${permission}`}>
              <input type="checkbox" />
            </label>
          </td>
        ))}
        <td>
          <StickButton>Zmień</StickButton>
        </td>
      </tr>
    )
  }
}

export default Permissions
