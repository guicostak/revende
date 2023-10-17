import { Link } from 'react-router-dom'
import './Categoria.scss'

const Categoria = ({categoria, icone}) => {
    return(
    <div className='categoria container-fluid'>
        <div className='categoria-img col-md-12'>
            <Link>
            {icone}       
            </Link>          
        </div>
        <div className='text-center categoria-texto col-md-12'>
            <Link className='link'>
                <span> {categoria} </span>
            </Link> 
        </div>
    </div>
    )
}

export default Categoria