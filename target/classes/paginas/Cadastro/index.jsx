import Header from '../../componentesCadastro/Header'
import Rodape from '../../componentesCadastro/Rodape'
import CardTop from '../../componentesCadastro/CardTop'
import CardBottom from '../../componentesCadastro/CardBottom'

const Cadastro = () =>{
  return (
    <body>
      <Header />
      <CardTop 
      label={"Registre-se"}
      titulo={"Crie sua conta!"}
      />
      <CardBottom />
      <Rodape 
      referencia={"/login"} 
      texto={"Já possui cadastro? "}
      referenciaTexto={" Faça login!"}
      />
    </body>
  )
}

export default Cadastro