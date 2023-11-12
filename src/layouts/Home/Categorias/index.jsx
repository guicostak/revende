import React from 'react';
import Categoria from '../../../components/home/Categoria';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBasketball,
  faMusic,
  faTheaterMasks,
  faLaughSquint,
  faEllipsis,
  faGraduationCap,
  faPuzzlePiece,
  faUtensils,
} from '@fortawesome/free-solid-svg-icons';
import './Categorias.scss';

const categoryData = [
  {
    icon: faBasketball,
    category: 'Eventos esportivos',
  },
  {
    icon: faMusic,
    category: 'Festas e Shows',
  },
  {
    icon: faTheaterMasks,
    category: 'Teatro e Espetáculos',
  },
  {
    icon: faLaughSquint,
    category: 'Standup e Comédia',
  },
  {
    icon: faGraduationCap,
    category: 'Palestras e Seminários',
  },
  {
    icon: faPuzzlePiece,
    category: 'Eventos Infantis',
  },
  {
    icon: faUtensils,
    category: 'Culinária e Gourmet',
  },
  {
    icon: faEllipsis,
    category: 'Outras Categorias',
  },
];

const Categorias = () => {
  return (
    <div className='container-fluid col-md-11 categorias'>
      <h1 className='titulo'>Seu site para a revenda de ingressos!</h1>
      <div className='row justify-content-center'>
        {categoryData.map((category, index) => (
          <div key={index} className='col-md-1 col-sm-3 categoria-block'>
            <Categoria
              icone={
                <FontAwesomeIcon
                  className='icone'
                  icon={category.icon}
                  style={{ color: '#E82C4F'}}
                />
              }
              categoria={category.category}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categorias;
