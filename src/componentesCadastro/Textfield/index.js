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
    if(e.target.id == "cpf"){
    const newCPF = formatCPF(e.target.value)
    e.target.value = newCPF
    props.aoAlterado(e.target.value)
    }
  }

  function formatCPF(cpf) {
    // Remove todos os caracteres que não são dígitos
    cpf = cpf.replace(/\D/g, '');
  
    // Adiciona os pontos e o traço na formatação do CPF
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
    cpf = cpf.replace(/(\d{3})(\d{1,2})/, '$1-$2');
  
    return cpf;
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
          maxLength={props.max}
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
