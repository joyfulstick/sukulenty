import React, { Component } from 'react'
import Error from './ErrorMessage'
import { Mutation } from 'react-apollo'
import PropTypes from 'prop-types'
import StickButton from './styles/StickButton'
import gql from 'graphql-tag'

const UPDATE_PERMISSIONS_MUTATION = gql`
  mutation UPDATE_PERMISSIONS_MUTATION(
    $permissions: [Permission]
    $userId: ID!
  ) {
    updatePermissions(permissions: $permissions, userId: $userId) {
      id
      permissions
      name
      email
    }
  }
`

class UserPermissions extends Component {
  static propTypes = {
    user: PropTypes.shape({
      name: PropTypes.string,
      email: PropTypes.string,
      id: PropTypes.string,
      permissions: PropTypes.array,
    }).isRequired,
    posiblePermissions: PropTypes.array.isRequired,
  }
  state = { permissions: this.props.user.permissions }
  handlePermissionChange = (e, updatePermissions) => {
    const { checked, value } = e.target
    let permissions = [...this.state.permissions]
    if (checked) {
      permissions.push(value)
    } else {
      permissions = permissions.filter(permission => permission !== value)
    }
    this.setState({ permissions }, updatePermissions)
  }
  render() {
    const {
      props: {
        user: { id, name, email },
        posiblePermissions,
      },
      state: { permissions },
      handlePermissionChange,
    } = this

    return (
      <Mutation
        mutation={UPDATE_PERMISSIONS_MUTATION}
        variables={{ permissions, userId: id }}
      >
        {(updatePermissions, { loading, error }) => (
          <>
            {error && (
              <tr>
                <td colSpan="9">
                  <Error error={error} />
                </td>
              </tr>
            )}
            <tr>
              <td>{name}</td>
              <td>{email}</td>
              {posiblePermissions.map(permission => (
                <td key={permission}>
                  <label htmlFor={`${id}-permission-${permission}`}>
                    <input
                      id={`${id}-permission-${permission}`}
                      type="checkbox"
                      checked={permissions.includes(permission)}
                      value={permission}
                      onChange={e =>
                        handlePermissionChange(e, updatePermissions)
                      }
                    />
                  </label>
                </td>
              ))}
              <td>
                <StickButton
                  type="button"
                  disabled={loading}
                  onClick={updatePermissions}
                >
                  {loading ? 'Zmienia' : 'Ustawione'}
                </StickButton>
              </td>
            </tr>
          </>
        )}
      </Mutation>
    )
  }
}

export default UserPermissions
