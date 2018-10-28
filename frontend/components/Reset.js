import React, { Component } from 'react'
import { CURENT_USER_QUERY } from './User'
import Error from './ErrorMessage'
import Form from './styles/Form'
import { Mutation } from 'react-apollo'
import PropTypes from 'prop-types'
import gql from 'graphql-tag'

const RESET_MUTATION = gql`
  mutation RESET_MUTATION(
    $resetToken: String!
    $password: String!
    $confirmPassword: String!
  ) {
    resetPassword(
      resetToken: $resetToken
      password: $password
      confirmPassword: $confirmPassword
    ) {
      id
      email
      name
    }
  }
`

class Reset extends Component {
  static propTypes = {
    resetToken: PropTypes.string.isRequired,
  }

  state = {
    password: '',
    confirmPassword: '',
  }

  handleChangeValue = e => this.setState({ [e.target.name]: e.target.value })

  render() {
    const {
      props: { resetToken },
      state: { password, confirmPassword },
      handleChangeValue,
    } = this
    return (
      <Mutation
        mutation={RESET_MUTATION}
        variables={{
          resetToken,
          password,
          confirmPassword,
        }}
        refetchQueries={[{ query: CURENT_USER_QUERY }]}
      >
        {(resetPassword, { error, loading }) => (
          <Form
            method="post"
            onSubmit={async e => {
              e.preventDefault()
              await resetPassword().catch(err => console.log(err)) // eslint-disable-line
              this.setState({
                password: '',
                confirmPassword: '',
              })
            }}
          >
            <fieldset disabled={loading} aria-busy={loading}>
              <h2>Wpisz nowe hasło</h2>
              <Error error={error} />
              <label htmlFor="password">
                Nowe hasło
                <input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Nowe hasło"
                  value={password}
                  onChange={handleChangeValue}
                  required
                />
              </label>
              <label htmlFor="confirmPassword">
                Potwierdź hasło
                <input
                  id="confirmPassword"
                  type="password"
                  name="confirmPassword"
                  placeholder="Potwierdź hasło"
                  value={confirmPassword}
                  onChange={handleChangeValue}
                  required
                />
              </label>
              <button type="submit">Zapisz hasło</button>
            </fieldset>
          </Form>
        )}
      </Mutation>
    )
  }
}

export default Reset
