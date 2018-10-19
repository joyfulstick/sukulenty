import Nav from './Nav'

const Header = () => (
  <div>
    <div className="bar">
      <a href="">Stick Fits</a>
      <Nav />
      <div className="sub-bar">
        <p>Serach</p>
      </div>
      <div>
        <p>Cart</p>
      </div>
    </div>
  </div>
)

export default Header
