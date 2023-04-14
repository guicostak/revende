import { useState } from 'react'

const Textfield = ({ forLabel, label, imagem, id, type, name, placeholder, max, value, aoAlterado  }) => {
  const [borderColor, setBorderColor] = useState('var(--main-color)')

  const HandleFocus = () => {
    setBorderColor('var(--text-color)')
  }

  const BlurFocus = () => {
    setBorderColor('var(--main-color)')
  }

  function aoDigitado (e) {
    if(e.target.id == "cpf"){
    const newCPF = formatCPF(e.target.value)
    e.target.value = newCPF
    aoAlterado(e.target.value)
    }
    else{
      aoAlterado(e.target.value)
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
      <label htmlFor={forLabel}>{label}</label>
      <a>
        <img src={imagem} class="vetores" />
        <input
          id={id}
          type={type}
          name={name}
          placeholder={placeholder}
          maxLength={max}
          value={value}
          onFocus={HandleFocus}
          onBlur={BlurFocus}
          onChange={aoDigitado}
          style={{ borderBottomColor: borderColor }}
        />
      </a>
    </div>
  )
}

export default Textfield
