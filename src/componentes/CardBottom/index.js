import './CardBottom.css'
import Textfield from '../Textfield' 
import usuario from '../img/vetores/usuario.png'
import email from '../img/vetores/email.png'
import cpf from '../img/vetores/identidade.png'
import data from '../img/vetores/data.png'
import senha from '../img/vetores/senha.png'
import Submit from '../Submit'
import TextfieldSenha from '../TextfieldSenha'
import { useState } from 'react'


const CardBottom = (props) => {

  const[inputName, setInputName]= useState('')
  const[inputEmail, setInputEmail]= useState('')
  const[inputCpf, setInputCpf]= useState('')
  const[inputDate, setInputDate]= useState('')
  const[inputPassword, setInputPassword]= useState('')


  function campoVazio() {
    
  }

  const handleSubmit = (e) => {

    let validName = false
    let validEmail = false
    let validCpf = false
    let validDate = false
    let validPassword = false

    e.preventDefault()

    //FALTA ADICIONAR O SWEET ALERT NAS VALIDAÇÕES E FORMATAR REGEX CPF
    if(!inputName){
      campoVazio()
    }else if(inputName.length < 6){
      alert("menor que 6")
    }
    else{
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
    <form id="card-bottom" onSubmit={handleSubmit}>
  <Textfield
    forlabel="name"
    label="Qual é o seu nome?"
    imagem={usuario} 
    id="name"
    type="name"
    name="name"
    placeholder="Digite seu nome completo"
    maxLenght="47"
    value={inputName}
    aoAlterado={value => setInputName(value)}
    />
    
  <Textfield
    forlabel="labelEmail"
    label="Qual é o seu melhor E-mail?"
    imagem={email} 
    id="email"
    type="text"
    name="email"
    placeholder="Digite seu E-mail"
    maxLenght="47"
    value={inputEmail}
    aoAlterado={value => setInputEmail(value)}
    />

  <Textfield
    forlabel="labelCpf"
    label="Qual é o seu CPF?"
    imagem={cpf} 
    id="cpf"
    type="text"
    name="cpf"
    placeholder="Digite seu CPF"
    maxLenght="14"
    value={inputCpf}
    aoAlterado={value => setInputCpf(value)}
    />

  <Textfield
    forlabel="labelDate"
    label="Qual é a sua data de nascimento?"
    imagem={data} 
    id="date"
    type="date"
    name="date"
    value={inputDate}
    aoAlterado={value => setInputDate(value)}
    />

  <TextfieldSenha 
  imagem={senha}
  value={inputPassword}
  aoAlterado={value => setInputPassword(value)}
  />

    <Submit />

    <p>Ao criar uma conta, concordo com os <a>Termos e Políticas</a> da Revende</p>
    </form>
  )
}

export default CardBottom