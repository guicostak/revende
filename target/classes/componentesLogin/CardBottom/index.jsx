import './CardBottom.scss'
import Textfield from './Textfield' 
import TextfieldSenha from './TextfieldSenha' 
import email from '../../img/vetores/email.png'
import senha from '../../img/vetores/senha.png'
import { useState } from 'react'
import Swal from 'sweetalert2'



const CardBottom = (props) => {

  const[inputName, setInputName]= useState('')
  const[inputEmail, setInputEmail]= useState('')
  const[inputCpf, setInputCpf]= useState('')
  const[inputDate, setInputDate]= useState('')
  const[inputPassword, setInputPassword]= useState('')


  function campoVazio() {
    Swal.fire({
      icon: 'error',
      title: 'Opa...',
      text: 'Parece que existem campos vazios!',
      footer: '<a href="">Preciso de ajuda</a>',
      cssClass: 'my-dialog-class',
      buttonsStyling: false,
        customClass: {
        confirmButton: 'swalButton',
        title: 'swalTitle',
        text: 'swalText'
      }
    })
  }

  const efetuarLogin = (e) => {

    let validName = false
    let validEmail = false
    let validCpf = false
    let validDate = false
    let validPassword = false

    e.preventDefault()

    if(!inputName){
      campoVazio()
    }else if(inputName.length < 6){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        footer: '<a href="">Why do I have this issue?</a>',
        cssClass: 'my-dialog-class',
        buttonsStyling: false
      })
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
    <form id="card-bottom" onSubmit={efetuarLogin}>       
      <Textfield
        imagem={email} 
        id="email"
        type="text"
        name="email"
        placeholder="Digite seu E-mail"
        max="47"
        value={inputEmail}
        aoAlterado={value => setInputEmail(value)}
        />

      <TextfieldSenha
        aoAlterado={value => setInputPassword(value)}
        imagem={senha}
      />

      <input id="submit" type="submit" value="Entrar"></input>

      <p>Ao criar uma conta, concordo com os <a>Termos e Políticas</a> da Revende</p>
    </form>
  )
}

export default CardBottom