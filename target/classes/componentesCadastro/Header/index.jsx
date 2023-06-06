import './Header.scss'
import logo from '../../img/logos/logo.png'
import { Link } from 'react-router-dom'


const Header = () => {
  return(
    <header className='header'>
     <Link to="/"><img src={logo} id='logo'/></Link>
    </header>
  )
}

export default Header