import React from 'react';
import ItemLista from '../ItemLista';
import './Lista.scss';

const Lista = ({ lstItens, clickItemList }) => {

  
  return (
    <div className="row">
    <ul className="lista-nao-ordenada row col-sm-12">       
        {lstItens.map((item, index) => (
            <ItemLista
            key={index} 
            path={item.path}
            text={item.text}
            clickItem={item.clickable === true ? () => clickItemList() : null}
            img={item.img}
            />
        ))}
    </ul>
    </div>
  );
};

export default Lista;
