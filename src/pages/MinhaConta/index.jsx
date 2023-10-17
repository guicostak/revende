import React, { useEffect, useState } from 'react';
import Navbar from '../../layouts/MinhaConta/Navbar';
import CardMeuPerfil from '../../layouts/MinhaConta/CardMeuPerfil'
import './MinhaConta.scss'


const MinhaConta = ({secao}) => {

  return (
    <div id="minha-conta" className='container-fluid body'>
    <Navbar />
      <div className="card-profile col-md-12">
        <h3 style={{fontSize: '2rem'}} className='titulo'>Minha conta</h3> 
        <div style={{display: secao === 'Meu perfil' ? 'flex' :  'none'}}>
          <CardMeuPerfil />
        </div>
      </div>
    </div>
  );
}

export default MinhaConta;
