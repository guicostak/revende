const Slide = (props) =>{
  return(
    <div className="sld">
      <img src={props.imgEvento}/>
      <div className="info">
        <h4>{props.dataEvento}</h4>
        <h1>{props.tituloEvento}</h1>
        <p>{props.descricaoEvento}</p>
        <button>Ver ingressos</button>
      </div>
    </div>
  )
}

export default Slide