import React, { useState, useEffect } from 'react';
import shows from '../../img/categorias/shows.png';
import teatro from '../../img/categorias/teatro.png';
import esportes from '../../img/categorias/esportes.png';
import standup from '../../img/categorias/standup.png';
import palestras from '../../img/categorias/palestras.png';
import infantis from '../../img/categorias/infantis.png';
import outros from '../../img/categorias/outros.png';
import './Categorias.scss';

const Categorias = () => {
  const categorias = [
    { imagem: shows, titulo: 'Shows e festas' },
    { imagem: teatro, titulo: 'Espetáculos e teatro' },
    { imagem: esportes, titulo: 'Eventos esportivos' },
    { imagem: standup, titulo: 'Stand Up e comédia' },
    { imagem: palestras, titulo: 'Palestras e seminários' },
    { imagem: infantis, titulo: 'Eventos infantis' },
    { imagem: outros, titulo: 'Outras categorias' },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused) {
        setActiveIndex((prevIndex) =>
          prevIndex < categorias.length - 1 ? prevIndex + 1 : 0
        );
      }
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [categorias.length, isPaused]);

  const mouseAtivo = (index) => {
    setIsPaused(true);
    setActiveIndex(index);
  };

  const mouseInativo = (index) => {
    setIsPaused(false);
    setTimeout(() => {
      setActiveIndex(index + 1);
    }, 200);
  };

  return (
    <div className="Categorias">
      <h1 className="tituloHome">Seu site para a revenda de ingressos!</h1>
      <ul>
        {categorias.map((categoria, index) => (
          <li
            key={index}
            style={{ transform: index === activeIndex ? 'scale(1.1)' : 'scale(1.0)', }}
            onMouseEnter={() => mouseAtivo(index)}
            onMouseLeave={() => mouseInativo(index)}
          >
            <img src={categoria.imagem} alt={categoria.titulo} />
            <h2>{categoria.titulo}</h2>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categorias;