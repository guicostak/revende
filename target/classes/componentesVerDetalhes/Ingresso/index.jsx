import React, { useState, useEffect } from 'react'
import './Ingresso.scss'
import axios from 'axios'
import imagem from '../../img/eventos/coldplay.png'
import email from '../../img/vetores/email.png'
import telefone from '../../img/vetores/telefone.png'
import perfil from '../../img/eventos/sotrack.png'
import chat from '../../img/vetores/chat.png'
import chatBranco from '../../img/vetores/chatBranco.png'
import estrelas from '../../img/vetores/5estrelas.png'
import compartilhar from '../../img/vetores/compartilhar.png'
import exclamacao from '../../img/vetores/exclamacao.png'
import escudo from '../../img/vetores/escudo.png'
import joinha from '../../img/vetores/joinha.png'
import cifrao from '../../img/vetores/cifrao.png'
import calendario from '../../img/vetores/calendário.png'
import coracaoBranco from '../../img/vetores/coracaoBranco.png'

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
      <div className="verDetalhes-card">
        <div className="column">
          <div id='data'><span>23/05</span><span>22:00 hrs</span></div>
          <h2>
            Minas Gerais {'>'}&nbsp; Nova lima {'>'}&nbsp; Shows e festas
          </h2>
          <h1>Show Beatles em nova lima</h1>
          <h3>Publicado 24/05 às 23:22 - cod 3430275978454</h3>
          <img id="evento" src={imagem} />
          <div className='row'>
            <div className="preco">
              <h4>R$&nbsp;156,00</h4>
            </div> 
            <div className='detalhes'>
            <div className='detalhe'>
              <label>Tipo</label>
              <h5>físico</h5>
            </div>
            <div className='detalhe'>
              <label>Lote</label>
              <h5>último lote</h5>
            </div>
            <div className='detalhe'>
              <label>Setor</label>
              <h5>pista</h5>
            </div>
          </div>
 
          </div>
          <div className='descricao'>
          <h1 className='subtitulo'>Descrição</h1>
          <h5>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam possimus eius nam labore ratione dicta harum asperiores modi porro dolore commodi praesentium omnis velit ut earum, cumque nulla? Aliquam libero nostrum excepturi illum id dolorem consequuntur doloremque natus quas quo. </h5>
          </div>
          <div className='localizacao'>
          <h1 className='subtitulo'>Localização</h1>
          <div className='detalhes'>
            <div className='detalhe'>
              <label>CEP</label>
              <h5>34006-086</h5>
            </div>
            <div className='detalhe'>
              <label>Endereço</label>
              <h5>Rua do Pablao 2424</h5>
            </div>
            <div className='detalhe'>
              <label>Cidade / Estado</label>
              <h5>Belo Horizonte/MG</h5>
            </div>
          </div>
          </div>
          <div className='botoes'>
            <button className='botao'><img src={compartilhar}/>Compartilhar</button>
            <button className='botao'><img src={exclamacao}/>Denunciar</button>
          </div>
        </div>
        <div className="column">
          <div className="usuario">
            <img id="user" src={perfil} />
            <h1>Rogerin da Silva Lobo</h1>
            <div className='avaliacao'><img id='estrelas' src={estrelas}></img><h2>(8 avaliações)</h2></div>
            <h2 className='since'>Na Revende desde 22/09/2021</h2>
            <label id='telefone'>
              <img className="vetores" src={telefone} />
              (31) 99505-4078
            </label>
            <label id='email'><img className="vetores" src={email} />guilhermecosta.barros@gmail.com</label>
            <h2>Quantidade disponível: 1 ingresso &nbsp;</h2>
            <button id="chat"><img src={chatBranco}/>Entrar no chat</button>
            <button id='lista'><img  src={coracaoBranco}/>Adicionar aos favoritos</button>
            <p>Ver perfil do vendedor</p>
          </div>
          <div className='dicas'>
            <h1><img src={escudo}/>Dicas de segurança</h1>
            <ul>
              <li><img src={joinha}/><b>Reputação:</b>Sempre confira a reputação do vendedor que está negociando! Procure olhar comentários e avaliações para garantir sua segurança.</li>
              <li><img src={cifrao}/><b>Preços irreais:</b>Desconfie de preços muito abaixo do mercado. Sempre procure por vários preços antes de efetuar a compra!</li>
              <li><img src={calendario}/><b>Dados incorretos:</b>Sempre confira aos dados do evento como data, horário e local, para não acabar se enganando com falsas informações </li>
            </ul>
            <p>Veja mais dicas <b>aqui!</b></p>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Ingresso
