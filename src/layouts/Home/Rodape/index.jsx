import './Rodape.scss'
import logo from '../../../assets/img/logos/logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';


const Rodape = () => {
  return (
    <footer>
      <div className="rodape col-md-12">
        <ul>
          <h3>categorias</h3>
          <li>Show e festas</li>
          <li>Espetáculos e teatro</li>
          <li>Eventos esportivos</li>
          <li>Stand Up e comédia</li>
          <li>Palestra e seminários</li>
          <li>Eventos infantis</li>
          <li>Outras categorias</li>
        </ul>

        <ul>
          <h3>descontos</h3>
          <li>10% off</li>
          <li>20% off</li>
          <li>40% off</li>
          <li>50% off</li>
          <li>60% off</li>
          <li>80% off</li>
        </ul>

        <ul>
          <h3>minha conta</h3>
          <li>meus anúncios</li>
          <li>vistos recentemente</li>
          <li>configurações</li>
        </ul>

        <ul>
          <h3>utilidades</h3>
          <li>ajuda</li>
          <li>como vender</li>
          <li>como comprar</li>
          <li>politica de privacidade</li>
          <li>segurança</li>
        </ul>

        <ul className='redes-sociais'>
          <h3>redes sociais</h3>
          <FontAwesomeIcon
                  className='icone'
                  icon={faFacebook}
                  style={{fontSize: '2rem', color: 'white',cursor: 'pointer'}}
                />
          <FontAwesomeIcon
                  className='icone'
                  icon={faInstagram}
                  style={{fontSize: '2rem', color: 'white', cursor: 'pointer'}}
                />
        </ul>
      </div>
      <div className="sobre">
        <h2>Sobre nós</h2>
        <p>
          Nascido com a missão de ajudar as pessoas a vender ingressos de
          eventos em que não vão mais, a revende surgiu em 2023 com o propósito
          de facilitar esse processo. Tarefa antes feita através de grupos de
          divulgação ou post em redes sociais. Obrigado por fazer parte dessa
          história
        </p>
      </div>
      <div className="direitos">
        <img style={{width: '10rem', height: 'auto'}} src={logo} />
        <p>
          Revende © 2023 - todos os direitos reservados - revende S.A. CNPJ:
          16.922.038/0001-51 avenida presidente juscelino kubitschek, 1830, 12º
          andar, torre 4, vila nova conceição, são paulo, sp, 04543-900
        </p>
      </div>
    </footer>
  )
}

export default Rodape
