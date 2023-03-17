import { useState } from 'react'
import('./Textfield.css')

const Textfield = props => {
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
      <label htmlFor={props.forlabel}>{props.label}</label>
      <a>
        <img src={props.imagem} class="vetores" />
        <input
          id={props.id}
          type={props.type}
          name={props.name}
          placeholder={props.placeholder}
          maxLength={props.maxLength}
          onFocus={HandleFocus}
          onBlur={BlurFocus}
          style={{ borderBottomColor: borderColor }}
          value={props.value}
          onChange={aoDigitado}
        />
      </a>
    </div>
  )
}

export default Textfield
