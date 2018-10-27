import Link from 'next/link'
import NavStyles from './styles/NavStyles'
import Signout from './Signout'
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
