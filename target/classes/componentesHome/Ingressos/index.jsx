import './Ingressos.scss';
import React, { useEffect, useState } from 'react';
import { useSwiper, Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';
import 'swiper/css'
import 'swiper/css/navigation'
import Ingresso from './Ingresso';
import axios from 'axios';

SwiperCore.use([Navigation]);

const Ingressos = () => {
  const [vetorIngressos, setVetorIngressos] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:8080/inicio/ingressos')
      .then((response) => setVetorIngressos(response.data))
      .catch((error) => console.log(error));
  }, []);

  const swiper = useSwiper();

  const dezMaisRecentes = vetorIngressos.slice(-10).reverse();

  return (
    <div className="ingressos">
      {vetorIngressos.length > 0 ? (
        <div className="listaIngressos">
          <button className="navButton" onClick={() => swiper.slidePrev()}>
            &lt;
          </button>
          <Swiper>
            <SwiperSlide>
              <Ingresso
                imgIngresso={dezMaisRecentes[0].img}
                tituloIngresso={dezMaisRecentes[0].titulo}
                dataIngresso={dezMaisRecentes[0].data}
                precoIngresso={dezMaisRecentes[0].preco}
                tipoIngresso={dezMaisRecentes[0].tipo}
              />
            </SwiperSlide>

            <SwiperSlide>
              <Ingresso
                imgIngresso={dezMaisRecentes[1].img}
                tituloIngresso={dezMaisRecentes[1].titulo}
                dataIngresso={dezMaisRecentes[1].data}
                precoIngresso={dezMaisRecentes[1].preco}
                tipoIngresso={dezMaisRecentes[1].tipo}
              />
            </SwiperSlide>
          </Swiper>

          <button className="navButton" onClick={() => swiper.slideNext()}>
            &gt;
          </button>
        </div>
      ) : (
        <div className="ingressos">
          <div className='sem-ingressos'>
            <p>Não existem ingressos disponíveis.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Ingressos;