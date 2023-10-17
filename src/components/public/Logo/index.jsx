import logo from '../../../assets/img/logos/logo.png';
import { Link } from 'react-router-dom';
import React from 'react';
import './Logo.scss'


const Logo = ({maxw}) => {
  return (
    <div className='col-md-auto col-12'>
      <Link to="/">
        <img
          className='img-fluid'
          src={logo}
          alt="Logo"
          title="Revende, revenda seus ingressos"
          id="logo"
          
        />
      </Link>
    </div>
  );
};


export default Logo;
