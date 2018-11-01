import Item from '../components/Item'
import { shallow } from 'enzyme'
import toJSON from 'enzyme-to-json'

const fakeItem = {
  id: '1df5f2',
  title: 'Nazwa',
  price: 799,
  description: 'Opis',
  image: 'item.jpg',
  largeImage: 'lgitem.jpg',
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
