import './TextfieldSenha.css'
import mostrarSenha from '../../img/vetores/mostrarSenha.png'
import mostrarSenha2 from '../../img/vetores/mostrarSenha2.png'
import { useState } from 'react'

const TextfieldSenha = props => {
  const [type, setType] = useState('password')
  const [icon, setIcon] = useState(mostrarSenha)

  const Toggle = () => {
    if (type === 'password') {
      setType('text')
      setIcon(mostrarSenha2)
    } else {
      setType('password')
      setIcon(mostrarSenha)
    }
  }

  const [borderColor, setBorderColor] = useState('var(--main-color)')

  const HandleFocus = () => {
    setBorderColor('var(--text-color)')
  }

  const BlurFocus = () => {
    setBorderColor('var(--main-color)')
  }

  const aoDigitado = (e) => {
    props.aoAlterado(e.target.value)
  }

  return (
    <div className="textfield">
      <label id="labelSenha" htmlFor="senha">
        Crie uma senha para sua conta!
      </label>
      <a>
        <img src={props.imagem} className="vetores" />
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
  )
}

export default TextfieldSenha
