import React, { Component } from 'react'
import PropTypes from 'prop-types'
import StickButton from './styles/StickButton'

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
  handlePermissionChange = e => {
    const { checked, value } = e.target
    let permissions = [...this.state.permissions]
    if (checked) {
      permissions.push(value)
    } else {
      permissions = permissions.filter(permission => permission !== value)
    }
    this.setState({ permissions })
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
                onChange={handlePermissionChange}
              />
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

export default UserPermissions
