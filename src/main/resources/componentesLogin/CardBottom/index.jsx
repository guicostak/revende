import './CardBottom.scss'
import Textfield from './Textfield' 
import TextfieldSenha from './TextfieldSenha' 
import email from '../../img/vetores/email.png'
import senha from '../../img/vetores/senha.png'
import { useState } from 'react'
import Swal from 'sweetalert2'
import ErrorMessage from '../../componentesCadastro/CardBottom/ErrorMessage'
import axios from 'axios'



const CardBottom = ({ displayState }) => {
  const[inputEmail, setInputEmail]= useState('')
  const[inputPassword, setInputPassword]= useState('')
  const[erroCamposVazios, setErroCamposVazios] = useState("none")


  function campoVazio() {
      setErroCamposVazios("flex")
      setTimeout(() => {
        setErroCamposVazios("none")
      }, "3000");
  }

  const efetuarLogin= (e) => {
  
    let validEmail = false
    let validPassword = false

    e.preventDefault()
    
    if(!inputEmail) {
      campoVazio()
      validEmail = false;
    }
    else{
      validEmail = true;
    }
     
 
    if(!inputPassword){
      campoVazio()
    }
      else{
        validPassword = true;
      }

      const user = {
        email: inputEmail,
        password: inputPassword,
      }

    if(validEmail && validPassword){
      axios.get('http://localhost:8080/user/login', user)
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
      
       <ErrorMessage 
      classError={'erroCamposVazios'}
      textError={'Parece que existem campos não preenchidos!'}
      displayState={erroCamposVazios}
      />

      <input id="submit" type="submit" value="Entrar"></input>

      <p>Ao criar uma conta, concordo com os <a>Termos e Políticas</a> da Revende</p>
    </form>
  )
}

export default CardBottom