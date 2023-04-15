import './CardTop.scss'
import googleLogo from '../../img/logos/google-logo.png'
import facebookLogo from '../../img/logos/facebook-logo.png'
import Botao from './Botao'

const CardTop = ({ label, titulo }) => {
  return(
    <div id="card-top">
       <h1>{titulo}</h1>  
       <Botao
        label={label+" com o Facebook"} 
        id="facebook"
        imagem={facebookLogo}
        ancora=""
       />     
      <Botao
        label={label+" com o Google"} 
        id="google"
        imagem={googleLogo}
        ancora=""
       />
    </div>
  )
}

export default CardTop