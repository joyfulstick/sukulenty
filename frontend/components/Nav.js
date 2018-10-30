import CartCount from './CartCount'
import Link from 'next/link'
import { Mutation } from 'react-apollo'
import NavStyles from './styles/NavStyles'
import Signout from './Signout'
import { TOGGLE_CART_MUTATION } from './Cart'
import User from './User'
import totalItems from '../lib/calcTotalItems'

const guardedLinks = {
  sell: 'sprzedaj',
  orders: 'zamowienia',
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
                  koszyk
                  <CartCount count={totalItems(me.cart)} />
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
