import React, { useState } from 'react';
import './Textfield.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import '../../../layouts/public/Login/Login.scss';
import Botao from '../../public/Botao';
import Cookies from 'js-cookie';
import axios from 'axios';
import LoadingDots from '../../../utils/LoadingDots';
import SuccessfullyChangeMessage from '../../public/SuccessfullyChangeMessage';


const Textfield = ({ labelText, inputValue, inputType, modalTitle, isAlterable, onBlur, inputName, mensagemCampo, aoDigitado, cancelar, valorInicial, mensagensDeErro, validaCampos}) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [activeAnimation, setActiveAnimation] = useState('pop-up 0.2s ease-in-out');
    const id = Cookies.get('id');
    const token = Cookies.get('access_token');
    const [isLoading, setIsLoading] = useState(false)
    const [successfullyChangeMessage, setSuccesfullyChangeMessage] = useState(false)
   
    
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
            cancelar(valorInicial, inputName)
        }, 170);
    }

    const validaAlteracao = () => {    
        if(!mensagensDeErro.name && !mensagensDeErro.email ) {
            return true
        }
        return false
    }

    const saveChanges = () => {
        if(valorInicial === inputValue) {
            closeModal()
            return;
        }
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
      
      
      function handleKeyPress(e) {
            if (e.key === 'Enter' && validaCampos(e)) {
                saveChanges();
            }   
    }

    return (
        <div className='textfield-info'>
            <label>{labelText}</label>
            <div className='textfield-row'>
                <input type={inputType} value={valorInicial}></input>
                <FontAwesomeIcon
                    className="icone-info"
                    icon={faPencil}
                    style={{ color: '#E82C4F', display: isAlterable ? 'flex' : 'none' }}
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
                     
                            <div >
                                <label>{labelText}</label>
                                <div className='input-edit'>
                                <input
                                    type={inputType}
                                    value={inputValue}
                                    name={inputName}
                                    onBlur={inputBlur}
                                    onKeyDown={handleKeyPress}
                                    onChange={(e) => {
                                        aoDigitado(e, inputName)
                                    }}
                                />
                                </ div>
                                <span className='avisos'>{mensagemCampo}</span>
                            </div>
        
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

export default Textfield;
