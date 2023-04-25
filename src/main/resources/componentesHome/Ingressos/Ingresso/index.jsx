import React from 'react'

const Ingresso = ({
  imgIngresso,
  tituloIngresso,
  dataIngresso,
  precoIngresso,
  tipoIngresso
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
      <button className="infoButton">ver detalhes</button>
    </div>
  )
}

export default Ingresso
