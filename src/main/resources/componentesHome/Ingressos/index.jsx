import './Ingressos.css'
import imagem from '../../img/vetores/ingresso.png'
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import Ingresso from '../Ingresso'



SwiperCore.use([ Navigation]);

const Ingressos = () =>{
  return(
    <div className='ingressos'>
      <h1>Anúncios recentes</h1>
    <Swiper
      loop
      speed={1300}
    > 
    <SwiperSlide>
        <Ingresso
        imgIngresso={imagem}
        tituloIngresso='Só track boa'
        dataIngresso='31/03'
        precoIngresso='R$510,00'
        tipoIngresso='físico'
        imgIngresso2={imagem}
        tituloIngresso2='Só track boa'
        dataIngresso2='31/03'
        precoIngresso2='R$510,00'
        tipoIngresso2='físico'
        />
    </SwiperSlide>

    <SwiperSlide>
        <Ingresso
        imgIngresso={imagem}
        tituloIngresso='Só track boa2'
        dataIngresso='31/03'
        precoIngresso='R$510,00'
        tipoIngresso='físico'
        imgIngresso2={imagem}
        tituloIngresso2='Só track boa'
        dataIngresso2='31/03'
        precoIngresso2='R$510,00'
        tipoIngresso2='físico'
        />
    </SwiperSlide>
  </Swiper>
</div>
  )
}

export default Ingressos
