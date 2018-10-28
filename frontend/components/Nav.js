import CartCount from './CartCount'
import Link from 'next/link'
import { Mutation } from 'react-apollo'
import NavStyles from './styles/NavStyles'
import Signout from './Signout'
import { TOGGLE_CART_MUTATION } from './Cart'
import User from './User'

const guardedLinks = {
  sell: 'sprzedaj',
  orders: 'zamowienia',
  me: 'moje konto',
}

const Nav = () => (
  <User>
    {({ data: { me } }) => (
      <NavStyles>
        <Link prefetch key="items" href={'/items'}>
          <a>sklep</a>
        </Link>
        {me && (
          <>
            {Object.entries(guardedLinks).map(([k, v]) => (
              <Link key={k} href={`/${k}`}>
                <a>{v}</a>
              </Link>
            ))}
            <Signout />
            <Mutation mutation={TOGGLE_CART_MUTATION}>
              {toggleCart => (
                <button onClick={toggleCart}>
                  My Cart
                  <CartCount
                    count={me.cart.reduce(
                      (tally, cartItem) => tally + cartItem.quantity,
                      0,
                    )}
                  />
                </button>
              )}
            </Mutation>
          </>
        )}
        {!me && (
          <Link key="signup" href={'/signup'}>
            <a>logowanie</a>
          </Link>
        )}
      </NavStyles>
    )}
  </User>
)

export default Nav
