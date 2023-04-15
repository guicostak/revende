import './Header.css'
import logo from '../../img/logos/logo.png'
import lupa from '../../img/vetores/lupaPesquisar.png'
import React from 'react'
import { Link } from 'react-router-dom';
import ajuda from '../../img/vetores/ajuda.png'



const Header = () => {
  return(
    <header className='headerHome'>
      <img  src={logo} id="headerHomeLogo"/>
      <div id='busca'>
        <input type="text" id="txtBusca" placeholder="Buscar..."/>
        <img src={lupa} id="btnBusca" alt="Buscar"/>
      </div>
      <nav id="navbar">
        <ul>
          <li alt="ajuda"><Link><img src={ajuda}></img></Link></li>
          <li><Link class="link" to="/login">entrar</Link></li>
          <Link to="/cadastro"><button>quero vender</button></Link>
        </ul>
      </nav>
    </header>
  )
}

export default Header