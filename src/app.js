import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Cadastro from './paginas/Cadastro'
import Home from './paginas/Home'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/cadastro' element={<Cadastro />} />
      </Routes>
    </Router>
  )
}

export default App
