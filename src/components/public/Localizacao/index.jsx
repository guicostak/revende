import { faChevronDown, faCircleQuestion } from '@fortawesome/free-solid-svg-icons';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Localizacao.scss'

const Localizacao = () => {
return(
<div className='localizacao row col-sm-12'>
    <div className='col-md-1 align-items-center col-sm-1'>
        <FontAwesomeIcon className='icone' icon={faLocationDot} style={{ color: '#E82C4F' , fontSize: '1.1rem'}} />
    </div>
    <div className='col-md-6 col-sm-8'>
        <span className='localizacao-texto'>Qualquer lugar</span>
    </div>
    <div className='col-md-1 col-sm-1'>
        <FontAwesomeIcon className='icone' icon={faChevronDown} style={{ color: '#E82C4F' , fontSize: '1.1rem'}} />
    </div>
</div>
)
}

export default Localizacao