import './Ingressos.scss'
import React, { useEffect, useRef, useState } from 'react'
import { useSwiper, Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Navigation } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import Ingresso from './Ingresso'
import axios from 'axios'

SwiperCore.use([Navigation])



const Ingressos = () => {
  const [vetorIngressos, setVetorIngressos] = useState([
    {
      img: 1,
      titulo: 'Ingresso 1',
      data: '28/04',
      preco: 'R$' + 10,
      tipo: 'fisico'
    },
    {
      img: 2,
      titulo: 'Ingresso 2',
      data: '28/04',
      preco: 'R$' + 15,
      tipo: 'digital'
    },
    {
      img: 3,
      titulo: 'Ingresso 3',
      data: '28/04',
      preco: 'R$' + 20,
      tipo: 'fisico'
    },
    {
      img: 4,
      titulo: 'Ingresso 4',
      data: '29/04',
      preco: 'R$' + 25,
      tipo: 'digital'
    },
    {
      img: 5,
      titulo: 'Ingresso 5',
      data: '30/04',
      preco: 'R$' + 30,
      tipo: 'fisico'
    },
    {
      img: 6,
      titulo: 'Ingresso 6',
      data: '01/05',
      preco: 'R$' + 35,
      tipo: 'digital'
    },
    {
      img: 7,
      titulo: 'Ingresso 7',
      data: '02/05',
      preco: 'R$' + 40,
      tipo: 'fisico'
    },
    {
      img: 8,
      titulo: 'Ingresso 8',
      data: '03/05',
      preco: 'R$' + 45,
      tipo: 'digital'
    },
    {
      img: 9,
      titulo: 'Ingresso 9',
      data: '04/05',
      preco: 'R$' + 50,
      tipo: 'fisico'
    },
    {
      img: 10,
      titulo: 'Ingresso 10',
      data: '05/05',
      preco: 'R$' + 55,
      tipo: 'digital'
    }
  ])

  useEffect(() => {
    axios
      .get('http://localhost:8080/inicio/ingressos')
      .then(response => setVetorIngressos(response.data))
      .catch(error => console.log(error))
  }, [])

  const swiper = useSwiper()
  const sliderRef = useRef(null)

  const dezMaisRecentes = vetorIngressos.slice(-10).reverse()

  return (
    <div className="ingressos">
      <h1>Anuncios recentes</h1>
      {vetorIngressos.length > 0 ? (
        <div className="listaIngressos" ref={sliderRef}>
          <button id='prev'className="navButton" onClick={() => swiper.slidePrev()}>
            &lt;
          </button>
          <Swiper
            modules={[Navigation]}
            loop
            onSwiper={swiper => swiper.update()}
            navigation={{
              prevEl: '#prev',
              nextEl: '#next'
            }}>
            <SwiperSlide>
              <div className="parIngressos">
                <Ingresso
                  imgIngresso={dezMaisRecentes[0].img}
                  tituloIngresso={dezMaisRecentes[0].titulo}
                  dataIngresso={dezMaisRecentes[0].data}
                  precoIngresso={dezMaisRecentes[0].preco}
                  tipoIngresso={dezMaisRecentes[0].tipo}
                />
                <Ingresso
                  imgIngresso={dezMaisRecentes[1].img}
                  tituloIngresso={dezMaisRecentes[1].titulo}
                  dataIngresso={dezMaisRecentes[1].data}
                  precoIngresso={dezMaisRecentes[1].preco}
                  tipoIngresso={dezMaisRecentes[1].tipo}
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="parIngressos">
                <Ingresso
                  imgIngresso={dezMaisRecentes[2].img}
                  tituloIngresso={dezMaisRecentes[2].titulo}
                  dataIngresso={dezMaisRecentes[2].data}
                  precoIngresso={dezMaisRecentes[2].preco}
                  tipoIngresso={dezMaisRecentes[2].tipo}
                />
                <Ingresso
                  imgIngresso={dezMaisRecentes[3].img}
                  tituloIngresso={dezMaisRecentes[3].titulo}
                  dataIngresso={dezMaisRecentes[3].data}
                  precoIngresso={dezMaisRecentes[3].preco}
                  tipoIngresso={dezMaisRecentes[3].tipo}
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="parIngressos">
                <Ingresso
                  imgIngresso={dezMaisRecentes[4].img}
                  tituloIngresso={dezMaisRecentes[4].titulo}
                  dataIngresso={dezMaisRecentes[4].data}
                  precoIngresso={dezMaisRecentes[4].preco}
                  tipoIngresso={dezMaisRecentes[4].tipo}
                />
                <Ingresso
                  imgIngresso={dezMaisRecentes[5].img}
                  tituloIngresso={dezMaisRecentes[5].titulo}
                  dataIngresso={dezMaisRecentes[5].data}
                  precoIngresso={dezMaisRecentes[5].preco}
                  tipoIngresso={dezMaisRecentes[5].tipo}
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="parIngressos">
                <Ingresso
                  imgIngresso={dezMaisRecentes[6].img}
                  tituloIngresso={dezMaisRecentes[6].titulo}
                  dataIngresso={dezMaisRecentes[6].data}
                  precoIngresso={dezMaisRecentes[6].preco}
                  tipoIngresso={dezMaisRecentes[6].tipo}
                />
                <Ingresso
                  imgIngresso={dezMaisRecentes[7].img}
                  tituloIngresso={dezMaisRecentes[7].titulo}
                  dataIngresso={dezMaisRecentes[7].data}
                  precoIngresso={dezMaisRecentes[7].preco}
                  tipoIngresso={dezMaisRecentes[7].tipo}
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="parIngressos">
                <Ingresso
                  imgIngresso={dezMaisRecentes[8].img}
                  tituloIngresso={dezMaisRecentes[8].titulo}
                  dataIngresso={dezMaisRecentes[8].data}
                  precoIngresso={dezMaisRecentes[8].preco}
                  tipoIngresso={dezMaisRecentes[8].tipo}
                />
                <Ingresso
                  imgIngresso={dezMaisRecentes[9].img}
                  tituloIngresso={dezMaisRecentes[9].titulo}
                  dataIngresso={dezMaisRecentes[9].data}
                  precoIngresso={dezMaisRecentes[9].preco}
                  tipoIngresso={dezMaisRecentes[9].tipo}
                />
              </div>
            </SwiperSlide>
          </Swiper>

          <button id='next' className="navButton" onClick={() => swiper.slideNext()}>
            &gt;
          </button>
        </div>
      ) : (
        <div className="ingressos">
          <div className="sem-ingressos">
            <h1></h1>
            <p>Não existem ingressos disponíveis nessa sessão.</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default Ingressos
