import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Cadastro from './paginas/Cadastro'
import Home from './paginas/Home'
import Login from './paginas/Login'
import HomeLogado from './paginas/HomeLogado'
import { History } from 'swiper'

const Root = (history) => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/inicio" element={<HomeLogado />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  )
}

export default Root

//
