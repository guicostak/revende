import { Link } from 'react-router-dom';
import './CaixaDePesquisa.scss'
import React, { useState, useEffect } from 'react';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';

const CaixaDePesquisa= () => {
  const [typedText, setTypedText] = useState('');
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const placeholderWords = ['Rock in Rio', 'Lollapalooza', 'Teatro Mogli'];
  const placeholder = placeholderWords[placeholderIndex];
  const placeholderLength = placeholder.length;
  const intervalDelay = 90; 
  const navigate = useNavigate();
  const [inputPesquisa, setInputPesquisa] = useState()

  const pesquisar = () => {
    navigate(`/pesquisar/${inputPesquisa}`);
  }

  const handleInputChange = (e) => {
    setInputPesquisa(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      pesquisar();
    }
  };

  useEffect(() => {
    let currentIndex = 0;
    let isDeleting = false;
    let intervalId;

    const typeText = () => {
      const currentText = isDeleting
        ? placeholder.slice(0, currentIndex - 1)
        : placeholder.slice(0, currentIndex + 1);
    
      setTypedText(currentText);
    
      if (isDeleting) {
        currentIndex -= 1;
        isDeleting = currentIndex !== 0;
      } else {
        currentIndex += 1;
        isDeleting = currentIndex === placeholderLength + 1;
    
     
        if (currentIndex === placeholderLength + 1) {
          setTimeout(() => {
            clearInterval(intervalId);
            setTypedText('');
            setPlaceholderIndex((prevIndex) => (prevIndex + 1) % placeholderWords.length);
          }, 1000);
        }
      }
    };

    intervalId = setInterval(typeText, intervalDelay);
    
    return () => {
      clearInterval(intervalId);
    };
  }, [placeholder, placeholderLength, intervalDelay, placeholderWords.length]);

  return (
    <div className='col-md-12' id="busca">
        <FontAwesomeIcon onClick={pesquisar} className='icone' id='btn-buscar' icon={faMagnifyingGlass} style={{ color: '#E82C4F' }} />
        <input
        type="text"
        id="txt-busca"
        placeholder={`Buscar "${typedText}"`}
        value={inputPesquisa}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default CaixaDePesquisa;
