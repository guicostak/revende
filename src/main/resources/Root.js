import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Cadastro from './paginas/Cadastro'
import Home from './paginas/Home'
import Login from './paginas/Login'
import HomeLogado from './paginas/HomeLogado'
import CadIngressos from './paginas/CadIngressos'
import VerDetalhes from './paginas/VerDetalhes'
import ScrollReset from './ScrollReset'

const Root = () => {
  return (
    <Router>
      <ScrollReset />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/inicio" element={<HomeLogado />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/ingressos/cadastro" element={<CadIngressos />} />
        <Route path="/ingressos/detalhes" element={<VerDetalhes />} />
      </Routes>
    </Router>
  )
}
//<Route path="/ingressos/detalhes/:id" element={<VerDetalhes />} /> 

export default Root


