import CartCount from '../components/CartCount'
import { shallow } from 'enzyme'
import toJSON from 'enzyme-to-json'

describe('<CartCount />', () => {
  it('renders', () => {
    shallow(<CartCount count={11} />)
  })
  it('matches the snapshot', () => {
    const wrapper = shallow(<CartCount count={11} />)
    expect(toJSON(wrapper)).toMatchSnapshot()
  })
  it('updates via props', () => {
    const wrapper = shallow(<CartCount count={44} />)
    expect(toJSON(wrapper)).toMatchSnapshot()
    wrapper.setProps({ count: 55 })
    expect(toJSON(wrapper)).toMatchSnapshot()
  })
})
