import './CardTop.scss'
import googleLogo from '../../img/logos/google-logo.png'
import facebookLogo from '../../img/logos/facebook-logo.png'
import Botao from './Botao'

const CardTop = () => {
  return(
    <div id="card-top">
       <h1>Crie sua conta!</h1>  
       <Botao
        label="Registre-se com o Facebook" 
        id="facebook"
        imagem={facebookLogo}
        ancora=""
       />     
      <Botao
        label="Registre-se com o Google" 
        id="google"
        imagem={googleLogo}
        ancora=""
       />
    </div>
  )
}

export default CardTop