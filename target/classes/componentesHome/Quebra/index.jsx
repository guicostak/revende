import './Quebra.scss'
import imagem from '../../img/vetores/Questions.gif'
import { Link } from 'react-router-dom'

const Quebra = () => {
  return (
    <div className="quebra">
      <img src={imagem} />
      <div className="textfield">
        <h2>Procurando o que fazer com a galera ? </h2>
        <p>Cadastre-se e veja o que recomendamos para você</p>
      </div>
      <Link to='/cadastro'><button>cadastrar</button></Link>
    </div>
  )
}

export default Quebra
