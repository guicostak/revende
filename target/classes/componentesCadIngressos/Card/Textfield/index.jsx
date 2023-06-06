import { useState } from 'react'

const Textfield = ({  label, id, type, name, placeholder, max, value, aoAlterado  }) => {
  const [borderColor, setBorderColor] = useState('var(--main-color)')

  const HandleFocus = () => {
    setBorderColor('var(--text-color)')
  }

  const BlurFocus = () => {
    setBorderColor('var(--main-color)')
  }
  
  function formatarTelefone(telefone) {
    // Remove tudo que não é dígito
    telefone = telefone.replace(/\D/g, "");
    
    // Formata o número em um formato específico
    if (telefone.length === 10) {
      telefone = telefone.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
    } else if (telefone.length === 11) {
      telefone = telefone.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    }
    
    return telefone;
  }
  function formatarPreco(preco) {
    preco = preco.toString().replace(/\D/g, ''); // remove todos os caracteres não numéricos
    const centavos = preco.slice(-2); // obtém os dois últimos dígitos do preço
    preco = preco.slice(0, -2); // remove os dois últimos dígitos do preço
    preco = preco.replace(/(\d{1,})(?:\.(\d{0,2}))?/, function (match, p1, p2) {
      // adiciona ponto como separador de milhar
      p1 = p1.replace(/(\d)(?=(\d{3})+$)/g, '$1.');
    
      // adiciona vírgula como separador decimal
      if (p2 !== undefined) {
        return p1 + ',' + p2;
      } else {
        return p1;
      }
    });
  
    return "R$ " + preco + "," + centavos; // adiciona os centavos à string formatada
  }

  function aoDigitado (e) {
    if(e.target.id == "preco"){
    const newPreco = formatarPreco(e.target.value)
    e.target.value = newPreco
    aoAlterado(e.target.value)
    }else if(e.target.id == "telefone"){
      const newTelefone = formatarTelefone(e.target.value)
      e.target.value = newTelefone
    }
    else{
      aoAlterado(e.target.value)
    }
  }

  return (
    <div className="textfield">
      <label>{label}</label>
        <input className='input'
          id={id}
          type={type}
          name={name}
          placeholder={placeholder}
          maxLength={max}
          value={value}
          onFocus={HandleFocus}
          onBlur={BlurFocus}
          onChange={aoDigitado}
          style={{ borderColor: borderColor }}
        />
    </div>
  )
}

export default Textfield
