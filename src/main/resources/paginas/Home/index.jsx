import Header from '../../componentesHome/Header'
import Categorias from '../../componentesHome/Categorias'
import Carrosel from '../../componentesHome/Carrosel'
import Descontos from '../../componentesHome/Descontos'


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
      <Descontos />
    </div>
  )
}

export default Home