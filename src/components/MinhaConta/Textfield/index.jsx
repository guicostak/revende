import React, { useState } from 'react';
import './Textfield.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import '../../../layouts/public/Login/Login.scss';
import Botao from '../../public/Botao';

const Textfield = ({ labelText, inputValue, inputType, inputsModal, modalTitle, isAlterable, onBlur, resetFormMessage }) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [activeAnimation, setActiveAnimation] = useState('pop-up 0.2s ease-in-out');
    const [inputValues, setInputValues] = useState(inputsModal.map(input => input.inputValue));

    const inputBlur = (e) => {
      onBlur(e)
    }

    const editar = () => {
        setModalOpen(true);
    }
    
    const showPassword = (type) => {
      console.log(type)
      if (type === 'text') {
          type = 'password';
      } else {
          type = 'text';
      }
  }

    const closeModal = () => {
        setActiveAnimation('pop-down 0.2s ease-in-out');
        setTimeout(() => {
            setActiveAnimation('pop-up 0.2s ease-in-out');
            setModalOpen(false);
            resetInputValues();
        }, 170);
    }

    const saveChanges = () => {
        const updatedInputsModal = inputsModal.map((input, index) => ({
            ...input,
            inputValue: inputValues[index]
        }));
        

        setActiveAnimation('pop-down 0.2s ease-in-out');
        setTimeout(() => {
            setActiveAnimation('pop-up 0.2s ease-in-out');
            setModalOpen(false);
        }, 170);
    }

    const resetInputValues = () => {
        const initialInputValues = inputsModal.map(input => input.inputValue);
        resetFormMessage()
        setInputValues(initialInputValues);
    }

    return (
        <div className='textfield-info'>
            <label>{labelText}</label>
            <div className='textfield-row'>
                <input type={inputType} value={inputValue}></input>
                <FontAwesomeIcon
                    className="icone-info"
                    icon={faPencil}
                    style={{ color: '#E82C4F', display: isAlterable ? 'flex' : 'none' }}
                    onClick={editar}
                />
            </div>

            {isModalOpen && (
                <div style={{ animation: activeAnimation }} className="container-modal">
                    <div className="modal container-fluid modal-edit">
                        <p className='sair' onClick={closeModal}>x</p>
                        <h1 className='titulo-edit'>{modalTitle}</h1>
                        {inputsModal.map((input, index) => (
                            <div key={index}>
                                <label>{input.labelText}</label>
                                <div className='input-edit'>
                                <input
                                    type={input.inputName.substring(0, input.inputName.length - 1) === 'password' ? input.inputType : inputType}
                                    value={inputValues[index]}
                                    name={input.inputName}
                                    onBlur={inputBlur}
                                    onChange={(e) => {
                                        const updatedValue = e.target.value;
                                        const newInputValues = [...inputValues];
                                        newInputValues[index] = updatedValue;
                                        setInputValues(newInputValues);
                                    }}
                                />
                                  <FontAwesomeIcon className='icone' onClick={() => showPassword(input.inputType)} icon={input.icone} style={{display: input.inputName.substring(0, input.inputName.length - 1) === 'password' ? 'flex' : 'none', cursor: 'pointer', fontSize: '0.9rem'}} />
                                </ div>
                                    <span className='avisos'>{input.mensagemCampo}</span>
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

export default Textfield;
