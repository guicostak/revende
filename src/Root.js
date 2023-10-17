import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/Home';
import ScrollReset from './utils/ScrollReset';
import ConfirmPage from './pages/ConfirmPage';  
import MinhaConta from './pages/MinhaConta'

const Root = () => {
  return (
    <Router>
      <ScrollReset />
      <Routes>
        <Route path="/confirm/:token" element={<ConfirmPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/minha-conta/meu-perfil" element={<MinhaConta secao={'Meu perfil'} />} />
      </Routes>
    </Router>
  );
}

export default Root;
