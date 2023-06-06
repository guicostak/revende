import Header from '../../componentesHome/Header'
import Categorias from '../../componentesHome/Categorias'
import Carrosel from '../../componentesHome/Carrosel'
import Quebra from '../../componentesHome/Quebra'
import Rodape from '../../componentesHome/Rodape'
import Ingressos from '../../componentesHome/Ingressos'



const Home = () =>{
  return (
    <body>
      <Header />
      <Categorias />
      <Carrosel />
      <Quebra />
      <Ingressos api={'http://localhost:8080/ticket/lastest'} titulo={"Anúncios recentes"} tituloTamanho={'18vw'}/>
      <Rodape />
    </body>
  )
}

export default Home