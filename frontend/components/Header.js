import Cart from './Cart'
import Link from 'next/link'
import Nav from './Nav'
import Nprogress from 'nprogress'
import Router from 'next/router'
import Search from './Search'
import styled from 'styled-components'

Router.onRouteChangeStart = () => Nprogress.start()
Router.onRouteChangeComplete = () => Nprogress.done()
Router.onRouteChangeError = () => Nprogress.done()

const StyledHeader = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 2;
  background: #ffffff;
  .bar {
    border-bottom: 10px solid ${props => props.theme.black};
    display: grid;
    grid-template-columns: auto 1fr;
    justify-content: space-between;
    align-items: stretch;
    overflow: hidden;
    @media (max-width: 1300px) {
      grid-template-columns: 1fr;
      justify-content: center;
    }
  }
  .sub-bar {
    display: grid;
    grid-template-columns: 1fr auto;
    border-bottom: 1px solid ${props => props.theme.lightgrey};
  }
`

const Logo = styled.h1`
  font-size: 4rem;
  margin-left: 5rem;
  position: relative;
  transform: perspective(8rem) rotateX(-5deg);
  a {
    padding: 0.5rem 1rem;
    background: ${props => props.theme.green};

    color: white;
    text-transform: uppercase;
    text-decoration: none;
  }
  @media (max-width: 1300px) {
    margin: 0;
    text-align: center;
  }
`

const Header = () => (
  <StyledHeader>
    <div className="bar">
      <Logo>
        <Link href="/">
          <a>Sukulenty</a>
        </Link>
      </Logo>
      <Nav />
    </div>
    <div className="sub-bar">
      <Search />
    </div>
    <div>
      <Cart />
    </div>
  </StyledHeader>
)

export default Header
