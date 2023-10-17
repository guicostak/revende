import './CardMeuPerfil.scss'
import NavMinhaConta from '../../../components/MinhaConta/NavMinhaConta'
import Textfield from '../../../components/MinhaConta/Textfield'
import React, { useState } from 'react';
import { faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';

const Card = () => {
    const [formMensagem, setFormMensagem] = useState({});
    const mensagensDeErro = {
        'none': '',
        'empty': 'O campo não pode ser vazio*',
        'name': 'Tem certeza que digitou o seu nome corretamente ?',
        'cpf': 'CPF inválido*',
        'email': 'E-mail inválido*',
        'passwordSize': 'Sua senha deve conter ao menos 8 caracteres*',
        'passwordWeek': 'Sua senha deve conter uma combinação de letras maiúsculas, letras minúsculas, números e caracteres especiais (por exemplo, !, @, #, $, %, ^, &).*',
      };
      const[passwordIcon1, setPasswordIcon1] = useState(faEyeSlash)
      const[passwordIcon2, setPasswordIcon2] = useState(faEyeSlash)
      const[passwordIcon3, setPasswordIcon3] = useState(faEyeSlash)

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
      
      const showPassword = () => {
        alert('opa')
      }

      const validaCampos = (e) => {
        const { name, value } = e.target; 

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
                    case 'password2':
                    case 'password3':
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
    
      const resetFormMessage = () => {
        const initialFormMessage = {};
        for (const key in formMensagem) {
          initialFormMessage[key] = '';
        }
        setFormMensagem(initialFormMessage);
      }
      
    const textfieldsData = [
        {
            labelText: 'Nome completo',
            inputValue: 'Guilherme Costa',
            modalTitle: 'Alterar nome',
            isAlterable: true,
            inputsModal: [
                {
                    labelText: 'Nome completo',
                    inputType: 'text',
                    inputValue: 'Guilherme Costa' ,
                    inputName: 'name',
                    mensagemCampo: formMensagem.name
                }
            ]
        },
        {
            labelText: 'Email',
            inputValue: 'guilhermecosta.barros@gmail.com',
            modalTitle: 'Alterar email',
            isAlterable: true,
            inputsModal: [
                {
                    labelText: 'Email',
                    inputType: 'email',
                    inputValue: 'guilhermecosta.barros@gmail.com' ,
                    inputName: 'email',
                    mensagemCampo: formMensagem.email
                }
            ]
        },
        {
            labelText: 'CPF',
            inputValue: '113.478.616-61',
            modalTitle: 'Alterar CPF',
            isAlterable: false,
            inputsModal: [
                {
                    labelText: 'CPF',
                    inputType: 'text',
                    inputValue: '113.478.616-61' ,
                    inputName: 'cpf',
                    mensagemCampo: formMensagem.cpf
                }
            ]
        },
        {
            labelText: 'Senha',
            inputType: 'password',
            inputValue: '123456',
            modalTitle: 'Alterar senha',
            isAlterable: true,
            inputsModal: [
                {
                    labelText: 'Senha atual',
                    inputType: 'password',
                    inputValue: '' ,
                    inputName: 'password1',
                    mensagemCampo: formMensagem.password1,
                    icone: passwordIcon1
                },
                {
                    labelText: 'Nova senha',
                    inputType: 'password',
                    inputValue: '' ,
                    inputName: 'password2',
                    mensagemCampo: formMensagem.password2,
                    icone: passwordIcon2
                },
                {
                    labelText: 'Confirmar nova senha',
                    inputType: 'password',
                    inputValue: '' ,
                    inputName: 'password3',
                    mensagemCampo: formMensagem.password3,
                    icone: passwordIcon3
                }
            ]
        }
    ];

    return (
        <div className='card-bottom col-md-12'>
            <NavMinhaConta selected='Meu perfil' />
            <div className='secao'>
                <h4 className='titulo-secao'>Dados do perfil</h4>
                <div className='info-meu-perfil'>
                    {textfieldsData.map((field, index) => (
                        <Textfield
                            key={index}
                            labelText={field.labelText}
                            inputType={field.inputType}
                            inputValue={field.inputValue}
                            isAlterable={field.isAlterable}
                            modalTitle={field.modalTitle}
                            inputsModal={field.inputsModal} 
                            showPassword={(() => showPassword())}
                            resetFormMessage={() => resetFormMessage()}
                            onBlur={validaCampos}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Card;
