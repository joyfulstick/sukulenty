import CreateItem, { CREATE_ITEM_MUTATION } from '../components/CreateItem'
import { ALL_ITEMS_QUERY } from '../components/Items'
import { MockedProvider } from 'react-apollo/test-utils'
import { PAGINATION_QUERY } from '../components/Pagination'
import Router from 'next/router'
import { fakeItem } from '../lib/testUtils'
import { mount } from 'enzyme'
import toJSON from 'enzyme-to-json'
import wait from 'waait'
const sukulentImage = 'https://sukulenty.pl/sukulent.jpg'

global.fetch = jest.fn().mockResolvedValue({
  json: () => ({
    secure_url: sukulentImage,
    eager: [{ secure_url: sukulentImage }],
  }),
})

describe('<CreateItem/>', () => {
  it('renders and matches snapshot', async () => {
    const wrapper = mount(
      <MockedProvider>
        <CreateItem />
      </MockedProvider>,
    )
    const form = wrapper.find('form[data-test="form"]')
    expect(toJSON(form)).toMatchSnapshot()
  })

  it('uploads a file when changed', async () => {
    const wrapper = mount(
      <MockedProvider>
        <CreateItem />
      </MockedProvider>,
    )
    const input = wrapper.find('input[type="file"]')
    input.simulate('change', { target: { files: ['sukulent.jpg'] } })
    await wait()
    const component = wrapper.find('CreateItem').instance()
    expect(component.state.image).toEqual(sukulentImage)
    expect(component.state.largeImage).toEqual(sukulentImage)
    expect(global.fetch).toHaveBeenCalled()
    global.fetch.mockReset()
  })

  it('handles state updating', async () => {
    const wrapper = mount(
      <MockedProvider>
        <CreateItem />
      </MockedProvider>,
    )
    wrapper
      .find('#title')
      .simulate('change', { target: { value: 'Testing', name: 'title' } })
    wrapper.find('#price').simulate('change', {
      target: { value: 4000, name: 'price', type: 'number' },
    })
    wrapper.find('#description').simulate('change', {
      target: { value: 'Zielony sukulent', name: 'description' },
    })

    expect(wrapper.find('CreateItem').instance().state).toMatchObject({
      title: 'Testing',
      price: 4000,
      description: 'Zielony sukulent',
    })
  })
  it('creates an item when the form is submitted', async () => {
    const item = fakeItem()
    const mocks = [
      {
        request: {
          query: CREATE_ITEM_MUTATION,
          variables: {
            title: item.title,
            description: item.description,
            image: '',
            largeImage: '',
            price: item.price,
          },
        },
        result: {
          data: {
            createItem: {
              ...item,
            },
          },
        },
      },
      {
        request: {
          query: ALL_ITEMS_QUERY,
          variables: { skip: 0, first: 20 },
        },
        result: {
          data: { items: [{ ...item }] },
        },
      },
      {
        request: { query: PAGINATION_QUERY },
        result: {
          data: {
            itemsConnection: {
              __typename: 'aggregate',
              aggregate: {
                count: length,
                __typename: 'count',
              },
            },
          },
        },
      },
    ]

    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <CreateItem />
      </MockedProvider>,
    )

    wrapper
      .find('#title')
      .simulate('change', { target: { value: item.title, name: 'title' } })
    wrapper.find('#price').simulate('change', {
      target: { value: item.price, name: 'price', type: 'number' },
    })
    wrapper.find('#description').simulate('change', {
      target: { value: item.description, name: 'description' },
    })

    Router.router = { push: jest.fn() }
    wrapper.find('form').simulate('submit')
    await wait(50)
    expect(Router.router.push).toHaveBeenCalled()
    expect(Router.router.push).toHaveBeenCalledWith({
      pathname: '/item',
      query: { id: 'abc123' },
    })
  })
})
