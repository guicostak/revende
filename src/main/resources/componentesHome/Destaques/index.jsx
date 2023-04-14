import './Destaques.css' 
import imagem from '../../img/vetores/ingresso.png'
import Ingresso from '../Ingresso'

const Destaques = () => {
  return(
    <div id="destaques">
           <Ingresso
        imgIngresso={imagem}
        tituloIngresso='Só track boa2'
        dataIngresso='31/03'
        precoIngresso='R$510,00'
        tipoIngresso='físico'
        imgIngresso2={imagem}
        tituloIngresso2='Só track boa'
        dataIngresso2='31/03'
        precoIngresso2='R$510,00'
        tipoIngresso2='físico'
        />

    </div>
  )
}

export default Destaques