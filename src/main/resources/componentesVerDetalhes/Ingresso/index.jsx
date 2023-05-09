import React, { useState, useEffect } from 'react'
import './Ingresso.scss'
import axios from 'axios'
import imagem from '../../img/vetores/ingresso.png'

const Ingresso = ({ match }) => {
  /*const [ingresso, setIngresso] = useState(null);

  useEffect(() => {
    const fetchIngresso = async () => {
      try {
        const response = await axios.get(`/ingressos/${match.params.id}`);
        setIngresso(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchIngresso();
  }, [match.params.id]);

  if (!ingresso) {
    return <div>Carregando...</div>;
  }
 */

  return (
    /* <div className="detalhes">
      <img src={ingresso.img} />
      <h1>{ingresso.titulo}</h1>
      <h2>{ingresso.data}</h2>
      <h3>{ingresso.preco}</h3>
      <p>{ingresso.tipo}</p>
    </div>
    */
    <div className='container'>
    <div className="detalhes">
      <img src={imagem} />
      <h1>Ingresso 1</h1>
      <div className="row">
        <div className="campo">
          <label>Data:</label>
          <h2>08/05/2023</h2>
        </div>
        <div className="campo">
          <label>Preço:</label>
          <h2>R$200,00</h2>
        </div>

        <div className="campo">
          <label>Categorias:</label>
          <h2>Shows e festas</h2>
        </div>

        <div className="campo">
          <label>Tipo de ingresso:</label>
          <h2>físico</h2>
        </div>
      </div>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Exercitationem
        error eaque ratione iusto reprehenderit perferendis quaerat laudantium
        ipsum aliquid quos suscipit qui, facere saepe mollitia ullam est maiores
        rem porro.
      </p>
    </div>
    </div>
  )
}

export default Ingresso
