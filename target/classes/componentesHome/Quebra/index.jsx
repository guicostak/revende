import './Quebra.scss'
import imagem from '../../img/vetores/Questions.gif'

const Quebra = () => {
  return (
    <div className="quebra">
      <img src={imagem} />
      <div className="textfield">
        <h2>Procurando o que fazer com a galera ? </h2>
        <p>Cadastre-se e veja o que recomendamos para você</p>
      </div>
      <button>cadastrar</button>
    </div>
  )
}

export default Quebra
