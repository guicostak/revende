import './Textfield.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

const Textfield = ({ displayTextfield, icone, typeInput, placeholderInput, nameInput, valueInput, onChangeInput, mensagemCampo, onBlur, maxLength, onKeyPress }) =>{
  
  const[type, setType] = useState(typeInput)
  const[passwordIcon, setPasswordIcon] = useState(faEyeSlash)
  
  
  const inputFocus = (e) => {
        const parentElement = e.target.parentElement;
        parentElement.style.borderBottom = '1px solid black'; 
      }
      
      const inputBlur = (e) => {
        const parentElement = e.target.parentElement;
        parentElement.style.borderBottom = `1px solid var(--main-color)`;
        onBlur(e)
      }

      const showPassword = () => {
        if(type === 'text'){
          setPasswordIcon(faEyeSlash)
          setType('password')
        }
        else{
          setPasswordIcon(faEye)
          setType('text')
        }
      }

      function handleKeyPress (e) {
        onKeyPress(e);
      }
    
    return(
        <div style={{display: displayTextfield }} className='textfield col-md-12'>
            <div className="input" >
            <FontAwesomeIcon className='icone' icon={icone}  />
            <input   
                autoComplete='off'    
                type={type}
                placeholder={placeholderInput}
                name={nameInput}
                value={valueInput}
                onChange={onChangeInput}
                onFocus={inputFocus}
                onBlur={inputBlur}
                maxLength={maxLength}
                onKeyDown={handleKeyPress}
            />
            <FontAwesomeIcon className='icone' onClick={showPassword} icon={passwordIcon} style={{display: nameInput === 'password' ? 'flex' : 'none', cursor: 'pointer', fontSize: '0.9rem'}} />
            </div>
            <span className='avisos'>{mensagemCampo}</span>
      </div>
    )
}

export default Textfield