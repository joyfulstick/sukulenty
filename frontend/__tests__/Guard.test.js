import { CURRENT_USER_QUERY } from '../components/User'
import Guard from '../components/Guard'
import { MockedProvider } from 'react-apollo/test-utils'
import { fakeUser } from '../lib/testUtils'
import { mount } from 'enzyme'
import wait from 'waait'

const notSignedInMocks = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: { data: { me: null } },
  },
]

const signedInMocks = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: { data: { me: fakeUser() } },
  },
]

describe('<Guard/>', () => {
  it('renders the sign in dialog to logged out users', async () => {
    const wrapper = mount(
      <MockedProvider mocks={notSignedInMocks}>
        <Guard />
      </MockedProvider>,
    )
    await wait()
    wrapper.update()
    expect(wrapper.text()).toContain('Proszę zaloguj się')
    const SignIn = wrapper.find('Signin')
    expect(SignIn.exists()).toBe(true)
  })

  it('renders the child component when the user is signed in', async () => {
    const ChildComponent = () => <p>Child Component</p>
    const wrapper = mount(
      <MockedProvider mocks={signedInMocks}>
        <Guard>
          <ChildComponent />
        </Guard>
      </MockedProvider>,
    )

    await wait()
    wrapper.update()
    expect(wrapper.contains(<ChildComponent />)).toBeTruthy()
  })
})
