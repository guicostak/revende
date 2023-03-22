import Header from '../../componentesHome/Header'
import Categorias from '../../componentesHome/Categorias'
import './Home.css'
import Carrosel from '../../componentesHome/Carrosel'


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
    </div>
  )
}

export default Home