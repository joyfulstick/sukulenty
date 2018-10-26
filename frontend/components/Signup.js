import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'
import Form from './styles/Form'
import Error from './ErrorMessage'
import React, { Component } from 'react'

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $email: String!
    $password: String!
    $name: String!
  ) {
    signup(email: $email, password: $password, name: $name) {
      id
      email
      name
    }
  }
`

class Signup extends Component {
  state = {
    email: '',
    name: '',
    password: '',
  }

  handleChangeValue = e => this.setState({ [e.target.name]: e.target.value })

  render() {
    const { state, handleChangeValue } = this
    return (
      <Mutation mutation={SIGNUP_MUTATION} variables={state}>
        {(signup, { error, loading }) => (
          <Form
            method="post"
            onSubmit={async e => {
              e.preventDefault()
              await signup().catch(err => console.log(err)) // eslint-disable-line
              this.setState({
                email: '',
                name: '',
                password: '',
              })
            }}
          >
            <fieldset disabled={loading} aria-busy={loading}>
              <h2>Rejestracja</h2>
              <Error error={error} />
              <label htmlFor="email">
                Email
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="e-mail"
                  value={state.email}
                  onChange={handleChangeValue}
                  required
                />
              </label>
              <label htmlFor="name">
                Name
                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Imię"
                  value={state.name}
                  onChange={handleChangeValue}
                  required
                />
              </label>
              <label htmlFor="password">
                Password
                <input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Hasło"
                  value={state.password}
                  onChange={handleChangeValue}
                  required
                />
              </label>
              <button type="submit">Zapisz się</button>
            </fieldset>
          </Form>
        )}
      </Mutation>
    )
  }
}

export default Signup
