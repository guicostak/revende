import React, { useState, useEffect } from 'react';
import Slide from '../../../components/home/Slide';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import axios from 'axios';
import './Carrosel.scss';
import LoadingSpinner from '../../../utils/LoadingSpinner';

function Carrosel() {
  const [dadosCarrosel, setDadosCarrosel] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:8080/api/events', {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.status !== 200) {
          throw new Error('Não foi possível adquirir os dados');
        }

        const responseData = response.data;
        setDadosCarrosel(responseData);
        setLoading(false); 
         } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <div style={{ marginTop: '10vh' }} className='container-fluid align-items-center justify-content-center col-md-11'>
      <h1 className="titulo">Eventos em destaque desse mês</h1>
      {loading ? <LoadingSpinner /> : 
      <div className='slider col-md-12'>
        <Swiper
          initialSlide={1}
          modules={[Navigation, Pagination, Autoplay]}
          navigation={{ nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }}
          pagination={{ clickable: true}}
          speed={600}
          autoplay={{ delay: 8000, disableOnInteraction: false }}
          loop
        >
          {dadosCarrosel.map((item, index) => (
            <SwiperSlide key={index}>
              <Slide
                dateEvento={item.date}
                imgEvento={item.image}
                titleEvento={item.title}
                adressEvento={item.address}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      }
    </div>
  );
}

export default Carrosel;
