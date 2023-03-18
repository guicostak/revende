import './CardBottom.css'
import Textfield from '../Textfield' 
import usuario from '../../img/vetores/usuario.png'
import email from '../../img/vetores/email.png'
import cpf from '../../img/vetores/identidade.png'
import data from '../../img/vetores/data.png'
import senha from '../../img/vetores/senha.png'
import { useState } from 'react'
import mostrarSenha from '../../img/vetores/mostrarSenha.png'
import mostrarSenha2 from '../../img/vetores/mostrarSenha2.png'
import Swal from 'sweetalert2'



const CardBottom = (props) => {

  const[inputName, setInputName]= useState('')
  const[inputEmail, setInputEmail]= useState('')
  const[inputCpf, setInputCpf]= useState('')
  const[inputDate, setInputDate]= useState('')
  const[inputPassword, setInputPassword]= useState('')
  const [type, setType] = useState('password')
  const [icon, setIcon] = useState(mostrarSenha)
  const [borderColor, setBorderColor] = useState('var(--main-color)')


  function campoVazio() {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!',
      footer: '<a href="">Why do I have this issue?</a>'
    })
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
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Parece que você não preencheu todos os campos!',
        footer: '<a href="">Why do I have this issue?</a>'
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

  
    const Toggle = () => {
      if (type === 'password') {
        setType('text')
        setIcon(mostrarSenha2)
      } else {
        setType('password')
        setIcon(mostrarSenha)
      }
    }
  
    const HandleFocus = () => {
      setBorderColor('var(--text-color)')
    }
  
    const BlurFocus = (e) => {
      setBorderColor('var(--main-color)')

    }
  
    const aoDigitado = (e) => {
      props.aoAlterado(e.target.value)
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
    max="47"
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
    max="47"
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
    max="14"
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

  <div className="textfield">
      <label id="labelSenha" htmlFor="senha">
        Crie uma senha para sua conta!
      </label>
      <a>
        <img src={senha} className="vetores" />
        <input
          id="senha"
          type={type}
          name="password"
          placeholder="Digite sua senha"
          onFocus={HandleFocus}
          onBlur={BlurFocus}
          style={{ borderBottomColor: borderColor }}
          value={props.value}
          onChange={aoDigitado}
        />
        <img src={icon} id="mostrarSenha" onClick={Toggle} 
        style={{ borderBottomColor: borderColor }}/>
      </a>
    </div>

    <input id="submit" type="submit" value="Criar conta"></input>

    <p>Ao criar uma conta, concordo com os <a>Termos e Políticas</a> da Revende</p>
    </form>
  )
}

export default CardBottom