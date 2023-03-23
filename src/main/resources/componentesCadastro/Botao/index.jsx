
const Botao = (props) => {
  return(
    <a href={props.ancora} id={props.id}><button><img id="logo1" src={props.imagem}/>{props.label}</button></a> 
  )
}

export default Botao