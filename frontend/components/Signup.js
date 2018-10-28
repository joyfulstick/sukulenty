import React, { Component } from 'react'
import { CURENT_USER_QUERY } from './User'
import Error from './ErrorMessage'
import Form from './styles/Form'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

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
      <Mutation
        mutation={SIGNUP_MUTATION}
        variables={state}
        refetchQueries={[{ query: CURENT_USER_QUERY }]}
      >
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
              <label>
                Email
                <input
                  type="email"
                  name="email"
                  placeholder="e-mail"
                  value={state.email}
                  onChange={handleChangeValue}
                  required
                />
              </label>
              <label>
                Imię
                <input
                  type="text"
                  name="name"
                  placeholder="Imię"
                  value={state.name}
                  onChange={handleChangeValue}
                  required
                />
              </label>
              <label>
                Hasło
                <input
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
