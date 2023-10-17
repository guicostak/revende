import './Botao.scss'
import { Link } from 'react-router-dom';

const Botao = ({text, onClick, path, typeButton, buttonWidth}) =>{
    return(
        <div className='container-fluid'>
        <Link to={path}>
            <button style={{width: buttonWidth}} onClick={onClick} type={typeButton}>{text}</button>
        </Link>
        </div>
    )
}

export default Botao;