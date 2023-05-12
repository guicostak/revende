import React, { useState, useEffect } from 'react'
import './Ingresso.scss'
import axios from 'axios'
import imagem from '../../img/eventos/coldplay.png'
import email from '../../img/vetores/email.png'
import telefone from '../../img/vetores/telefone.png'
import perfil from '../../img/vetores/usuario.png'

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
    <div className="container">
      <div className="detalhes">
        <img id='imgEvento' src={imagem} />
        <div className="column">
          <h1>Show tananan</h1>
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

          <div className="campo" id="descricao">
            <label style={{ margin: '1vw 0 1vw 2vw' }}>Descrição:</label>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Exercitationem error eaque ratione iusto reprehenderit perferendis
              quaerat laudantium ipsum aliquid quos suscipit qui, facere saepe
              mollitia ullam est maiores rem porro.
            </p>
          </div>
        </div>
      </div>
      <div className="contato">
        <div className='column'>
          <img src={perfil} className='usuario' />  
          <h3>anunciante</h3>
        </div>
        <div className="row">
              <label>Nome:</label>
              <h2>Joaquim da Silva Campos</h2>
            </div>
            <div className="row">
              <label> <img src={email} className='vetores' />  Email:</label>
              <h2>joaquimsc@gmail.com</h2>
            </div>
            <div className="row">
              <label><img src={telefone} className='vetores' />Telefone:</label>
              <h2>(31)99678-2323</h2>
            </div>
      </div>
    </div>
  )
}

export default Ingresso
