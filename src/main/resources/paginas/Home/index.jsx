import Header from '../../componentesHome/Header'
import Categorias from '../../componentesHome/Categorias'
import Carrosel from '../../componentesHome/Carrosel'
import Ingressos from '../../componentesHome/Ingressos'
import Quebra from '../../componentesHome/Quebra'
import Rodape from '../../componentesHome/Rodape'

const Home = () =>{
  const setting = {
    spaceBetween: 50,
    slidesPerView: 3,
  }
  return (
    <div className="body">
      <Header />
      <Categorias />
      <Carrosel />  
      <Quebra />
      <Ingressos />
      <Rodape />
    </div>
  )
}

export default Home