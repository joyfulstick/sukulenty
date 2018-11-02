import Signup, { SIGNUP_MUTATION } from '../components/Signup'
import { ApolloConsumer } from 'react-apollo'
import { CURRENT_USER_QUERY } from '../components/User'
import { MockedProvider } from 'react-apollo/test-utils'
import Router from 'next/router'
import { fakeUser } from '../lib/testUtils'
import { mount } from 'enzyme'
import toJSON from 'enzyme-to-json'
import wait from 'waait'

Router.router = {
  push() {},
}

function type(wrapper, name, value) {
  wrapper.find(`input[name="${name}"]`).simulate('change', {
    target: { name, value },
  })
}

const me = fakeUser()
const mocks = [
  {
    request: {
      query: SIGNUP_MUTATION,
      variables: {
        name: me.name,
        email: me.email,
        password: '123',
      },
    },
    result: {
      data: {
        signup: {
          __typename: 'User',
          id: 'abc123',
          email: me.email,
          name: me.name,
        },
      },
    },
  },
  {
    request: { query: CURRENT_USER_QUERY },
    result: { data: { me } },
  },
]

describe('<Signup/>', () => {
  it('renders and matches snapshot', async () => {
    const wrapper = mount(
      <MockedProvider>
        <Signup />
      </MockedProvider>,
    )
    expect(toJSON(wrapper.find('form'))).toMatchSnapshot()
  })

  it('calls the mutation properly', async () => {
    let apolloClient
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <ApolloConsumer>
          {client => {
            apolloClient = client
            return <Signup />
          }}
        </ApolloConsumer>
      </MockedProvider>,
    )
    await wait()
    wrapper.update()
    type(wrapper, 'name', me.name)
    type(wrapper, 'email', me.email)
    type(wrapper, 'password', '123')
    wrapper.update()
    wrapper.find('form').simulate('submit')
    await wait()
    const user = await apolloClient.query({ query: CURRENT_USER_QUERY })
    expect(user.data.me).toMatchObject(me)
  })
})
