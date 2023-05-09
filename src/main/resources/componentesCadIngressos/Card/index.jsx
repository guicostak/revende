import './Card.scss'
import { useState, useEffect } from 'react'
import show from '../../img/vetores/categorias/shows.png'
import teatro from '../../img/vetores/categorias/teatro.png'
import esportes from '../../img/vetores/categorias/esportes.png'
import standUp from '../../img/vetores/categorias/standup.png'
import palestras from '../../img/vetores/categorias/palestras.png'
import infantis from '../../img/vetores/categorias/infantis.png'
import outros from '../../img/vetores/categorias/outros.png'
import Textfield from './Textfield'
import Textarea from './Textarea'
import camera from '../../img/vetores/camera.png'
import remove from '../../img/vetores/remove.png'


const Card = () => {
  const [animacao, setAnimacao] = useState('none')
  const [categoria, setCategoria] = useState('')
  const [outrosCampos, setOutrosCampos] = useState('none')
  const [titulo, setTitulo] = useState('flex')
  const [segundoTitulo, setSegundoTitulo] = useState('none')

  const [showSelecionado, setShowSelecionado] = useState(false)
  const [espetaculoSelecionado, setEspetaculoSelecionado] = useState(false)
  const [esporteSelecionado, setEsporteSelecionado] = useState(false)
  const [standupSelecionado, setStandupSelecionado] = useState(false)
  const [palestraSelecionado, setPalestraSelecionado] = useState(false)
  const [infantilSelecionado, setInfantilSelecionado] = useState(false)
  const [outrosSelecionado, setOutrosSelecionado] = useState(false)

  const [inputNome, setInputNome] = useState()
  const [inputData, setInputData] = useState()
  const [inputPreco, setInputPreco] = useState()
  const [inputDescricao, setInputDescricao] = useState()
  const [inputTelefone, setInputTelefone] = useState()
  const [tipoIngresso, setTipoIngresso] = useState()
  const [image, setImage] = useState('');
  const [removeStatus, setRemoveStatus] = useState('none');

  

  function handleImageRemove() {
    setImage("");
    setRemoveStatus("none");
    document.getElementById("imagem").value = null;
  }

  const handleImageChange = e => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImage(reader.result);
        setRemoveStatus('flex')
        console.log(reader.result)
      }
    }
    reader.readAsDataURL(e.target.files[0])
  };

  useEffect(() => {
    setTimeout(() => {
      setAnimacao('flex')
    }, 500)
  }, [])

  function selecionaCategoria(e, classe) {
    setCategoria(e)
    setOutrosCampos('flex')
    setTitulo('none')
    setSegundoTitulo('flex')

    setShowSelecionado(classe === 'showSelecionado' ? 'selecionado' : '')
    setEspetaculoSelecionado(
      classe === 'espetaculoSelecionado' ? 'selecionado' : ''
    )
    setEsporteSelecionado(classe === 'esporteSelecionado' ? 'selecionado' : '')
    setStandupSelecionado(classe === 'standupSelecionado' ? 'selecionado' : '')
    setPalestraSelecionado(
      classe === 'palestraSelecionado' ? 'selecionado' : ''
    )
    setInfantilSelecionado(
      classe === 'infantilSelecionado' ? 'selecionado' : ''
    )
    setOutrosSelecionado(classe === 'outrosSelecionado' ? 'selecionado' : '')
  }

  const cadastraIngresso = () => {

  }

  return (
    <form onSubmit={cadastraIngresso} className="cadIngressos-card">
      <h1 style={{ display: titulo }}>
        Qual a categoria do ingresso anunciado?
      </h1>
      <h1 style={{ display: segundoTitulo }}>
        Preencha algumas informações sobre o ingresso
      </h1>
      <div className="card" style={{ display: animacao }}>
        <div className="categorias">
          <h2>Categorias*</h2>
          <ul>
            <li
              onClick={() =>
                selecionaCategoria('Shows e festas', 'showSelecionado')
              }
              className={showSelecionado}
            >
              <img src={show} />
              Shows e festas <div className="seta">&gt;</div>
            </li>

            <li
              onClick={() =>
                selecionaCategoria(
                  'Espetáculo e teatro',
                  'espetaculoSelecionado'
                )
              }
              className={espetaculoSelecionado}
            >
              <img src={teatro} />
              Espetáculo e teatro <div className="seta">&gt;</div>
            </li>

            <li
              onClick={() =>
                selecionaCategoria('Eventos esportivos', 'esporteSelecionado')
              }
              className={esporteSelecionado}
            >
              <img src={esportes} />
              Eventos esportivos <div className="seta">&gt;</div>
            </li>

            <li
              onClick={() =>
                selecionaCategoria('Stand Up e comédia', 'standupSelecionado')
              }
              className={standupSelecionado}
            >
              <img src={standUp} />
              Stand Up e comédia <div className="seta">&gt;</div>
            </li>

            <li
              onClick={() =>
                selecionaCategoria(
                  'Palestras e seminários',
                  'palestraSelecionado'
                )
              }
              className={palestraSelecionado}
            >
              <img src={palestras} />
              Palestras e seminários <div className="seta">&gt;</div>
            </li>

            <li
              onClick={() =>
                selecionaCategoria('Eventos infantis', 'infantilSelecionado')
              }
              className={infantilSelecionado}
            >
              <img src={infantis} />
              Eventos infantis <div className="seta">&gt;</div>
            </li>

            <li
              onClick={() =>
                selecionaCategoria('Outras categorias', 'outrosSelecionado')
              }
              className={outrosSelecionado}
            >
              <img src={outros} />
              Outras categorias <div className="seta">&gt;</div>
            </li>
          </ul>
        </div>
        <div className="outros-campos" style={{ display: outrosCampos }}>
          <div className="row">
            <Textfield
              label="Titulo*"
              id="name"
              type="text"
              name="name"
              max="30"
              value={inputNome}
              aoAlterado={value => setInputNome(value)}
            />

            <Textfield
              label="Data*"
              id="data"
              type="date"
              name="data"
              value={inputData}
              aoAlterado={value => setInputData(value)}
            />

            <Textfield
              label="Preço(R$)*"
              id="preco"
              type="text"
              name="preco"
              max="12"
              value={inputPreco}
              aoAlterado={value => setInputPreco(value)}
            />
          </div>
          <div className="row">
            <Textarea
              label="Descrição*"
              id="descricao"
              type="text"
              name="descricao"
              value={inputDescricao}
              max="180"
              aoAlterado={value => setInputDescricao(value)}
            />

          <div className='textfield' id='tipo'>
          <label>Tipo de ingresso (f/d)*</label>
          <select>
            <option disabled selected>Selecione uma opção</option>
            <option value={value =>setTipoIngresso('Físico')}>Físico</option>
            <option value={value => setTipoIngresso('Digital')}>Digital</option>
            <option value={value => setTipoIngresso('Ambos')}>Ambos</option>
          </select>
          <Textfield
              label="Telefone*"
              id="telefone"
              type="text"
              name="telefone"
              max="15"
              value={inputTelefone}
              aoAlterado={value => setInputTelefone(value)}
            />
         </div>

            
          </div>
          <div className='row'>
            <div className='textfield' id="campoImagem">
                <div className="upload-btn-wrapper">
                  <img src={camera} className="btn"/>
                  <input id="imagem" type="file" onChange={handleImageChange} />
                </div>
                {image && <img id="imagemCarregada" src={image} alt="Imagem carregada" />}
                <img style={{display: removeStatus}} src={remove} className='remover-imagem' onClick={handleImageRemove}/>
              </div>
              <div className='textfield'>
              <p>*Preencha todos os campos, e confira os dados.</p>
              <button id='submitIngresso'>anunciar</button>
              </div>
            </div>

        </div>
      </div>
    </form>
  )
}

export default Card
