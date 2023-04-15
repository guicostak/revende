import { useSwiper } from 'swiper/react'

const SwiperNavButtonsPrev = () => {
  const swiper = useSwiper();
  
  return(
    <div className="swipper-nav-btns">
      <button onClick={() => swiper.slidePrev()}>&lt;</button>
    </div>
  )
}

export default SwiperNavButtonsPrev