import mostrarSenha from '../../../img/vetores/mostrarSenha.png'
import mostrarSenha2 from '../../../img/vetores/mostrarSenha2.png'
import { useState } from 'react'

const TextfieldSenha = ({ imagem, value, aoAlterado }) => {
  const [type, setType] = useState('password')
  const [icon, setIcon] = useState(mostrarSenha)
  const [borderColor, setBorderColor] = useState('var(--main-color)')

  const Toggle = () => {
    if (type === 'password') {
      setType('text')
      setIcon(mostrarSenha2)
    } else {
      setType('password')
      setIcon(mostrarSenha)
    }
  }

  function HandleFocus() {
    setBorderColor('var(--text-color)')
  }

  function BlurFocus() {
    setBorderColor('var(--main-color)')
  }

  function aoDigitado(e) {
    aoAlterado(e.target.value)
  }

  return (
    <div className="textfield">
      <a>
        <img src={imagem} className="vetores" />
        <input
          id="senha"
          type={type}
          name="password"
          placeholder="Digite sua senha"
          onFocus={HandleFocus}
          onBlur={BlurFocus}
          style={{ borderBottomColor: borderColor }}
          value={value}
          onChange={aoDigitado}
        />

        <img src={icon} id="mostrarSenha" onClick={Toggle} 
        style={{ borderBottomColor: borderColor }}/>
      </a>
    </div>
  )
}

export default TextfieldSenha