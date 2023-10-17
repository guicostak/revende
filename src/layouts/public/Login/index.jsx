import React, { useState, useEffect } from 'react';
import './Login.scss';
import axios from 'axios';
import Botao from '../../../components/public/Botao';
import { faLock, faUser, faIdCard, faEnvelope} from '@fortawesome/free-solid-svg-icons';
import ReCAPTCHA from "react-google-recaptcha";
import Textfield from '../../../components/home/Textfield';

const Modal = ({ displayStatus, closeModal, isLogin, changeModal }) => {
const [activeAnimation, setActiveAnimation] = useState('pop-up 0.2s ease-in-out');
const [formData, setFormData] = useState({});
const [formMensagem, setFormMensagem] = useState({});
const [displayConfirmarEmail, setDisplayConfirmarEmail] = useState('none')
const listIcons = [
  faUser, 
  faIdCard,
  faEnvelope,
  faLock
];
const mensagensDeErro = {
  'none': '',
  'empty': 'Campo obrigatório*',
  'name': 'Tem certeza que digitou o seu nome corretamente ?',
  'cpf': 'CPF inválido*',
  'email': 'E-mail inválido*',
  'passwordSize': 'Sua senha deve conter ao menos 8 caracteres*',
  'passwordWeek': 'Sua senha deve conter uma combinação de letras maiúsculas, letras minúsculas, números e caracteres especiais (por exemplo, !, @, #, $, %, ^, &).*',
};

function formatCPF(cpf) {
  cpf = cpf.replace(/\D/g, '');

  cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
  cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
  cpf = cpf.replace(/(\d{3})(\d{1,2})/, '$1-$2');

  return cpf;
}

function validaEmail(email) {
  const trimmedEmail = email.trim(); 
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(trimmedEmail);
}

function validaNome(nome) {
  var padrao = /^[A-Za-z\s]+$/;  
  return padrao.test(nome);
}


function validaSenha(senha) {
  const possuiNumero = /[0-9]/.test(senha);
  const possuiMaiuscula = /[A-Z]/.test(senha);
  const possuiMinuscula = /[a-z]/.test(senha);
  const possuiCaractereEspecial = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(senha);
  return possuiNumero && possuiMaiuscula && possuiMinuscula && possuiCaractereEspecial;
}



const handleChange = (e) => {
  const { name, value } = e.target;
  let updatedValue = value;

  if (name === 'cpf') {
    updatedValue = formatCPF(value);
  }

  setFormData({
    ...formData,
    [name]: updatedValue,
  });
  
  setFormMensagem({
    ...formMensagem,
    [name]: mensagensDeErro.none,
  });
};

  const validaCampos = (e) => {
    const { name, value } = e.target; 

    if(isLogin) {}
    else{
      if(value === '') {
        setFormMensagem({
          ...formMensagem,
          [name]: mensagensDeErro.empty,
        });
        return;
      }
      else{
        switch (name) {
          case 'name':
            if (!validaNome(value)) {
              setFormMensagem({
                ...formMensagem,
                [name]: mensagensDeErro.name,
              });
              return;
            } 
            break;
          case 'cpf':
            if (value.length < 14) {
              setFormMensagem({
                ...formMensagem,
                [name]: mensagensDeErro.cpf,
              });
              return;
            }        
            break;
          case 'email':
            if (!validaEmail(value)) {
              setFormMensagem({
                ...formMensagem,
                [name]: mensagensDeErro.email,
              });
              return;
            } 
            break;
          case 'password':
            if (value.length < 8) {
              setFormMensagem({
                ...formMensagem,
                [name]: mensagensDeErro.passwordSize,
              });
              return;
            } else if (!validaSenha(value)) {
              setFormMensagem({
                ...formMensagem,
                [name]: mensagensDeErro.passwordWeek,
              });
              return;
            }    
            break;
        }
        setFormMensagem({
          ...formMensagem,
          [name]: mensagensDeErro.none,
        });
      }
    }
  }    

  const login = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', formData);
      const responseData = response.data.message;
      console.log('Response data (message):', responseData);
    } catch (error) {

   
    }

  }

  const register = async () => {
    try {
  
      const response = await axios.post('http://localhost:8080/api/users/register', formData);
      const responseData = response.data.message;
      console.log('Response data (message):', responseData);
    } catch (error) {

      let errorMessage = JSON.stringify(error.response.data.message);
      const parts = errorMessage.split(":");
      const message = parts[1].trim();
      
      setFormMensagem({
        ...formMensagem,
        password: message.replace(/[^\w\sÀ-ú]/gi, ''),
      });
    }

  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(isLogin) {
      login();
    } 
    else {
      register();
    }

  };

  const close = () => {
      setActiveAnimation('pop-down 0.2s ease-in-out')
      setTimeout(() => {
        emptyForms();
        closeModal();   
        setActiveAnimation('pop-up 0.2s ease-in-out');
    }, 170);
  }

  const emptyForms = () => {
    const emptyFormData = Object.keys(formData).reduce((acc, key) => {
      acc[key] = '';
      return acc;
    }, {});
    setFormMensagem(emptyFormData)
    setFormData(emptyFormData) 
  }

  const handleModalType = () => {
    setActiveAnimation('pop-down 0.2s ease-in-out')
      setTimeout(() => { 
        emptyForms();
        changeModal();
        setActiveAnimation('pop-up 0.2s ease-in-out');
    }, 170);
  }

  const confirmarEmail = () => {
    
  }

  return (
    <>
    <div  style={{display: displayConfirmarEmail, animation: activeAnimation}} className='container-modal'>
      <div className="modal container-fluid">
        
      </div>
    </div>
    <div  style={{display: displayStatus, animation: activeAnimation}} className='container-modal'>
      <div className="modal container-fluid">
        <p className='sair' onClick={close}>x</p>
        <h3>{isLogin ? 'Acesse sua conta' : 'Cadastre-se agora'}</h3>

        <Textfield
        displayTextfield={!isLogin ? 'flex' : 'none'}
        icone={listIcons[0]}
        typeInput={'text'}
        placeholderInput={'Nome completo'}
        nameInput={'name'}
        valueInput={formData.name} 
        onChangeInput={handleChange}  
        mensagemCampo={formMensagem.name}
        onBlur={validaCampos}  
        maxLength={255}
        />
        
        <Textfield
        displayTextfield={!isLogin ? 'flex' : 'none'}
        icone={listIcons[1]}
        typeInput={'text'}
        placeholderInput={'CPF'}
        nameInput={'cpf'}
        valueInput={formData.cpf} 
        onChangeInput={handleChange}  
        mensagemCampo={formMensagem.cpf}
        onBlur={validaCampos}    
        maxLength={14}
        />

        <Textfield
        displayTextfield={'flex'}
        icone={listIcons[2]}
        typeInput={'text'}
        placeholderInput={'E-mail'}
        nameInput={'email'}
        valueInput={formData.email} 
        onChangeInput={handleChange}
        mensagemCampo={formMensagem.email}
        onBlur={validaCampos}    
        maxLength={255}  
        />

        <Textfield
        displayTextfield={'flex'}
        icone={listIcons[3]}
        typeInput={'password'}
        placeholderInput={'Senha'}
        nameInput={'password'}
        valueInput={formData.password} 
        onChangeInput={handleChange}
        mensagemCampo={formMensagem.password}
        onBlur={validaCampos} 
        maxLength={255}     
        />

        <div style={{ display: isLogin ? 'flex' : 'none' }} className='manter-logado'>
            <input type='checkbox'/>
            <span>Mantenha-me conectado</span>
        </div>
      
        <div style={{ display: !isLogin ? 'flex' : 'none' }} className='col-md-12'>
          <ReCAPTCHA
            sitekey="SUA_CHAVE_DO_RECAPTCHA"
            onChange={''}  
          />
        </div>

        <Botao
        text={isLogin ? 'entrar' : 'cadastrar'}
        typeButton={'submit'}
        onClick={handleSubmit}
        />

        <div className='adicional'>
          <span>
            {isLogin ? (
              <>
                Esqueceu sua senha? <a className='ancoras'>Recuperar senha</a>
              </>
            ) : (
              <>
                Ao me cadastrar concordo com os{' '}
                <a className='ancoras'>termos e condições</a>
              </>
            )}
          </span>
        </div>
     
        <nav className='modal-nav'>
            <span>
              {!isLogin
                ? 'Já possui conta? '
                : 'Não possui conta? '}
              <a onClick={handleModalType} className='ancoras'>
                {!isLogin
                  ? 'Faça login!'
                  : 'Cadastre-se!'}
              </a>
            </span>
        </nav>
      </div>
    </div>
    </>
  );
};

export default Modal;
