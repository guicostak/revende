import React from 'react';
import { Link } from 'react-router-dom';

const Ingresso = ({
  id,
  imgIngresso,
  tituloIngresso,
  dataIngresso,
  precoIngresso,
  tipoIngresso,
}) => {
  return (
    <div className="item">
      <img src={imgIngresso} />
      <div className="info">
        <div className="topInfo">
          <h2>{tituloIngresso}</h2>
          <h3>{dataIngresso}</h3>
        </div>
        <h4>{precoIngresso}</h4>
        <p>{tipoIngresso}</p>
      </div>
      <Link to={`/ingressos/detalhes/${id}`}><button className='infoButton'>ver detalhes</button></Link>
    </div>
  );
};

export default Ingresso;
