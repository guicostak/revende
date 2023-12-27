import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/Home';
import ScrollReset from './utils/ScrollReset';
import ConfirmPage from './pages/ConfirmPage';  
import MinhaConta from './pages/MinhaConta'
import CadastroIngressos from './pages/CadastroIngressos'
import PesquisarIngressos from './pages/PesquisarIngressos';

const Root = () => {
  return (
    <Router>
      <ScrollReset />
      <Routes>
        <Route path="/confirm/:token" element={<ConfirmPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/minha-conta/meu-perfil" element={<MinhaConta secao={'Meu perfil'} />} />
        <Route path="/ingressos/cadastro" element={<CadastroIngressos />} />
        <Route path="/pesquisar/:item" element={<PesquisarIngressos />} />
      </Routes>
    </Router>
  );
}

export default Root;
