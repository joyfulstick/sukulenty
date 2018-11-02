import React, { Component } from 'react'
import Error from './ErrorMessage'
import Form from './styles/Form'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    requestReset(email: $email) {
      message
    }
  }
`

class RequestReset extends Component {
  state = {
    email: '',
  }

  handleChangeValue = e => this.setState({ [e.target.name]: e.target.value })

  render() {
    const { state, handleChangeValue } = this
    return (
      <Mutation mutation={REQUEST_RESET_MUTATION} variables={state}>
        {(requestReset, { error, loading, called }) => (
          <Form
            method="post"
            onSubmit={async e => {
              e.preventDefault()
              await requestReset().catch(err => console.log(err)) // eslint-disable-line
              this.setState({
                email: '',
              })
            }}
            data-test="form"
          >
            <fieldset disabled={loading} aria-busy={loading}>
              <h2>Resetowanie hasła</h2>
              <Error error={error} />
              {!error &&
                !loading &&
                called && (
                  <p>
                    Wiadomość z linkiem do resetu hasła została wysłana. Sprawdź
                    skrzynkę e-mail 📬
                  </p>
                )}
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
              <button type="submit">Resetuj</button>
            </fieldset>
          </Form>
        )}
      </Mutation>
    )
  }
}

export { RequestReset as default, REQUEST_RESET_MUTATION }
