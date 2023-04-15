import './CardBottom.scss'
import Textfield from './Textfield' 
import TextfieldSenha from './TextfieldSenha' 
import usuario from '../../img/vetores/usuario.png'
import email from '../../img/vetores/email.png'
import cpf from '../../img/vetores/identidade.png'
import data from '../../img/vetores/data.png'
import senha from '../../img/vetores/senha.png'
import { useState } from 'react'
import React from "react";
import Swal from 'sweetalert2'
import ErrorMessage from './ErrorMessage'
import axios from 'axios'



const CardBottom = ({ displayState }) => {

  const[inputName, setInputName]= useState('')
  const[inputEmail, setInputEmail]= useState('')
  const[inputCpf, setInputCpf]= useState('')
  const[inputDate, setInputDate]= useState('')
  const[inputPassword, setInputPassword]= useState('')
  const[erroCamposVazios, setErroCamposVazios] = useState("none")
  const[erroCpf, setErroCpf] = useState("none")
  const[erroEmail, setErroEmail] = useState("none")


  function campoVazio() {
      setErroCamposVazios("flex")
      setTimeout(() => {
        setErroCamposVazios("none")
      }, "3000");
  }

  const efetuarCadastro = (e) => {
  
    let validName = false
    let validEmail = false
    let validCpf = false
    let validDate = false
    let validPassword = false

    e.preventDefault()

    if(!inputName){
      campoVazio()
      validName = false
    }
      else{
        validName = true
      }
    
    if(!inputEmail) {
      campoVazio()
      validEmail = false;
    }
    else if( inputEmail > 0 && inputEmail.indexOf('@') == -1 || inputEmail.indexOf('.') == -1 || inputEmail.indexOf('.') - inputEmail.indexOf('@') == 1){
      setErroEmail("flex")
      setTimeout(() => {
        setErroEmail("none")
      }, "3000");
      validEmail = false;
    }
      else{
        validEmail = true;
      }

    if(!inputCpf){
      campoVazio()
      validCpf = false;
    }
    else if(inputCpf.length < 14){
      setErroCpf("flex")
      setTimeout(() => {
        setErroCpf("none")
      }, "3000");
      validCpf = false;
    }
      else{
        validCpf = true;
      }
 
    if(!inputDate){
      campoVazio()
    }
      else{
        validDate = true;
      }

    if(!inputPassword){
      campoVazio()
    }
      else{
        validPassword = true;
      }

      const user = {
        name: inputName,
        email: inputEmail,
        password: inputPassword,
        cpf: inputCpf,
        birthday: inputDate
      }

    if(validName && validEmail && validCpf && validDate && validPassword){
      axios.post('http://localhost:8080/user/register', user)
      .then(response => {
        Swal.fire(
          'Good job!',
          'You clicked the button!',
          'success'
        )
      })
      .catch(error => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
          footer: '<a href="">Why do I have this issue?</a>'
        })
      });
    }
  }
  
  return(
    <form id="card-bottom" onSubmit={efetuarCadastro}>
      <Textfield
        forLabel="name"
        label="Qual é o seu nome?"
        imagem={usuario} 
        id="name"
        type="name"
        name="name"
        placeholder="Digite seu nome completo"
        max="47"
        value={inputName}
        aoAlterado={value => setInputName(value)}
        />
        
      <Textfield
        forLabel="labelEmail"
        label="Qual é o seu melhor E-mail?"
        imagem={email} 
        id="email"
        type="text"
        name="email"
        placeholder="Digite seu E-mail"
        max="47"
        value={inputEmail}
        aoAlterado={value => setInputEmail(value)}
        />

      <ErrorMessage 
      classError={'erroEmail'}
      textError={'Insira um formato de email válido'}
      displayState={erroEmail}
      />

      <Textfield
        forLabel="labelCpf"
        label="Qual é o seu CPF?"
        imagem={cpf} 
        id="cpf"
        type="text"
        name="cpf"
        placeholder="Digite seu CPF"
        max="14"
        value={inputCpf}
        aoAlterado={value => setInputCpf(value)}
        />

      <ErrorMessage 
      classError={'erroCpf'}
      textError={'Insira um formato de CPF válido'}
      displayState={erroCpf}
      />

      <Textfield
        forLabel="labelDate"
        label="Qual é a sua data de nascimento?"
        imagem={data} 
        id="date"
        type="date"
        name="date"
        value={inputDate}
        aoAlterado={value => setInputDate(value)}
        />

      <TextfieldSenha
        aoAlterado={value => setInputPassword(value)}
        imagem={senha}
      />

      <ErrorMessage 
      classError={'erroCamposVazios'}
      textError={'Parece que existem campos não preenchidos!'}
      displayState={erroCamposVazios}
      />
    

      <input id="submit" type="submit" value="Criar conta"></input>

      <p>Ao criar uma conta, concordo com os <a>Termos e Políticas</a> da Revende</p>
    </form>
  )
}

export default CardBottom