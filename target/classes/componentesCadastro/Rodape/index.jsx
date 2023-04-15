import './Rodape.scss'
import { Link } from 'react-router-dom';
import React from 'react'

const Rodape = ({ referencia, texto, referenciaTexto}) => {
  return(
    <footer id="rodape">
      <p>{texto}<Link to={referencia}><a href="login.html">{referenciaTexto}</a></Link></p>
    </footer>
  )
}

export default Rodape