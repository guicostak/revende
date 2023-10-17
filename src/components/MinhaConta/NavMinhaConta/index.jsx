import './NavMinhaConta.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom'; 
import { faUser, faTicket, faHeart, faDollar } from '@fortawesome/free-solid-svg-icons';

const NavMeuPerfil = ({ selected }) => {
  return (
    <nav className="nav-meu-perfil">
      <Link
        to="/minha-conta/meu-perfil"
        className={`nav-meu-perfil-opcao ${selected === 'Meu perfil' ? 'nav-meu-perfil-opcao-selecionado' : ''}`}
      >
        <FontAwesomeIcon
          className="icone"
          icon={faUser}
          style={{ color: '#E82C4F' }}
        />
        Meu perfil
      </Link>
      <Link
        to="/minha-conta/meus-ingressos"
        className={`nav-meu-perfil-opcao ${selected === 'Meus ingressos' ? 'nav-meu-perfil-opcao-selecionado' : ''}`}
      >
        <FontAwesomeIcon
          className="icone"
          icon={faTicket}
          style={{ color: '#E82C4F' }}
        />
        Meus ingressos
      </Link>
      <Link
        to="/minha-conta/favoritos"
        className={`nav-meu-perfil-opcao ${selected === 'Favoritos' ? 'nav-meu-perfil-opcao-selecionado' : ''}`}
      >
        <FontAwesomeIcon
          className="icone"
          icon={faHeart}
          style={{ color: '#E82C4F' }}
        />
        Favoritos
      </Link>
      <Link
        to="/minha-conta/informacoes-do-vendedor"
        className={`nav-meu-perfil-opcao ${selected === 'Informações de vendedor' ? 'nav-meu-perfil-opcao-selecionado' : ''}`}
      >
        <FontAwesomeIcon
          className="icone"
          icon={faDollar}
          style={{ color: '#E82C4F' }}
        />
        Informações de vendedor
      </Link>
    </nav>
  );
};

export default NavMeuPerfil;
