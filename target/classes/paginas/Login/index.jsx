import Header from '../../componentesCadastro/Header'
import Rodape from '../../componentesCadastro/Rodape'
import CardTop from '../../componentesCadastro/CardTop'
import CardBottom from '../../componentesLogin/CardBottom'

const Login = () =>{
  return (
    <body>
      <Header />
      <CardTop 
      label={"Entrar"}
      titulo={"Entre em sua conta!"}
      />
      <CardBottom />
      <Rodape 
      referencia={"/cadastro"}
      texto={"Não possui cadastro? "}
      referenciaTexto={" Cadastre-se agora!"} 
       /> 
    </body>
  )
}

export default Login