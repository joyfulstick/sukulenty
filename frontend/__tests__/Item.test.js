import Item from '../components/Item'
import { shallow } from 'enzyme'
import toJSON from 'enzyme-to-json'

const fakeItem = {
  id: 'abc123',
  price: 799,
  image: 'sukulent-small.jpg',
  title: 'Sukulent',
  description: 'Zielony sukulent',
}

describe('<Item />', () => {
  it('renders', () => {
    shallow(<Item item={fakeItem} page={1} />)
  })
  it('matches the snapshot', () => {
    const wrapper = shallow(<Item item={fakeItem} page={1} />)
    expect(toJSON(wrapper)).toMatchSnapshot()
  })
})
