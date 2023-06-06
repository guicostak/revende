import './Header.scss';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../img/logos/logo.png';
import lupa from '../../img/vetores/lupaPesquisar.png';
import ajuda from '../../img/vetores/ajuda.png';


const Header = () => {
  const [typedText, setTypedText] = useState('');
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const placeholderWords = ['Buscar "Rock in Rio"', 'Buscar "Lollapalooza"', 'Buscar "Jogo do Flamengo"', 'Buscar "Teatro PeterPan"'];
  const placeholder = placeholderWords[placeholderIndex];
  const placeholderLength = placeholder.length;
  const intervalDelay = 150; // Intervalo de digitação em milissegundos

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
    
        // Verifica se a palavra foi completamente digitada
        if (currentIndex === placeholderLength + 1) {
          setTimeout(() => {
            clearInterval(intervalId);
            setTypedText('');
            setPlaceholderIndex((prevIndex) => (prevIndex + 1) % placeholderWords.length);
          }, 3000); // Tempo em milissegundos antes de apagar a digitação
        }
      }
    };

    intervalId = setInterval(typeText, intervalDelay);

    // Verifica se a palavra foi completamente digitada
    if (currentIndex === placeholderLength + 1) {
      setTimeout(() => {
        clearInterval(intervalId);
        setTypedText('');
        setPlaceholderIndex((prevIndex) => (prevIndex + 1) % placeholderWords.length);
      }, 1000); // Tempo em milissegundos antes de apagar a digitação
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [placeholder, placeholderLength, intervalDelay, placeholderWords.length]);

  return (
    <header className="headerHome">
      <img src={logo} id="headerHomeLogo" alt="Logo" />

      <div id="busca">
        <input type="text" id="txtBusca" placeholder={typedText} />
        <img src={lupa} id="btnBusca" alt="Buscar" />
      </div>

      <nav id="navbar">
        <ul>
          <li alt="ajuda">
            <Link to="#">
              <img src={ajuda} alt="Ajuda" />
            </Link>
          </li>
          <li>
            <Link className="link" to="/login">
              entrar
            </Link>
          </li>
          <Link to="/ingressos/cadastro">
            <button>quero vender</button>
          </Link>
        </ul>
      </nav>
    </header>
  );
};

export default Header;