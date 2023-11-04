import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import './DropdownPerfil.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { faUser, faTicket, faHeart, faDollar, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import Cookies from 'js-cookie';

const DropdownPerfil = () => {
  const [nome, setNome] = useState(Cookies.get('isAthenticated') ? Cookies.get('name').toUpperCase() : '');

  const logout = () => {
    const cookies = Object.keys(Cookies.get());

    cookies.forEach(cookieName => {
      Cookies.remove(cookieName);
    });

    window.location.reload();
  }

  return (
    <div className="col-md-1 profile">
      <Dropdown>
        <Dropdown.Toggle id="dropdown-circle">{nome.charAt(0)}</Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item className="dropdown-item">
            <Link className='link' to="/minha-conta/meu-perfil"> 
              <FontAwesomeIcon className="icone" icon={faUser} style={{ color: '#E82C4F' }} />
              Meu perfil
            </Link>
          </Dropdown.Item>
          <Dropdown.Item className="dropdown-item">
            <Link className='link' to="/tickets">
              <FontAwesomeIcon className="icone" icon={faTicket} style={{ color: '#E82C4F' }} />
              Meus ingressos
            </Link>
          </Dropdown.Item>
          <Dropdown.Item className="dropdown-item">
            <Link className='link' to="/favorites"> 
              <FontAwesomeIcon className="icone" icon={faHeart} style={{ color: '#E82C4F' }} />
              Favoritos
            </Link>
          </Dropdown.Item>
          <Dropdown.Item className="dropdown-item">
            <Link className='link' to="/seller-info"> 
              <FontAwesomeIcon className="icone" icon={faDollar} style={{ color: '#E82C4F' }} />
              Informações de vendedor
            </Link>
          </Dropdown.Item>
          <Dropdown.Item onClick={logout} style={{background: 'var(--selected)'}} className="dropdown-item">
              <FontAwesomeIcon className="icone" icon={faRightFromBracket} style={{ color: '#E82C4F' }} />
              Sair
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default DropdownPerfil;
