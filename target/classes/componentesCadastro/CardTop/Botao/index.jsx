const Botao = ({ label, imagem, ancora, id  }) => {
  return( 
    <a href={ancora} id={id}><button><img src={imagem}/> {label}</button></a>
  )
}

export default Botao