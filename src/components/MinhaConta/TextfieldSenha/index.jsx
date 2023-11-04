import '../../MinhaConta/Textfield/Textfield.scss'
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faEye, faEyeSlash, faEarDeaf } from '@fortawesome/free-solid-svg-icons';
import '../../../layouts/public/Login/Login.scss';
import Botao from '../../public/Botao';
import Cookies from 'js-cookie';
import axios from 'axios';
import LoadingDots from '../../../utils/LoadingDots';
import SuccessfullyChangeMessage from '../../public/SuccessfullyChangeMessage';

const TextfieldSenha = ({inputValue, onBlur, cancelar, valorInicial, mensagensDeErro, modalTitle, aoDigitado, validarTodos }) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [activeAnimation, setActiveAnimation] = useState('pop-up 0.2s ease-in-out');
    const id = Cookies.get('id');
    const token = Cookies.get('access_token');
    const [isLoading, setIsLoading] = useState(false)
    const [successfullyChangeMessage, setSuccesfullyChangeMessage] = useState(false)
    const [passwordFields, setPasswordFields] = useState([
        { type: 'password', icon: faEyeSlash },
        { type: 'password', icon: faEyeSlash },
        { type: 'password', icon: faEyeSlash },
      ]);

    const inputBlur = (e) => {
        onBlur(e)
      }
  
      const editar = () => {
          setModalOpen(true);
      }
      
      const closeModal = () => {
          
          setActiveAnimation('pop-down 0.2s ease-in-out');
          setTimeout(() => {
              setActiveAnimation('pop-up 0.2s ease-in-out');
              setModalOpen(false);
              cancelar(valorInicial, 'password')
          }, 170);
      }
  
    const validaAlteracao = () => {
        validarTodos()
        if (!mensagensDeErro.senhaAtual) {
            return true
        }
        return false
    }
  
      const saveChanges = () => {
          
        
          if(validaAlteracao()) {
          setIsLoading(true);
          const apiUrl = `http://localhost:8080/api/users/${id}`;
          const headers = {
            Authorization: `Bearer ${token}`,
          };
          const data = {
            'name': inputValue,
          };
        
          axios.patch(apiUrl, data, { headers })
            .then(response => {
             
              setTimeout(() => {
                  setIsLoading(false);
                  setSuccesfullyChangeMessage(true);
                      setTimeout(() => {  
                      window.location.reload();    
                      }, 600);
              }, 700);
            })
            .catch(error => {
              setIsLoading(false);
              console.error('Erro na requisição PATCH:', error);
            });
          }
        };  

        const showPassword = (index) => {
            const updatedPasswordFields = [...passwordFields];
          
            if (updatedPasswordFields[index].type === 'password') {
              updatedPasswordFields[index].type = 'text';
              updatedPasswordFields[index].icon = faEye;
            } else {
              updatedPasswordFields[index].type = 'password';
              updatedPasswordFields[index].icon = faEyeSlash;
            }
          
            setPasswordFields(updatedPasswordFields);
        };             

              
      function handleKeyPress(e) {
        if (e.key === 'Enter' && validarTodos()) {
            saveChanges();
        }   
    }

    return(
        <div className='textfield-info' style={{userSelect: 'none'}}>
        <label>Senha</label>
        <div className='textfield-row'>
            <input type={'password'} value={valorInicial}></input>
            <FontAwesomeIcon
                className="icone-info"
                icon={faPencil}
                style={{ color: '#E82C4F'}}
                onClick={editar}
            />
        </div>

        {isModalOpen && (
            <div style={{ animation: activeAnimation }} className="fundo-modal">
                <div className="modal container-fluid modal-edit">
                    <p className='sair' onClick={closeModal}>x</p>
                    <SuccessfullyChangeMessage 
                    displayStatus={successfullyChangeMessage}
                    message={'Alteração realizada com sucesso!'}
                    />
                    <LoadingDots
                    displayStatus={isLoading}
                    />
                    <h1 className='titulo-edit'>{modalTitle}</h1>
                 
                    {passwordFields.map((field, index) => (
                    <div key={index}>
                        <label>{index === 0 ? 'Senha atual' : index === 1 ? 'Nova senha' : 'Confirmação da nova senha'}</label>
                        <div className="input-edit">
                        <input
                            type={field.type}
                            value={inputValue[index]}
                            name={index === 0 ? 'password1' : index === 1 ? 'password2' : 'password3'}
                            onBlur={inputBlur}
                            onKeyDown={(e) => handleKeyPress(e)}
                            onChange={(e) => {
                            aoDigitado(e, index === 0 ? 'password1' : index === 1 ? 'password2' : 'password3');
                            }}
                        />
                        <FontAwesomeIcon
                            className="icone-info"
                            icon={field.icon}
                            style={{ color: '#E82C4F', cursor: 'pointer' }}
                            onClick={() => showPassword(index)}
                        />
                        </div>
                        <span className="avisos">{mensagensDeErro[`password${index + 1}`]}</span>
                    </div>
                    ))}
                        
                    <div className='botoes-edit'>
                        <span onClick={closeModal}>Cancelar</span>
                        <Botao
                            text={'Salvar alterações'}
                            typeButton={'button'}
                            onClick={saveChanges}
                        />
                    </div>
                </div>
            </div>
        )}
    </div>
    )
}

export default TextfieldSenha;