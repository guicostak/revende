import Logo from './componentes/Logo'
import Formulario from './componentes/Formulario'
import Rodape from './componentes/Rodape'
import './cadastro.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Logo />
      <Formulario />
      <Rodape />
    </div>
  )
}

export default App
