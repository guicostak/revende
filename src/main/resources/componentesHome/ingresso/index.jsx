import SwiperNavButtonsPrev from '../SwiperNavButtonsPrev'
import SwiperNavButtonsNext from '../SwiperNavButtonsNext'

const Ingresso = (props) => {
  return ( 
  <div className='lista'>
    <SwiperNavButtonsPrev /> 
    <div className='item'>
      <img src={props.imgIngresso} />
      <div className='info'>
        <div className='topInfo'>
          <h2>{props.tituloIngresso}</h2>
          <h3>{props.dataIngresso}</h3>
        </div>
        <h4>{props.precoIngresso}</h4>
        <p>{props.tipoIngresso}</p>
      </div>
      <button className='infoButton'>ver detalhes</button>
    </div>
    <div className='item'>
      <img src={props.imgIngresso2} />
      <div className='info'>
        <div className='topInfo'>
          <h2>{props.tituloIngresso2}</h2>
          <h3>{props.dataIngresso2}</h3>
        </div>
        <h4>{props.precoIngresso2}</h4>
        <p>{props.tipoIngresso2}</p>
      </div>
      <button className='infoButton'>ver detalhes</button>
    </div>
    <SwiperNavButtonsNext /> 
  </div>
)
}
export default Ingresso