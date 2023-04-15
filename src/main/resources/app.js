import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Cadastro from './paginas/Cadastro'
import Home from './paginas/Home'
import Login from './paginas/Login'
import HomeLogado from './paginas/HomeLogado'

const Private = ({ Item }) =>{
  const signed = false
  
  return signed > 0 ? <Item /> : <Login />
 }



function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/inicio' element={<Private item={HomeLogado} />} />
        <Route path='/cadastro' element={<Cadastro />} />
        <Route path='/login' element={<Login />} />
        <Route path='*' element={<Home />} />
      </Routes>
    </Router>
  )
}

export default App

// 