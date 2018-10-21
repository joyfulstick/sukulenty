import Link from 'next/link'
import NavStyles from './styles/NavStyles'

const links = {
  items: 'sklep',
  sell: 'sprzedaj',
  signup: 'utwórz konto',
  orders: 'zamowienia',
  me: 'moje konto',
}

const Nav = () => (
  <NavStyles>
    {Object.entries(links).map(([k, v]) => (
      <Link key={k} href={`/${k}`}>
        <a>{v}</a>
      </Link>
    ))}
  </NavStyles>
)

export default Nav
