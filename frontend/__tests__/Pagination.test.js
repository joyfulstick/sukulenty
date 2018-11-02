import Pagination, { PAGINATION_QUERY } from '../components/Pagination'
import { MockedProvider } from 'react-apollo/test-utils'
import Router from 'next/router'
import { mount } from 'enzyme'
import toJSON from 'enzyme-to-json'
import wait from 'waait'

Router.router = {
  push() {},
  prefetch() {},
}

function makeMocksFor(length) {
  return [
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
}

describe('<Pagination/>', () => {
  it('displays a loading message', () => {
    const wrapper = mount(
      <MockedProvider mocks={makeMocksFor(1)}>
        <Pagination page={1} />
      </MockedProvider>,
    )
    expect(wrapper.text()).toContain('Wczytywanie...')
  })

  it('renders pagination for 44 items', async () => {
    const wrapper = mount(
      <MockedProvider mocks={makeMocksFor(44)}>
        <Pagination page={1} />
      </MockedProvider>,
    )
    await wait()
    wrapper.update()
    expect(wrapper.find('[data-test="total-pages"]').text()).toEqual(
      'Strona 1 z 3',
    )
    const pagination = wrapper.find('div[data-test="pagination"]')
    expect(toJSON(pagination)).toMatchSnapshot()
  })

  it('disables prev button on first page', async () => {
    const wrapper = mount(
      <MockedProvider mocks={makeMocksFor(44)}>
        <Pagination page={1} />
      </MockedProvider>,
    )
    await wait()
    wrapper.update()
    expect(wrapper.find('[data-test="prev"]').prop('aria-disabled')).toEqual(
      true,
    )
    expect(wrapper.find('[data-test="next"]').prop('aria-disabled')).toEqual(
      false,
    )
  })
  it('disables next button on last page', async () => {
    const wrapper = mount(
      <MockedProvider mocks={makeMocksFor(44)}>
        <Pagination page={3} />
      </MockedProvider>,
    )
    await wait()
    wrapper.update()
    expect(wrapper.find('[data-test="prev"]').prop('aria-disabled')).toEqual(
      false,
    )
    expect(wrapper.find('[data-test="next"]').prop('aria-disabled')).toEqual(
      true,
    )
  })
  it('enables all buttons on a middle page', async () => {
    const wrapper = mount(
      <MockedProvider mocks={makeMocksFor(44)}>
        <Pagination page={2} />
      </MockedProvider>,
    )
    await wait()
    wrapper.update()
    expect(wrapper.find('[data-test="prev"]').prop('aria-disabled')).toEqual(
      false,
    )
    expect(wrapper.find('[data-test="next"]').prop('aria-disabled')).toEqual(
      false,
    )
  })
})
