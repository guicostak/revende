import './Card.scss'
import { useState, useEffect } from 'react'
import show from '../../img/vetores/categorias/shows.png'
import teatro from '../../img/vetores/categorias/teatro.png'
import esportes from '../../img/vetores/categorias/esportes.png'
import standUp from '../../img/vetores/categorias/standup.png'
import palestras from '../../img/vetores/categorias/palestras.png'
import infantis from '../../img/vetores/categorias/infantis.png'
import outros from '../../img/vetores/categorias/outros.png'

const Card = () => {
  const [animacao, setAnimacao] = useState('none')
  const [categoria, setCategoria] = useState('')
  const [outrosCampos, setOutrosCampos] = useState('none')

  useEffect(() => {
    setTimeout(() => {
      setAnimacao('flex')
    }, 500)
  }, [])

  function selecionaCategoria(e) {
    setCategoria(e)
    setOutrosCampos('flex')
  }

  return (
    <section className="cadIngressos-card">
      <h1>Qual a categoria do ingresso anunciado?</h1>
      <div className="card" style={{ display: animacao }}>
        <div className="categorias">
          <h2>Categorias*</h2>
          <ul>
            <li onClick={() => selecionaCategoria('Shows e festas')}>
              <img src={show} />
              Shows e festas <div className="seta">&gt;</div>
            </li>
            <li onClick={() => selecionaCategoria('Espetáculo e teatro')}>
              <img src={teatro} />
              Espetáculo e teatro <div className="seta">&gt;</div>
            </li>
            <li onClick={() => selecionaCategoria('Eventos esportivos')}>
              <img src={esportes} />
              Eventos esportivos <div className="seta">&gt;</div>
            </li>
            <li onClick={() => selecionaCategoria('Stand Up e comédia')}>
              <img src={standUp} />
              Stand Up e comédia <div className="seta">&gt;</div>
            </li>
            <li onClick={() => selecionaCategoria('Palestras e seminários')}>
              <img src={palestras} />
              Palestras e seminários <div className="seta">&gt;</div>
            </li>
            <li onClick={() => selecionaCategoria('Eventos infantis')}>
              <img src={infantis} />
              Eventos infantis <div className="seta">&gt;</div>
            </li>
            <li onClick={() => selecionaCategoria('Outras categorias')}>
              <img src={outros} />
              Outras categorias <div className="seta">&gt;</div>
            </li>
          </ul>
        </div>
        <div className="outros-campos" style={{ display: outrosCampos }}></div>
      </div>
    </section>
  )
}

export default Card
