import React from 'react';
import Slide from '../Slide'
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay'
import sotrack from '../../img/eventos/sotrack.png'
import coldplay from '../../img/eventos/coldplay.png'
import './Carrosel.css'




SwiperCore.use([ Pagination, Autoplay]);

function Carrosel() {

  
  return (
    <div className='slider'>
      <h2>Eventos em destaque</h2>
      <Swiper
        modules = {[Navigation, Pagination]}
        pagination={{clickable: true}}
        autoplay={{delay: 5000}}
        loop
        > 
         <SwiperSlide>
            <Slide
            imgEvento = {sotrack}
            dataEvento = "31/03 - 03/04"
            tituloEvento = "Só track boa"
            descricaoEvento ="
             Navegando rumo ao oceano em busca do Sol, da Lua, das estrelas e, certamente, do paraíso!"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Slide
            imgEvento = {coldplay}
            dataEvento = "21/03"
            tituloEvento = "Show ColdPlay"
            descricaoEvento ="
            Coldplay
            Estadio Couto Pereira, Curitiba, Brasil
            terça-feira, 21 março 2023 20:00."
            />
          </SwiperSlide>
      </Swiper>
    </div>
  )
}

export default Carrosel;
