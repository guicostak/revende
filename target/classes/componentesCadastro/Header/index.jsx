import './Header.scss'
import logo from '../../img/logos/logo.png'

const Header = () => {
  return(
    <header className='header'>
      <img src={logo} id='logo' alt="revende"></img>
    </header>
  )
}

export default Header