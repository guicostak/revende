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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';



const CardBottom = (props) => {

  const[inputName, setInputName]= useState('')
  const[inputEmail, setInputEmail]= useState('')
  const[inputCpf, setInputCpf]= useState('')
  const[inputDate, setInputDate]= useState('')
  const[inputPassword, setInputPassword]= useState('')
  const[erroCamposVazios, setErroCamposVazios] = useState("none")


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
    else if(inputName.length < 6){

      validName = false
    }
      else{
        validName = true
      }
    
    if(!inputEmail) {
      campoVazio()
    }
    else if(inputEmail.indexOf('@') == -1 || inputEmail.indexOf('.') == -1 || inputEmail.indexOf('.') - inputEmail.indexOf('@') == 1){
      alert("email invalido")
    }
      else{
      }

    if(!inputCpf){
      campoVazio()
    }else if(inputCpf.length < 14){
      alert("menor que 6")
    }
      else{
      }
 
    if(!inputDate){
      campoVazio()
    }
      else{
      }

    if(!inputPassword){
      campoVazio()
    }else if(inputPassword.length < 6){
      alert("menor que 6")
    }
      else{
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

      <div style={{ display: erroCamposVazios }} className='mensagemErro'>
      <span>Parece que existem campos não preenchidos!</span>
      <FontAwesomeIcon icon={faTimesCircle} />
      </div>

      <input id="submit" type="submit" value="Criar conta"></input>

      <p>Ao criar uma conta, concordo com os <a>Termos e Políticas</a> da Revende</p>
    </form>
  )
}

export default CardBottom