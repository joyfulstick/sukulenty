import Error from './ErrorMessage'
import { Query } from 'react-apollo'
import React from 'react'
import Table from './styles/Table'
import UserPermissions from './UserPermissions'
import gql from 'graphql-tag'

const posiblePermissions = [
  'ADMIN',
  'USER',
  'ITEMCREATE',
  'ITEMUPDATE',
  'ITEMDELETE',
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

const Permissions = () => (
  <Query query={ALL_USERS_QUERY}>
    {({ data, error }) => (
      <>
        <Error error={error} />
        {data &&
          data.users && (
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
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {data.users.map(user => (
                    <UserPermissions
                      key={user.id}
                      user={user}
                      posiblePermissions={posiblePermissions}
                    />
                  ))}
                </tbody>
              </Table>
            </article>
          )}
      </>
    )}
  </Query>
)

export default Permissions
