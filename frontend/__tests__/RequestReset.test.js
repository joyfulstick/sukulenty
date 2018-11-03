import RequestReset, {
  REQUEST_RESET_MUTATION,
} from '../components/RequestReset'
import { MockedProvider } from 'react-apollo/test-utils'
import { mount } from 'enzyme'
import toJSON from 'enzyme-to-json'
import wait from 'waait'

const mocks = [
  {
    request: {
      query: REQUEST_RESET_MUTATION,
      variables: { email: 'test@test.pl' },
    },
    result: {
      data: { requestReset: { message: 'success', __typename: 'Message' } },
    },
  },
]

describe('<RequestReset/>', () => {
  it('renders and matches snapshot', async () => {
    const wrapper = mount(
      <MockedProvider>
        <RequestReset />
      </MockedProvider>,
    )
    const form = wrapper.find('form[data-test="form"]')
    expect(toJSON(form)).toMatchSnapshot()
  })

  it('calls the mutation', async () => {
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <RequestReset />
      </MockedProvider>,
    )
    wrapper.find('input').simulate('change', {
      target: { name: 'email', value: 'test@test.pl' },
    })
    wrapper.find('form').simulate('submit')
    await wait(50)
    wrapper.update()
    expect(wrapper.find('p').text()).toContain(
      'Wiadomość z linkiem do resetu hasła została wysłana. Sprawdź skrzynkę e-mail 📬',
    )
  })
})
