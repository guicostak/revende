import './CardMeuPerfil.scss'
import NavMinhaConta from '../../../components/MinhaConta/NavMinhaConta'
import Textfield from '../../../components/MinhaConta/Textfield'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import TextfieldSenha from '../../../components/MinhaConta/TextfieldSenha';

const Card = () => {
    const [formMensagem, setFormMensagem] = useState({});
    const mensagensDeErro = {
        'none': '',
        'empty': 'O campo não pode ser vazio*',
        'name': 'Tem certeza que digitou o seu nome corretamente ?',
        'cpf': 'CPF inválido*',
        'email': 'E-mail inválido*',
        'phoneNumber': 'Número de telefone inválido',
        'passwordSize': 'Sua senha deve conter ao menos 8 caracteres*',
        'passwordWeek': 'Sua senha deve conter uma combinação de letras maiúsculas, letras minúsculas, números e caracteres especiais (por exemplo, !, @, #, $, %, ^, &).*',
        'differentPasswords': 'O campo "Nova senha" e ""Confirmação da nova senha" devem ser iguais'
      };

      const [cpf, setCpf] = useState('');
      const [email, setEmail] = useState('');
      const [phone_number, setPhoneNumber] = useState('');
      const [passwords, setPasswords] = useState(['', '', '']);
      const [name, setName] = useState('');
      const [initialPhoneNumber, setInitialPhoneNumber] = useState('')
      const [initialCpf, setInitialCpf] = useState('');
      const [initialEmail, setInitialEmail] = useState('');
      const [initialName, setInitialName] = useState('');
    
      function formatPhoneNumber(phoneNumber) {
        phoneNumber = phoneNumber.replace(/\D/g, '');
      
        if (phoneNumber.length === 10) {
          phoneNumber = phoneNumber.replace(/(\d{2})(\d{4})(\d{3})/, '($1) $2-$3');
        } else if (phoneNumber.length === 11) {
          phoneNumber = phoneNumber.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
        } else {  
          return phoneNumber;
        }
      
        return phoneNumber;
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

      const validaCampos = (e) => {
        const { name, value } = e.target; 
          if(value === '') {
            setFormMensagem({
              ...formMensagem,
              [name]: mensagensDeErro.empty,
            });
            return false;
          }
          else{
            switch (name) {
              case 'name':
                if (!validaNome(value)) {
                  setFormMensagem({
                    ...formMensagem,
                    [name]: mensagensDeErro.name,
                  });
                  return false;
                } 
                break;
              case 'cpf':
                if (value.length < 14) {
                  setFormMensagem({
                    ...formMensagem,
                    [name]: mensagensDeErro.cpf,
                  });
                  return false;
                }        
                break;
              case 'email':
                if (!validaEmail(value)) {
                  console.log('opa')
                  setFormMensagem({
                    ...formMensagem,
                    [name]: mensagensDeErro.email,
                  });
                  return false;
                } 
                break;
              case 'phone_number':
                if (value.length < 14) {
                  setFormMensagem({
                    ...formMensagem,
                    [name]: mensagensDeErro.phoneNumber,
                  });
                  return false;
                } 
                break;
            }
            setFormMensagem({
              ...formMensagem,
              [name]: mensagensDeErro.none,
            });
          }  
          return true;
      }    
    
      const resetFormMessage = () => {
        const initialFormMessage = {};
        for (const key in formMensagem) {
          initialFormMessage[key] = '';
        }
        setFormMensagem(initialFormMessage);
      }

      const validaCampoSenha = (e) => {
        const { name, value } = e.target;
      
        if(value === '') {
          setFormMensagem({
            ...formMensagem,
            [name]: mensagensDeErro.empty,
          });
          return false;
        } else{
          switch (name) {
            case 'password2':
              if (value.length < 8) {
                setFormMensagem({
                  ...formMensagem,
                  [name]: mensagensDeErro.passwordSize,
                });
              } else if (!validaSenha(value)) {
                setFormMensagem({
                  ...formMensagem,
                  [name]: mensagensDeErro.passwordWeek,
                });
              }
              
              break;
              case 'password3':
                if(passwords[1] !== passwords[2]){
                  setFormMensagem({
                    ...formMensagem,
                    password3: mensagensDeErro.differentPasswords,
                  });
                }

              break;  
          }
        }
      }
      
      useEffect(() => {
        const id = Cookies.get('id');
        const token = Cookies.get('access_token');
        const apiUrl = `http://localhost:8080/api/users/${id}`;
    
        const headers = {
          Authorization: `Bearer ${token}`,
        };
    
        axios
          .get(apiUrl, { headers })
          .then((response) => {
            const userData = response.data;
            setCpf(userData.cpf);
            setEmail(userData.email);
            setName(userData.name);
            setPhoneNumber(userData.phone_number)
            setInitialCpf(userData.cpf);
            setInitialEmail(userData.email);
            setInitialPhoneNumber(userData.phone_number)
            setInitialName(userData.name);
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      }, []); 

      function aoDigitado(e, inputName) {
        const { value } = e.target;
        setFormMensagem({
          ...formMensagem,
          [inputName]: mensagensDeErro.none,
        });

        switch (inputName) {
          case 'name':
           setName(value)
          break;
          case 'email':
            setEmail(value)
           break;
           case 'password1':
            const updatedPasswords = [...passwords];
            updatedPasswords[0] = value;
            setPasswords(updatedPasswords);
            break;
          case 'password2':
            const updatedPasswords2 = [...passwords];
            updatedPasswords2[1] = value;
            setPasswords(updatedPasswords2);
            break;
          case 'password3':
            const updatedPasswords3 = [...passwords];
            updatedPasswords3[2] = value;
            setPasswords(updatedPasswords3);
            break;
          case 'phone_number':
            setPhoneNumber(formatPhoneNumber(value));
            break;
        }
      }

      function cancelar(inputValue, inputName) {
        switch (inputName) {
          case 'name':
            setName(inputValue);
            break;
          case 'email':
            setEmail(inputValue);
            break;
          case 'password':
            const updatedPasswords = ['', '', ''];
            setPasswords(updatedPasswords);
            break;
        }
        emptyForm();
      }
           
      const emptyForm = () => {
       const emptyObject = {}
       setFormMensagem(emptyObject)
      }

      const validarTodos = () => {
        let isValid = true; 
      
        const campos = [
          { name: 'password1', value: passwords[0] },
          { name: 'password2', value: passwords[1] },
          { name: 'password3', value: passwords[2] },
        ];
      
        campos.forEach((campo) => {
          const { name, value } = campo;
          if (value === '') {
            setFormMensagem({
              ...formMensagem,
              [name]: mensagensDeErro.empty,
            });
            isValid = false; 
          } else {
            switch (name) {
              case 'password2':
                if (value.length < 8) {
                  setFormMensagem({
                    ...formMensagem,
                    [name]: mensagensDeErro.passwordSize,
                  });
                  isValid = false; 
                } else if (!validaSenha(value)) {
                  setFormMensagem({
                    ...formMensagem,
                    [name]: mensagensDeErro.passwordWeek,
                  });
                  isValid = false; 
                }
                break;
              case 'password3':
                if (passwords[1] !== value) {
                  setFormMensagem({
                    ...formMensagem,
                    password3: mensagensDeErro.differentPasswords,
                  });
                  isValid = false; 
                }
                break;
            }
          }
        });
      
        return isValid; 
      };
      

    const textfieldsData = [
        {
            labelText: 'Nome completo',
            inputValue: name,
            modalTitle: 'Alterar nome',
            isAlterable: true,
            inputName: 'name',
            mensagemCampo: formMensagem.name,
            valorInicial: initialName
        },
        {
            labelText: 'Email',
            inputValue: email,
            modalTitle: 'Alterar email',
            isAlterable: true,
            inputName: 'email',
            mensagemCampo: formMensagem.email,
            valorInicial: initialEmail
        },
        {
          labelText: 'Telefone',
          inputValue: phone_number,
          modalTitle: 'Alterar telefone',
          isAlterable: true,
          inputName: 'phone_number',
          mensagemCampo: formMensagem.phoneNumber,
          valorInicial: initialPhoneNumber
      },
        {
            labelText: 'CPF',
            inputValue: cpf,
            modalTitle: 'Alterar CPF',
            isAlterable: false,
            inputName: 'cpf',
            mensagemCampo: formMensagem.cpf,
           valorInicial: initialCpf
        },
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
                            inputName={field.inputName}
                            resetFormMessage={() => resetFormMessage()}
                            onBlur={validaCampos}
                            aoDigitado={(e, inputName) => aoDigitado(e, inputName)}
                            mensagemCampo={field.mensagemCampo}
                            cancelar={(value, name) => cancelar(value, name)}
                            valorInicial={field.valorInicial}
                            mensagensDeErro={formMensagem}
                            validaCampos={validaCampos}
                        />
                    ))}
                    <TextfieldSenha
                    inputType={'password'}
                    inputValue={passwords}          
                    onBlur={validaCampoSenha} 
                    cancelar={(value, name) => cancelar(value, name)}
                    valorInicial={'xxxxxxxxxxxxxxxxxxx'}
                    modalTitle={'Alterar senha'} 
                    aoDigitado={(e, inputName) => aoDigitado(e, inputName)}  
                    mensagemCampo={formMensagem.password}
                    mensagensDeErro={formMensagem}     
                    validarTodos={validarTodos}
                    />
                </div>
            </div>
        </div>
    );
}

export default Card;
