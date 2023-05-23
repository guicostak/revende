import React, { useEffect, useState } from 'react'
import './Ingressos.scss'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Navigation, Pagination } from 'swiper/core'
import 'swiper/css'
import 'swiper/css/navigation'
import Ingresso from './Ingresso'
import { useNavigate } from "react-router-dom";

SwiperCore.use([Navigation, Pagination])

const Ingressos = () => {
  const [vetorIngressos, setVetorIngressos] = useState([
    {
      img: 1,
      titulo: 'Ingresso 1',
      data: '28/04',
      preco: 'R$' + 10,
      tipo: 'fisico',
      id: 1
    },
    {
      img: 2,
      titulo: 'Ingresso 2',
      data: '28/04',
      preco: 'R$' + 15,
      tipo: 'digital',
      id: 2
    },
    {
      img: 3,
      titulo: 'Ingresso 3',
      data: '28/04',
      preco: 'R$' + 20,
      tipo: 'fisico',
      id: 3
    },
    {
      img: 4,
      titulo: 'Ingresso 4',
      data: '29/04',
      preco: 'R$' + 25,
      tipo: 'digital',
      id: 4
    },
    {
      img: 5,
      titulo: 'Ingresso 5',
      data: '30/04',
      preco: 'R$' + 30,
      tipo: 'fisico',
      id: 5
    },
    {
      img: 6,
      titulo: 'Ingresso 6',
      data: '01/05',
      preco: 'R$' + 35,
      tipo: 'digital',
      id: 6
    },
    {
      img: 7,
      titulo: 'Ingresso 7',
      data: '02/05',
      preco: 'R$' + 40,
      tipo: 'fisico',
      id: 7
    },
    {
      img: 8,
      titulo: 'Ingresso 8',
      data: '03/05',
      preco: 'R$' + 45,
      tipo: 'digital',
      id: 8
    },
    {
      img: 9,
      titulo: 'Ingresso 9',
      data: '04/05',
      preco: 'R$' + 50,
      tipo: 'fisico',
      id: 9
    },
    {
      img: 10,
      titulo: 'Ingresso 10',
      data: '05/05',
      preco: 'R$' + 55,
      tipo: 'digital',
      id: 10
    }
  ])
  const [swiper, setSwiper] = useState(null)
  const [slideAtual, setSlideAtual] = useState(0)
  const [verMais, setVerMais] = useState(false)
  const navigate = useNavigate();

  const navegar = () => {
    navigate("/ingressos/recentes")
  }

  const handlePreviousSlide = () => {
    if (slideAtual > 0) {
      swiper.slidePrev()
      setVerMais(false); 
    }
  }

  const handleNextSlide = () => {
    if(slideAtual < 4){
    swiper.slideNext()
    if(slideAtual === 3){
      const timeout = setTimeout(() => {
        setVerMais(true); 
      }, 100);
    }
    }
  }

  useEffect(() => {
    axios
      .get('http://localhost:8080/ticket/lastest')
      .then(response => setVetorIngressos(response.data))
      .catch(error => console.log(error))
  }, [])

  const dezMaisRecentes = vetorIngressos.slice(-10).reverse()

  
  return (
    <div className="ingressos">
      <h1 onClick={navegar}>Anúncios recentes</h1>
      {vetorIngressos.length > 0 ? (
        <div className="listaIngressos">
          <button
            className="navButton"
            onClick={handlePreviousSlide}
            style={{
              visibility: slideAtual === 0 ? 'hidden' : 'visible',
              opacity: slideAtual === 0 ? 0 : 1
            }}
          >
            {'<'}
          </button>
          <Swiper
  slidesPerView={1}
  loop
  onSwiper={setSwiper}
  onSlideChange={swiper => setSlideAtual(swiper.activeIndex)}
  initialSlide={slideAtual}
  speed={200}
  pagination={{
    type: 'bullets',
    clickable: true
  }}
>
            {[...Array(5)].map((_, index) => (
              <SwiperSlide key={index}>
                <div className="parIngressos">
                  <Ingresso
                    id={dezMaisRecentes[index * 2].id}
                    imgIngresso={dezMaisRecentes[index * 2].img}
                    tituloIngresso={dezMaisRecentes[index * 2].titulo}
                    dataIngresso={dezMaisRecentes[index * 2].data}
                    precoIngresso={dezMaisRecentes[index * 2].preco}
                    tipoIngresso={dezMaisRecentes[index * 2].tipo}
                  />
                  <Ingresso
                    id={dezMaisRecentes[index * 2 + 1].id}
                    imgIngresso={dezMaisRecentes[index * 2 + 1].img}
                    tituloIngresso={dezMaisRecentes[index * 2 + 1].titulo}
                    dataIngresso={dezMaisRecentes[index * 2 + 1].data}
                    precoIngresso={dezMaisRecentes[index * 2 + 1].preco}
                    tipoIngresso={dezMaisRecentes[index * 2 + 1].tipo}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <button
            className="navButton"
            onClick={handleNextSlide}
            style={{
              visibility: slideAtual < 4 ? 'visible' : 'hidden',
              opacity: slideAtual < 4 ? 1 : 0
            }}
          >
            {'>'}
          </button>
        </div>
      ) : (
        <div className="ingressos">
          <div className="sem-ingressos">
            <h1></h1>
            <p>Não existem ingressos disponíveis nesta sessão.</p>
          </div>
        </div>
      )}
      {vetorIngressos.length > 0 && (
        <h5 onClick={navegar}
        className='ver-mais' style={{
          display: verMais === true ?  'flex' : 'none'
        }}>
          ver mais
        </h5>

        
      )}
    </div>
  )
}

export default Ingressos
