import Link from 'next/link'
import Nav from './Nav'
import Nprogress from 'nprogress'
import Router from 'next/router'
import styled from 'styled-components'

Router.onRouteChangeStart = () => Nprogress.start()
Router.onRouteChangeComplete = () => Nprogress.done()
Router.onRouteChangeError = () => Nprogress.done()

const Logo = styled.h1`
  font-size: 4rem;
  margin-left: 2rem;
  position: relative;
  z-index: 2;
  transform: skew(-20deg) translateZ(0);
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

const StyledHeader = styled.header`
  .bar {
    border-bottom: 10px solid ${props => props.theme.black};
    display: grid;
    grid-template-columns: auto 1fr;
    justify-content: space-between;
    align-items: stretch;
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

const Header = () => (
  <StyledHeader>
    <div className="bar">
      <Logo>
        <Link href="/">
          <a>Stick Fits</a>
        </Link>
      </Logo>
      <Nav />
    </div>
    <div className="sub-bar">
      <p>Serach</p>
    </div>
    <div>
      <p>Cart</p>
    </div>
  </StyledHeader>
)

export default Header
