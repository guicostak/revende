import logo from '../../img/logos/logo.png'
import './Header.scss'

const Header = () =>{
  return(
      <header className='cadIngresso-header'>
        <img src={logo}/>
        <p>Olá, Guilherme</p>
      </header>
  )
}

export default Header