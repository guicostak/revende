import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import './DropdownPerfil.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faUser,
    faTicket, 
    faHeart,
    faDollar
  } from '@fortawesome/free-solid-svg-icons';

const DropdownPerfil = () => {
    const [nome, setNome] = useState('Guilherme')
  return (
    <div className='col-md-1 profile'>
    <Dropdown>
      <Dropdown.Toggle id="dropdown-circle">
        {nome.charAt(0)}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item className='dropdown-item' href="#action1"><FontAwesomeIcon
                  className='icone'
                  icon={faUser}
                  style={{  color: '#E82C4F'}}
                />Meu perfil
        </Dropdown.Item>
        <Dropdown.Item className='dropdown-item' href="#action2"><FontAwesomeIcon
                  className='icone'
                  icon={faTicket}
                  style={{  color: '#E82C4F'}}
                />Meus ingressos</Dropdown.Item>
        <Dropdown.Item className='dropdown-item' href="#action3"><FontAwesomeIcon
                  className='icone'
                  icon={faHeart}
                  style={{  color: '#E82C4F'}}
                />Favoritos</Dropdown.Item>
        <Dropdown.Item className='dropdown-item' href="#action3"><FontAwesomeIcon
                  className='icone'
                  icon={faDollar}
                  style={{  color: '#E82C4F'}}
                />Informações de vendedor</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
    </div>
  );
};

export default DropdownPerfil;
