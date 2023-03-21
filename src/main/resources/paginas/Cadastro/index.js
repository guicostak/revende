import Logo from '../../componentesCadastro/Logo'
import Rodape from '../../componentesCadastro/Rodape'
import './cadastro.css'
import CardTop from '../../componentesCadastro/CardTop'
import CardBottom from '../../componentesCadastro/CardBottom'

const Cadastro = () =>{
  return (
    <body className="body">
      <Logo />
      <CardTop />
      <CardBottom />
      <Rodape />
    </body>
  )
}

export default Cadastro