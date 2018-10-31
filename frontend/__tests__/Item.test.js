import ItemComponent from '../components/Item'
import { shallow } from 'enzyme'

const fakeItem = {
  id: 'a1',
  title: 'Title',
  price: 799,
  description: 'Item description',
  image: 'item.jpg',
  largeImage: 'lgitem.jpg',
}

describe('<Item />', () => {
  it('renders and displays properly', () => {
    const wrapper = shallow(<ItemComponent item={fakeItem} />)
    const PriceTag = wrapper.find('PriceTag')
    console.log(wrapper.debug())
    // expect(PriceTag.children().text()).toBe('7,99 zł')
    expect(wrapper.find('Title h3').text()).toBe('Title')
  })
})
