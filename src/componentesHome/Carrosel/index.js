import './Carrosel.css'
import Slider from 'react-slick';

function Carrosel() {
  const images = [
    { src: 'image1.jpg' },
    { src: 'image2.jpg' },
    { src: 'image3.jpg' },
    { src: 'image4.jpg' },
    { src: 'image5.jpg' }
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <Slider {...settings}>
      {images.map((image, index) => (
        <div key={index}>
          <img src={image.src} alt={`Slide ${index + 1}`} />
        </div>
      ))}
    </Slider>
  );
}

export default Carrosel