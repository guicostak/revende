import Botao from "../../public/Botao"

const Slide = ({ imgEvento, dateEvento, titleEvento, adressEvento }) => {
    return(
      <div className="sld ">
        <img src={imgEvento}/>
        <div className="info ">
          <h4>{dateEvento}</h4>
          <h1>{titleEvento}</h1>
          <p>{adressEvento}</p>
          <Botao
          text={'ver ingressos'} 
          />
        </div>
      </div>
    )
  }
  
  export default Slide