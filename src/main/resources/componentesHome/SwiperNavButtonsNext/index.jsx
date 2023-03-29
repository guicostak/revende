import { useSwiper } from 'swiper/react'

const SwiperNavButtonsNext = () => {
  const swiper = useSwiper();
  
  return(
    <div className="swipper-nav-btns">
      <button onClick={() => swiper.slideNext()}>&gt;</button>
    </div>
  )
}

export default SwiperNavButtonsNext