import { fakeCartItem, fakeUser } from '../lib/testUtils'
import { CURRENT_USER_QUERY } from '../components/User'
import { MockedProvider } from 'react-apollo/test-utils'
import Nav from '../components/Nav'
import Router from 'next/router'
import { mount } from 'enzyme'
import toJSON from 'enzyme-to-json'
import wait from 'waait'

const routerMocks = { push: () => {}, prefetch: () => {} }
Router.router = routerMocks

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

const signedInMocksWithCartItems = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: {
      data: {
        me: {
          ...fakeUser(),
          cart: [fakeCartItem(), fakeCartItem(), fakeCartItem()],
        },
      },
    },
  },
]

describe('<Nav/>', () => {
  it('renders a minimal nav when signed out', async () => {
    const wrapper = mount(
      <MockedProvider mocks={notSignedInMocks}>
        <Nav />
      </MockedProvider>,
    )
    await wait()
    wrapper.update()
    const nav = wrapper.find('nav[data-test="nav"]')
    expect(toJSON(nav)).toMatchSnapshot()
  })

  it('renders full nav when signed in', async () => {
    const wrapper = mount(
      <MockedProvider mocks={signedInMocks}>
        <Nav />
      </MockedProvider>,
    )
    await wait()
    wrapper.update()
    const nav = wrapper.find('nav[data-test="nav"]')
    expect(nav.children()).toHaveLength(5)
    expect(nav.text()).toContain('wylogowanie')
  })

  it('renders the amount of items in the cart', async () => {
    const wrapper = mount(
      <MockedProvider mocks={signedInMocksWithCartItems}>
        <Nav />
      </MockedProvider>,
    )
    await wait()
    wrapper.update()
    const nav = wrapper.find('[data-test="nav"]')
    const count = nav.find('div.count')
    expect(toJSON(count)).toMatchSnapshot()
  })
})
