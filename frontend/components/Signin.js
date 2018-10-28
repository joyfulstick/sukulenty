import React, { Component } from 'react'
import { CURRENT_USER_QUERY } from './User'
import Error from './ErrorMessage'
import Form from './styles/Form'
import { Mutation } from 'react-apollo'
import Router from 'next/router'
import gql from 'graphql-tag'

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      id
      email
      name
    }
  }
`

class Signin extends Component {
  state = {
    email: '',
    password: '',
  }

  handleChangeValue = e => this.setState({ [e.target.name]: e.target.value })

  render() {
    const { state, handleChangeValue } = this
    return (
      <Mutation
        mutation={SIGNIN_MUTATION}
        variables={state}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {(signin, { error, loading }) => (
          <Form
            method="post"
            onSubmit={e => {
              e.preventDefault()
              signin()
                .then(val => {
                  if (val) {
                    Router.push({
                      pathname: '/items',
                    })
                  }
                })
                .catch(err => {
                  console.log(err) // eslint-disable-line
                  this.setState({
                    password: '',
                  })
                })
            }}
          >
            <fieldset disabled={loading} aria-busy={loading}>
              <h2>Logowanie</h2>
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
              <button type="submit">Zaloguj</button>
            </fieldset>
          </Form>
        )}
      </Mutation>
    )
  }
}

export default Signin
