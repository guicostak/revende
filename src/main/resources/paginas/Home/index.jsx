import Header from '../../componentesHome/Header'
import Categorias from '../../componentesHome/Categorias'
import Carrosel from '../../componentesHome/Carrosel'
import Ingressos from '../../componentesHome/Ingressos'
import Quebra from '../../componentesHome/Quebra'
import Rodape from '../../componentesHome/Rodape'
import Destaques from '../../componentesHome/Destaques'


const Home = () =>{
  return (
    <body>
      <Header />
      <Categorias />
      <Carrosel /> 
    
      <Quebra />
      <Ingressos />
      <Rodape />
    </body>
  )
}

export default Home