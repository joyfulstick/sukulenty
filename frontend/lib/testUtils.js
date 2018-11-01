import casual from 'casual'

casual.seed(777)

const fakeItem = () => ({
  __typename: 'Item',
  id: 'abc123',
  price: 799,
  user: null,
  image: 'sukulent-small.jpg',
  title: 'Sukulent',
  description: 'Zielony sukulent',
  largeImage: 'sukulent.jpg',
})

const fakeUser = () => ({
  __typename: 'User',
  id: '4234',
  name: casual.name,
  email: casual.email,
  permissions: ['ADMIN'],
  orders: [],
  cart: [],
})

const fakeOrderItem = () => ({
  __typename: 'OrderItem',
  id: casual.uuid,
  image: `${casual.word}.jpg`,
  title: casual.words(),
  price: 4234,
  quantity: 1,
  description: casual.words(),
})

const fakeOrder = () => ({
  __typename: 'Order',
  id: 'ord123',
  charge: 'ch_123',
  total: 40000,
  items: [fakeOrderItem(), fakeOrderItem()],
  createdAt: '2018-11 - 06T19: 24: 16.000Z',
  user: fakeUser(),
})

const fakeCartItem = overrides => ({
  __typename: 'CartItem',
  id: 'ast123',
  quantity: 3,
  item: fakeItem(),
  user: fakeUser(),
  ...overrides,
})

class LocalStorageMock {
  constructor() {
    this.store = {}
  }

  clear() {
    this.store = {}
  }

  getItem(key) {
    return this.store[key] || null
  }

  setItem(key, value) {
    this.store[key] = value.toString()
  }

  removeItem(key) {
    delete this.store[key]
  }
}

export {
  LocalStorageMock,
  fakeItem,
  fakeUser,
  fakeCartItem,
  fakeOrder,
  fakeOrderItem,
}
