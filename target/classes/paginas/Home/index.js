import Header from '../../componentesHome/Header'
import Categorias from '../../componentesHome/Categorias'
import './Home.css'
import Carrosel from '../../componentesHome/Carrosel'


const Home = () =>{
  return (
    <div className="body">
      <Header />
      <Categorias />
    </div>
  )
}

export default Home