import React, { useState, useEffect, useContext } from 'react';
import './Login.scss';
import axios from 'axios';
import Botao from '../../../components/public/Botao';
import { faLock, faUser, faIdCard, faEnvelope, faCircleCheck, faCircleXmark} from '@fortawesome/free-solid-svg-icons';
import ReCAPTCHA from "react-google-recaptcha";
import Textfield from '../../../components/home/Textfield';
import Cookies from 'js-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LoadingDots from '../../../utils/LoadingDots';
import AuthenticatedMessage from '../../../components/public/AuthenticatedMessage';

const Login = ({ displayStatus, closeModal, isLogin, changeModal }) => {
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
const [contadorReenviar, setContadorReenviar] = useState(0);
const [isLoading, setIsLoading] = useState(false)
const [emailUsuario, setEmailUsuario] = useState()
const [emailNaoConfirmado, setEmailNaoConfirmado] = useState(false)
const [authenticatedMessage ,setAuthenticatedMessage] =useState(false)

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
  setEmailNaoConfirmado(false)

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

  const validaTodosCampos = () => {
    let campos = [{}];
    
    if(isLogin) {
      campos = [
        { name: 'email', value: formData.email },
        { name: 'password', value: formData.password },
      ];
    }
    else {
    campos = [
      { name: 'email', value: formData.email },
      { name: 'password', value: formData.password },
      { name: 'cpf', value: formData.cpf },
      { name: 'name', value: formData.name }
    ];
    }
    const newFormMensagem = {};
  
    campos.forEach((campo) => {
      if (!campo.value) {
        newFormMensagem[campo.name] = mensagensDeErro.empty;
      }
      else{
        switch (campo.name) {
          case 'name':
            if (!validaNome(campo.value)) {
              newFormMensagem[campo.name] = mensagensDeErro.name;
            }
            break;
          case 'cpf':
            if (campo.value.length < 14) {
              newFormMensagem[campo.name] = mensagensDeErro.cpf;
            }
            break;
          case 'email':
            if (!validaEmail(campo.value)) {
              newFormMensagem[campo.name] = mensagensDeErro.email;
            }
            break;
          case 'password':
            if (campo.value.length < 8 && !isLogin) {
              newFormMensagem[campo.name] = mensagensDeErro.passwordSize;
            } else if (!validaSenha(campo.value) && !isLogin) {
              newFormMensagem[campo.name] = mensagensDeErro.passwordWeek;
            }
            break;
        }
      }
    });
  
    setFormMensagem({
      ...formMensagem,
      ...newFormMensagem,
    });

    const isFormMensagemEmpty = Object.values(newFormMensagem).every((value) => value === '');
  

    return isFormMensagemEmpty;
  };
  
  const login = async () => {
    setIsLoading(true)

    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', formData);
      const responseStatus = response.status;
  
      if (responseStatus === 200) {
        setIsLoading(false)
        setAuthenticatedMessage(true)
        const { access_token, expires, id, email, name, refresh_token } = response.data;
        setAuthenticatedMessage(true)
        console.log(expires)
        Cookies.set('access_token', access_token);
        Cookies.set('expires', expires);
        Cookies.set('id', id);
        Cookies.set('email', email);
        Cookies.set('name', name);
        Cookies.set('refresh_token', refresh_token);
        Cookies.set('isAthenticated', true);

        setTimeout(function() {
          close()
          window.location.reload();
        }, 1000);
      }
    } catch (error) {
      setIsLoading(false)

      if(error.response.data === 'Confirme o email antes de seguir com o login') {
        setEmailNaoConfirmado(true)
        console.log(error.response.data)
      }
      if(error.response.data.message === 'E-mail ou senha inválidos' || error.response.data === 'Usuário não encontrado') {
        setFormMensagem({
          ...formMensagem,
          password: 'E-mail ou senha incorretos',
        });
      }
    }
  };
  
  const register = async () => {
    setIsLoading(true)

    try {
      const response = await axios.post('http://localhost:8080/api/users/register', formData);
      const responseData = response.data.message;
      setEmailUsuario(formData.email)
      close()
      setTimeout(() => {
        setDisplayConfirmarEmail('flex')
    }, 180);
    setIsLoading(false)
    } catch (error) {
      setIsLoading(false);
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
    setEmailUsuario(formData.email)

    const camposValidos = validaTodosCampos();

    if (!camposValidos) {
      return;
    }

    if (isLogin) {
      login();
    } else {
      register();
    }
  };
    
  function handleKeyPress(event) {
    if (event.key === 'Enter') {
        handleSubmit(event);
    } 
}

  const close = () => {
      setActiveAnimation('pop-down 0.2s ease-in-out')
      setContadorReenviar(0);
      setEmailNaoConfirmado(false)
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
    setActiveAnimation('pop-down 0.2s ease-in-out');
    setContadorReenviar(0);
      setTimeout(() => { 
        emptyForms();
        changeModal();
        setActiveAnimation('pop-up 0.2s ease-in-out');
    }, 170);
  }

  const closeConfirmarEmail = () => {
    close();
    setActiveAnimation('pop-down 0.2s ease-in-out')
    setTimeout(() => {
      setDisplayConfirmarEmail('none')
      setActiveAnimation('pop-up 0.2s ease-in-out');
  }, 170);
  }

  const reenviarEmail = async () => {
    setIsLoading(true)
    if(contadorReenviar === 0 || !contadorReenviar) {
      setContadorReenviar(90);
      const intervalId = setInterval(() => {
        setContadorReenviar((prevContador) => {
          if (prevContador === 1) {
            clearInterval(intervalId);
            return '';
          }
          return prevContador - 1;
        });
      }, 1000);

      try   {
        const response = await axios.get(`http://localhost:8080/api/users/resend_confirmation?email=${emailUsuario}`);
  
      setIsLoading(false)
      } catch (error) {
        console.log(error)
      }  

    }  
  };

  return (
    <>
    <div  style={{display: displayConfirmarEmail, animation: activeAnimation}} className='fundo-modal'>
      <div className="modal container-fluid confirmar-email">
      <p className='sair' onClick={closeConfirmarEmail}>x</p>
      <LoadingDots
        displayStatus={isLoading}
        />
      
        <h3>Email de verificação enviado!</h3>
        <p>Por favor verifique sua caixa de entrada ou sua caixa de spam. E-mail enviado para:</p>
        <p style={{color: 'var(--main-color)'}}>{emailUsuario}</p>
        <Botao
        text={'OK'} 
        onClick={closeConfirmarEmail}
        />
         <span style={{display: contadorReenviar > 1 ? 'flex' : 'none'}}>{`Enviar novamente em ${contadorReenviar} segundos`}</span>
        <p>Não recebeu o e-mail ? <b onClick={reenviarEmail} style={{color: contadorReenviar > 0 ? 'grey' : 'var(--main-color)', cursor:  contadorReenviar > 0 ? 'default' : 'pointer', textDecoration:  contadorReenviar > 0 ? 'none' : 'underline'  }}>Reenviar aqui</b></p>
      </div>
    </div>
    <div  style={{display: displayStatus, animation: activeAnimation}} className='fundo-modal container-fluid col-md-12'>
      <div className="modal">
        <p className='sair' onClick={close}>x</p>

        <AuthenticatedMessage
        displayStatus={authenticatedMessage} 
        usuario={Cookies.get('name')}
        />

        <LoadingDots
        displayStatus={isLoading}
        />

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
        onKeyPress={(e) => handleKeyPress(e)}
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
        onKeyPress={(e) => handleKeyPress(e)}
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
        onKeyPress={(e) => handleKeyPress(e)}
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
        onKeyPress={(e) => handleKeyPress(e)} 
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

        <div style={{display: emailNaoConfirmado && isLogin ? 'flex' : 'none'}} className="error-message">
          <div className='error-top'>
            <p>Você deve confirmar seu e-mail antes de efetuar o login
            <FontAwesomeIcon className='icone' icon={faCircleXmark} style={{color: 'var(--main-color)', marginLeft: '0.5rem'}} />
            </p>
          </div>
          <span style={{display: contadorReenviar > 1 ? 'flex' : 'none'}}>{`Enviar novamente em ${contadorReenviar} segundos`}</span>
          <p>Não recebeu o e-mail ? <b onClick={reenviarEmail} style={{color: contadorReenviar > 0 ? 'grey' : 'var(--main-color)', cursor:  contadorReenviar > 0 ? 'default' : 'pointer', textDecoration:  contadorReenviar > 0 ? 'none' : 'underline'  }}>Reenviar aqui</b></p>
        </div>

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

export default Login;
