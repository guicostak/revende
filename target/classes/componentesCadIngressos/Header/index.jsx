import logo from '../../img/logos/logo.png'
import './Header.scss'
import { Link } from 'react-router-dom'

const Header = () =>{
  return(
      <header className='cadIngresso-header'>
        <Link to="/"><img src={logo}/></Link>
        <p>Olá, Guilherme</p>
      </header>
  )
}

export default Header