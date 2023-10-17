import React from 'react';
import './ItemLista.scss'

const ItemLista = ({ path, img, text, clickItem }) => {
  return (
    <li onClick={clickItem} className="item-lista col-md-6 col-sm-6">
      <div className="link">
        <div>
          {img}
           <span>{text}</span> 
        </div>
      </div>
    </li>
  );
}

export default ItemLista;
