import { useState } from 'react'

const Textarea = ({ label,  id, type, name, max, value, aoAlterado  }) => {
  const [borderColor, setBorderColor] = useState('var(--main-color)')
  const [text, setText] = useState('');

  const HandleFocus = () => {
    setBorderColor('var(--text-color)')
  }

  const BlurFocus = () => {
    setBorderColor('var(--main-color)')
  }

 

  function aoDigitado (e) {
      aoAlterado(e.target.value)
      setText(e.target.value);
  }

  return (
    <div className="textfield">
      <label>{label}</label>
        <textarea 
          className='input'
          id={id}
          type={type}
          name={name}
          maxLength={max}
          value={value}
          onFocus={HandleFocus}
          onBlur={BlurFocus}
          onChange={aoDigitado}
          style={{ borderColor: borderColor }}
        />
        <div className='contador'>({text.length}/180)</div>
    </div>
  )
}

export default Textarea
