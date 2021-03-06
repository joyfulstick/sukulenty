import AddToCart, { ADD_TO_CART_MUTATION } from '../components/AddToCart'
import { fakeCartItem, fakeUser } from '../lib/testUtils'
import { ApolloConsumer } from 'react-apollo'
import { CURRENT_USER_QUERY } from '../components/User'
import { MockedProvider } from 'react-apollo/test-utils'
import { mount } from 'enzyme'
import toJSON from 'enzyme-to-json'
import wait from 'waait'

const mocks = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: {
      data: {
        me: {
          ...fakeUser(),
          cart: [],
        },
      },
    },
  },
  {
    request: { query: CURRENT_USER_QUERY },
    result: {
      data: {
        me: {
          ...fakeUser(),
          cart: [fakeCartItem()],
        },
      },
    },
  },
  {
    request: { query: ADD_TO_CART_MUTATION, variables: { id: 'abc123' } },
    result: {
      data: {
        addToCart: {
          ...fakeCartItem(),
          quantity: 1,
        },
      },
    },
  },
]

describe('<AddToCart/>', () => {
  it('renders and matches the snapshot', async () => {
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <AddToCart id="abc123" />
      </MockedProvider>,
    )
    await wait()
    wrapper.update()
    expect(toJSON(wrapper.find('button'))).toMatchSnapshot()
  })

  it('adds an item to cart when clicked', async () => {
    let apolloClient
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <ApolloConsumer>
          {client => {
            apolloClient = client
            return <AddToCart id="abc123" />
          }}
        </ApolloConsumer>
      </MockedProvider>,
    )
    await wait()
    wrapper.update()
    const {
      data: { me },
    } = await apolloClient.query({ query: CURRENT_USER_QUERY })
    expect(me.cart).toHaveLength(0)
    wrapper.find('button').simulate('click')
    await wait()
    const {
      data: { me: me2 },
    } = await apolloClient.query({ query: CURRENT_USER_QUERY })
    expect(me2.cart).toHaveLength(1)
    expect(me2.cart[0].id).toBe('ast123')
    expect(me2.cart[0].quantity).toBe(3)
  })

  it('changes from add to adding when clicked', async () => {
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <AddToCart id="abc123" />
      </MockedProvider>,
    )
    await wait()
    wrapper.update()
    expect(wrapper.text()).toContain('🛒 Dodaj do Koszyka')
    wrapper.find('button').simulate('click')
    expect(wrapper.text()).toContain('🛒 Dodaje do Koszyka')
  })
})
