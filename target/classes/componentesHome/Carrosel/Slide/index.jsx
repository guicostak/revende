
const Slide = ({ imgEvento, dataEvento, tituloEvento, descricaoEvento }) => {
  return(
    <div className="sld">
      <img src={imgEvento}/>
      <div className="info">
        <h4>{dataEvento}</h4>
        <h1>{tituloEvento}</h1>
        <p>{descricaoEvento}</p>
        <button>Ver ingressos</button>
      </div>
    </div>
  )
}

export default Slide