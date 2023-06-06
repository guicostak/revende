import React, { useState, useEffect } from 'react';
import './Categorias.scss';
import shows from '../../img/categorias/shows.png';
import teatro from '../../img/categorias/teatro.png';
import esportes from '../../img/categorias/esportes.png';
import standup from '../../img/categorias/standup.png';
import palestras from '../../img/categorias/palestras.png';
import infantis from '../../img/categorias/infantis.png';
import outros from '../../img/categorias/outros.png';

const Categorias = () => {
  const [activeCategory, setActiveCategory] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = (index) => {
    setIsHovered(true);
    setActiveCategory(index);
  };

  const handleMouseLeave = (index) => {
    setIsHovered(false);
    setActiveCategory(index + 1);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isHovered) {
        setActiveCategory((prevCategory) => (prevCategory + 1) % 7);
      }
    }, 3000);

    return () => {
      clearInterval(timer);
    };
  }, [isHovered]);

  return (
    <div className="Categorias">
      <h1 className="tituloHome">Seu site para a revenda de ingressos!</h1>
      <ul>
        <li
          style={{ transform: activeCategory === 0 ? 'scale(1.13)' : 'scale(1)' }}
          onMouseEnter={() => handleMouseEnter(0)}
          onMouseLeave={() => handleMouseLeave(0)}
        >
          <img src={shows} alt="Shows e festas" />
          <h2>Shows e festas</h2>
        </li>
        <li
          style={{ transform: activeCategory === 1 ? 'scale(1.13)' : 'scale(1)' }}
          onMouseEnter={() => handleMouseEnter(1)}
          onMouseLeave={() => handleMouseLeave(1)}
        >
          <img src={teatro} alt="Espetáculos e teatro" />
          <h2>Espetáculos e teatro</h2>
        </li>
        <li
          style={{ transform: activeCategory === 2 ? 'scale(1.13)' : 'scale(1)' }}
          onMouseEnter={() => handleMouseEnter(2)}
          onMouseLeave={() => handleMouseLeave(2)}
        >
          <img src={esportes} alt="Eventos esportivos" />
          <h2>Eventos esportivos</h2>
        </li>
        <li
          style={{ transform: activeCategory === 3 ? 'scale(1.13)' : 'scale(1)' }}
          onMouseEnter={() => handleMouseEnter(3)}
          onMouseLeave={() => handleMouseLeave(3)}
        >
          <img src={standup} alt="Stand Up e comédia" />
          <h2>Stand Up e comédia</h2>
        </li>
        <li
          style={{ transform: activeCategory === 4 ? 'scale(1.13)' : 'scale(1)' }}
          onMouseEnter={() => handleMouseEnter(4)}
          onMouseLeave={() => handleMouseLeave(4)}
        >
          <img src={palestras} alt="Palestras e seminários" />
          <h2>Palestras e seminários</h2>
        </li>
        <li
          style={{ transform: activeCategory === 5 ? 'scale(1.13)' : 'scale(1)' }}
          onMouseEnter={() => handleMouseEnter(5)}
          onMouseLeave={() => handleMouseLeave(5)}
        >
          <img src={infantis} alt="Eventos infantis" />
          <h2>Eventos infantis</h2>
        </li>
        <li
          style={{ transform: activeCategory === 6 ? 'scale(1.13)' : 'scale(1)' }}
          onMouseEnter={() => handleMouseEnter(6)}
          onMouseLeave={() => handleMouseLeave(6)}
        >
          <img src={outros} alt="Outras categorias" />
          <h2>Outras categorias</h2>
        </li>
      </ul>
    </div>
  );
};

export default Categorias;