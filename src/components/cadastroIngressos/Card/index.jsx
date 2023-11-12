  import './Card.scss'
import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBasketball,
  faMusic,
  faTheaterMasks,
  faLaughSquint,
  faEllipsis,
  faGraduationCap,
  faPuzzlePiece,
  faUtensils,
  faExclamation,
  faCamera,
  faXmarkCircle,
} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'

const Card = () => {
  const [abrePagina, setAbrePagina] = useState(false)
  const [animationStatus, setAnimationStatus] = useState(true)
  const [categoriasDisplay, setCategoriasDisplay] = useState(true)
  const [dadosDisplay, setDadosDisplay] = useState(false)
  const [dadosSegundoDisplay, setDadosSegundoDisplay] = useState(false)
  const [dadosTerceiroDisplay, setDadosTerceiroDisplay] = useState(false)
  const [dadosQuartoDisplay, setDadosQuartoDisplay] = useState(false)
  const [dadosQuintoDisplay, setDadosQuintoDisplay] = useState(false)
  const [primeiroInput, setPrimeiroInput] = useState(false)
  const [segundoInput, setSegundoInput] = useState(false)
  const [terceiroInput, setTerceiroInput] = useState(false)
  const [removeStatusImage, setRemoveStatusImage] = useState('none')
  const [avisoDisplay, setAvisoDisplay] = useState(false)

  const [erros, setErros] = useState({
    camposVazios: false,
    data: false,
    horario: false,
    categoria: false,
    tipo: false,
    cep: false,
    logradouro: false,
    cidade: false,
    estado: false,
    preco: false
  })

  const [campoValido, setCampoValido] = useState({
    nome: false,
    data: false,
    horario: false,
    categoria: false,
    tipo: false,
    cep: false,
    logradouro: false,
    cidade: false,
    estado: false,
    preco: false
  })

  const [fisico, setFisico] = useState(false)
  const [digital, setDigital] = useState(false)
  const [ambos, setAmbos] = useState(false)

  const [borderColor, setBorderColor] = useState('var(--main-color)')

  //VARIÁVEIS REFERENTES AOS CAMPOS DO FORMULÁRIO

  const [inputCategoria, setInputCategoria] = useState('')
  const [inputNome, setInputNome] = useState('')
  const [inputData, setInputData] = useState('')
  const [inputHorario, setInputHorario] = useState('')
  const [inputTipo, setInputTipo] = useState('')
  const [inputSetor, setInputSetor] = useState('')
  const [inputQuantidade, setInputQuantidade] = useState('1')
  const [inputImage, setInputImage] = useState('')
  const [inputDescricao, setInputDescricao] = useState('')
  const [inputCep, setInputCep] = useState('')
  const [inputLogradouro, setInputLogradouro] = useState('')
  const [inputEstado, setInputEstado] = useState('')
  const [inputCidade, setInputCidade] = useState('')
  const [inputPreco, setInputPreco] = useState('')
  const [inputLote, setInputLote] = useState('')
  const [inputTermos, setInputTermos] = useState('')

  const HandleFocus = event => {
    event.target.style.borderColor = 'var(--text-color)'
  }

  const BlurFocus = event => {
    event.target.style.borderColor = 'var(--main-color)'
  }

  const voltarAoDisplayCategorias = () => {
    setAnimationStatus(false)

    setTimeout(() => {
      setSegundoInput(false)
      setPrimeiroInput(false)
      setDadosDisplay(false)
      setAnimationStatus(true)
      setCategoriasDisplay(true)
    }, 380)
  }

  const aoSelecionarEstado = event => {
    const estadoSelecionado = event.target.value
    setInputEstado(estadoSelecionado)
  }

  const selecionaCategoria = event => {
    setAnimationStatus(false)
    setInputCategoria(event.target.classList.item(1))
    Promise.resolve()
      .then(() => new Promise(resolve => setTimeout(resolve, 380)))
      .then(() => {
        setCategoriasDisplay(false)
        setAnimationStatus(true)
      })
      .then(() => new Promise(resolve => setTimeout(resolve, 200)))
      .then(() => {
        setDadosDisplay(true)
        setPrimeiroInput(true)
      })
      .then(() => new Promise(resolve => setTimeout(resolve, 200)))
      .then(() => setSegundoInput(true))
  }

  const avancar = etapa => {
    setAnimationStatus(false)

    setTimeout(() => {
      setPrimeiroInput(false)
      setSegundoInput(false)
      setTerceiroInput(false)

      switch (etapa) {
        case 1:
          setDadosDisplay(false)
          setAnimationStatus(true)
          setDadosSegundoDisplay(true)
          break
        case 2:
          setDadosSegundoDisplay(false)
          setAnimationStatus(true)
          setDadosTerceiroDisplay(true)
          break
        case 3:
          setDadosTerceiroDisplay(false)
          setAnimationStatus(true)
          setDadosQuartoDisplay(true)
          break
        case 4:
          setDadosQuartoDisplay(false)
          setAnimationStatus(true)
          setDadosQuintoDisplay(true)
          break
        default:
          break
      }

      setTimeout(() => {
        setPrimeiroInput(true)
        setTimeout(() => {
          setSegundoInput(true)
          setTimeout(() => {
            setTerceiroInput(true)
          }, 200)
        }, 200)
      }, 200)
    }, 380)
  }

  const voltar = etapa => {
    setAnimationStatus(false)

    setTimeout(() => {
      setPrimeiroInput(false)
      setSegundoInput(false)
      setTerceiroInput(false)

      switch (etapa) {
        case 1:
          setDadosDisplay(true)
          setAnimationStatus(true)
          setDadosSegundoDisplay(false)
          break
        case 2:
          setDadosSegundoDisplay(true)
          setAnimationStatus(true)
          setDadosTerceiroDisplay(false)
          break
        case 3:
          setDadosTerceiroDisplay(true)
          setAnimationStatus(true)
          setDadosQuartoDisplay(false)
          break
        case 4:
          setDadosQuartoDisplay(true)
          setAnimationStatus(true)
          setDadosQuintoDisplay(false)
          break
        default:
          break
      }

      setTimeout(() => {
        setPrimeiroInput(true)
        setTimeout(() => {
          setSegundoInput(true)
          setTimeout(() => {
            setTerceiroInput(true)
          }, 200)
        }, 200)
      }, 200)
    }, 380)
  }

  useEffect(() => {
    setTimeout(() => setAbrePagina(true), 500)
  }, [])

  const selecionaTipo = e => {
    const id = e.target.id
    const valores = {
      fisico: { fisico: !fisico, digital: false, ambos: false },
      digital: { fisico: false, digital: !digital, ambos: false },
      ambos: { fisico: false, digital: false, ambos: !ambos }
    }

    setInputTipo(id === inputTipo ? '' : id)
    setFisico(valores[id].fisico)
    setDigital(valores[id].digital)
    setAmbos(valores[id].ambos)
  }

  function handleImageRemove() {
    setInputImage('')
    setRemoveStatusImage('none')
    document.getElementById('imagem').value = null
  }

  const handleImageChange = e => {
    const reader = new FileReader()
    reader.onload = () => {
      if (reader.readyState === 2) {
        setInputImage(reader.result)
        setRemoveStatusImage('flex')
      }
    }
    reader.readAsDataURL(e.target.files[0])
  }

  const aviso = () => {
    setAvisoDisplay(true)
  }

  const avisoOff = () => {
    setAvisoDisplay(false)
  }

  const aoDigitado = async ({ target }) => {
    const { name, value } = target

    if (name === 'cep') {
      const formattedCep = value.replace(/\D/g, '') // Remove caracteres não numéricos
      const cepWithMask = formattedCep.replace(/(\d{5})(\d)/, '$1-$2') // Adiciona o hífen na posição correta
      setInputCep(cepWithMask)

      if (formattedCep.length === 8) {
        try {
          const response = await axios.get(
            `https://viacep.com.br/ws/${formattedCep}/json/`
          )

          setInputCidade(response.data.localidade)
          setInputEstado(response.data.uf)
          setInputLogradouro(response.data.logradouro)
        } catch (error) {
          console.log(error)
        }
      }
    } else if (name === 'descricao') {
      setInputDescricao(value)
    } else if (name === 'logradouro') {
      setInputLogradouro(value)
    } else if (name === 'cidade') {
      setInputCidade(value.replace(/[0-9]/g, ''))
    } else if (name === 'lote') {
      setInputLote(value)
    } else if (name === 'setor') {
      setInputSetor(value)
    } else if (name === 'quantidade') {
      setInputQuantidade(value)
    } else if (name === 'nome') {
      setInputNome(value)
    } else if (name === 'horario') {
      setInputHorario(value)
    } else if (name === 'data') {
      setInputData(value)
    } else if (name === 'termos') {
      setInputTermos(value)
    } else if (name === 'preco') {
      const newPreco = formatarPreco(value)
      setInputPreco(newPreco)

      if (newPreco === '') {
        target.value = '' // campo vazio se o novo preço for uma string vazia
      } else {
        inputPreco(newPreco) // exibir o novo preço formatado
      }
    }
  }

  function formatarPreco(preco) {
    preco = preco.toString().replace(/\D/g, '') // remove todos os caracteres não numéricos
    const centavos = preco.slice(-2) // obtém os dois últimos dígitos do preço
    preco = preco.slice(0, -2) // remove os dois últimos dígitos do preço
    preco = preco.replace(/(\d{1,})(?:\.(\d{0,2}))?/, function (match, p1, p2) {
      // adiciona ponto como separador de milhar
      p1 = p1.replace(/(\d)(?=(\d{3})+$)/g, '$1.')

      // adiciona vírgula como separador decimal
      if (p2 !== undefined) {
        return p1 + ',' + p2
      } else {
        return p1
      }
    })

    return 'R$ ' + preco + ',' + centavos
  }

  const submitFormulario = () => {
    
  }

  return (
    <div className="card-cadastro-ingressos">
      <div
        className={
          categoriasDisplay ? 'categorias-cadastro' : 'categorias-hidden'
        }
        style={{
          animation: animationStatus
            ? 'pop-up 0.7s ease-in-out'
            : 'pop-down 0.4s alternate'
        }}
      >
        <h1
          style={{
            animation: animationStatus
              ? 'pop-up 0.7s ease-in-out'
              : 'pop-down 0.4s alternate',
            marginLeft: '2vw'
          }}
          className="titulo"
        >
          Qual categoria melhor descreve o seu evento
        </h1>
        <div
          className="categorias-elementos"
          style={{
            animation: abrePagina ? 'pop-up 0.7s ease-in-out' : 'none',
            visibility: abrePagina ? 'visible' : 'hidden'
          }}
        >
          <div
            style={{
              backgroundColor:
                inputCategoria === 'SHOWS_E_FESTAS' ? '#e82c4f3d' : ''
            }}
            className="categoria-elemento SHOWS_E_FESTAS"
            onClick={selecionaCategoria}
          >
             <FontAwesomeIcon
                  className='icone'
                  icon={faMusic}
                  style={{ color: '#E82C4F'}}
                />
            <h2 className="titulo-categoria SHOWS_E_FESTAS">Shows e festas</h2>
          </div>

          <div
            style={{
              backgroundColor:
                inputCategoria === 'ESPETACULOS_E_TEATROS' ? '#e82c4f3d' : ''
            }}
            className="categoria-elemento ESPETACULOS_E_TEATROS"
            onClick={selecionaCategoria}
          >
            <FontAwesomeIcon
                  className='icone'
                  icon={faTheaterMasks}
                  style={{ color: '#E82C4F'}}
                />
            <h2 className="titulo-categoria ESPETACULOS_E_TEATROS">
              Espetaculos e teatros
            </h2>
          </div>

          <div
            style={{
              backgroundColor:
                inputCategoria === 'EVENTOS_ESPORTIVOS' ? '#e82c4f3d' : ''
            }}
            className="categoria-elemento EVENTOS_ESPORTIVOS"
            onClick={selecionaCategoria}
          >
            <FontAwesomeIcon
                  className='icone'
                  icon={faBasketball}
                  style={{ color: '#E82C4F'}}
                />
            <h2 className="titulo-categoria EVENTOS_ESPORTIVOS">
              Eventos esportivos
            </h2>
          </div>

          <div
            style={{
              backgroundColor:
                inputCategoria === 'STANDUP_E_COMEDIA' ? '#e82c4f3d' : ''
            }}
            className="categoria-elemento STANDUP_E_COMEDIA"
            onClick={selecionaCategoria}
          >
            <FontAwesomeIcon
                  className='icone'
                  icon={faLaughSquint}
                  style={{ color: '#E82C4F'}}
                />
            <h2 className="titulo-categoria STANDUP_E_COMEDIA">
              Stand up e comédia
            </h2>
          </div>

          <div
            style={{
              backgroundColor:
                inputCategoria === 'PALESTRAS_E_SEMINARIOS' ? '#e82c4f3d' : ''
            }}
            className="categoria-elemento PALESTRAS_E_SEMINARIOS"
            onClick={selecionaCategoria}
          >
             <FontAwesomeIcon
                  className='icone'
                  icon={faGraduationCap}
                  style={{ color: '#E82C4F'}}
                />
            <h2 className="titulo-categoria PALESTRAS_E_SEMINARIOS">
              Palestras e seminários
            </h2>
          </div>

          <div
            style={{
              backgroundColor:
                inputCategoria === 'EVENTOS_INFANTIS' ? '#e82c4f3d' : ''
            }}
            className="categoria-elemento EVENTOS_INFANTIS"
            onClick={selecionaCategoria}
          >
           <FontAwesomeIcon
                  className='icone'
                  icon={faPuzzlePiece}
                  style={{ color: '#E82C4F'}}
                />
            <h2 className="titulo-categoria EVENTOS_INFANTIS">
              Eventos infantis
            </h2>
          </div>

          <div
            style={{
              backgroundColor:
                inputCategoria === 'OUTRAS_CATEGORIAS' ? '#e82c4f3d' : ''
            }}
            className="categoria-elemento OUTRAS_CATEGORIAS"
            onClick={selecionaCategoria}
          >
            <FontAwesomeIcon
                  className='icone'
                  icon={faEllipsis}
                  style={{ color: '#E82C4F'}}
                />
            <h2 className="titulo-categoria OUTRAS_CATEGORIAS">
              Outras categorias
            </h2>
          </div>
        </div>
      </div>

      <div
        className={dadosDisplay ? 'dados' : 'dados-hidden'}
        style={{
          animation: animationStatus
            ? 'pop-up 0.7s ease-in-out'
            : 'pop-down 0.4s alternate'
        }}
      >
        <h1
          style={{
            animation: animationStatus
              ? 'pop-up 0.7s ease-in-out'
              : 'pop-down 0.4s alternate'
          }}
          className="titulo"
        >
          <button
            onClick={voltarAoDisplayCategorias}
            style={{ display: primeiroInput ? 'flex' : 'none' }}
            className="botao-voltar"
          >
            {'<'}
          </button>
          Fala para gente um pouco sobre esse evento...
        </h1>
        <div
          className={dadosDisplay ? 'textfield' : 'textfield-hidden'}
          style={{
            animation: animationStatus
              ? 'slide-in 0.6s ease-in-out'
              : 'pop-down 0.4s alternate'
          }}
        >
          <label>Nome do evento*</label>
          <input
            onFocus={event => HandleFocus(event)}
            onBlur={event => BlurFocus(event)}
            type="text"
            maxLength={25}
            name="nome"
            value={inputNome}
            onChange={event => aoDigitado(event)}
            placeholder="Digite o nome do evento"
          ></input>
        </div>
        <div
          className={primeiroInput ? 'textfield' : 'textfield-hidden'}
          style={{
            animation: animationStatus
              ? 'slide-in 0.6s ease-in-out'
              : 'pop-down 0.4s alternate'
          }}
        >
          <label>Dia do evento*</label>
          <input
            onFocus={event => HandleFocus(event)}
            onBlur={event => BlurFocus(event)}
            type="date"
            value={inputData}
            name="data"
            onChange={event => aoDigitado(event)}
          ></input>
        </div>
        <div
          className={segundoInput ? 'textfield' : 'textfield-hidden'}
          style={{
            animation: animationStatus
              ? 'slide-in 0.6s ease-in-out'
              : 'pop-down 0.4s alternate'
          }}
        >
          <label>Horário do evento*</label>
          <input
            onFocus={event => HandleFocus(event)}
            onBlur={event => BlurFocus(event)}
            type="time"
            name="horario"
            value={inputHorario}
            onChange={event => aoDigitado(event)}
          ></input>
        </div>
        <button
          onClick={() => avancar(1)}
          style={{ display: segundoInput ? 'block' : 'none' }}
        >
          avançar
        </button>
      </div>

      <div
        id={dadosSegundoDisplay ? 'dadosSegundo' : 'dadosSegundo-hidden'}
        className="dados"
        style={{
          animation: animationStatus
            ? 'pop-up 0.7s ease-in-out'
            : 'pop-down 0.4s alternate'
        }}
      >
        <h1
          style={{
            animation: animationStatus
              ? 'pop-up 0.7s ease-in-out'
              : 'pop-down 0.4s alternate'
          }}
          className="titulo"
        >
          <button
            onClick={() => voltar(1)}
            style={{ display: primeiroInput ? 'flex' : 'none' }}
            className="botao-voltar"
          >
            {'<'}
          </button>{' '}
          Fala mais um pouquinho para gente...
        </h1>

        <div
          className={dadosSegundoDisplay ? 'textfield' : 'textfield-hidden'}
          style={{
            animation: animationStatus
              ? 'slide-in 0.6s ease-in-out'
              : 'pop-down 0.4s alternate'
          }}
        >
          <label>Tipo de ingresso*</label>
          <div className="row">
            <button
              id="fisico"
              onClick={event => selecionaTipo(event)}
              className={fisico ? 'checkbox-checked' : 'checkbox'}
            >
              físico
            </button>
            <button
              id="digital"
              onClick={event => selecionaTipo(event)}
              className={digital ? 'checkbox-checked' : 'checkbox'}
            >
              digital
            </button>
            <button
              id="ambos"
              onClick={event => selecionaTipo(event)}
              className={ambos ? 'checkbox-checked' : 'checkbox'}
            >
              ambos
            </button>
          </div>
        </div>
        <div
          className={primeiroInput ? 'textfield' : 'textfield-hidden'}
          style={{
            animation: animationStatus
              ? 'slide-in 0.6s ease-in-out'
              : 'pop-down 0.4s alternate'
          }}
        >
          <label>Setor do ingresso (se houver)</label>
          <input
            onFocus={event => HandleFocus(event)}
            onBlur={event => BlurFocus(event)}
            maxLength={10}
            type="text"
            placeholder="Digite o setor referente ao ingresso"
            name="setor"
            value={inputSetor}
            onChange={event => aoDigitado(event)}
          ></input>
        </div>
        <div
          className={segundoInput ? 'textfield' : 'textfield-hidden'}
          style={{
            animation: animationStatus
              ? 'slide-in 0.6s ease-in-out'
              : 'pop-down 0.4s alternate'
          }}
        >
          <label>Quantidade de ingressos</label>
          <input
            onFocus={event => HandleFocus(event)}
            onBlur={event => BlurFocus(event)}
            type="number"
            min="1"
            name="quantidade"
            value={inputQuantidade}
            placeholder="1"
            onChange={event => aoDigitado(event)}
          ></input>
        </div>
        <button
          onClick={() => avancar(2)}
          style={{ display: segundoInput ? 'block' : 'none' }}
        >
          avançar
        </button>
      </div>

      <div
        id={dadosTerceiroDisplay ? 'dadosTerceiro' : 'dadosTerceiro-hidden'}
        className="dados"
        style={{
          animation: animationStatus
            ? 'pop-up 0.7s ease-in-out'
            : 'pop-down 0.4s alternate'
        }}
      >
        <h1
          style={{
            animation: animationStatus
              ? 'pop-up 0.7s ease-in-out'
              : 'pop-down 0.4s alternate'
          }}
          className="titulo"
        >
          <button
            onClick={() => voltar(2)}
            style={{ display: primeiroInput ? 'flex' : 'none' }}
            className="botao-voltar"
          >
            {'<'}
          </button>
          Está quase lá, só mais algumas informações...
        </h1>

        <div
          className={dadosTerceiroDisplay ? 'textfield' : 'textfield-hidden'}
          style={{
            animation: animationStatus
              ? 'slide-in 0.6s ease-in-out'
              : 'pop-down 0.4s alternate'
          }}
        >
          <div className="textfield">
            <label>
              Imagem do evento
              <div
                className="aviso-card"
                style={{ display: avisoDisplay ? 'flex' : 'none' }}
              >
                <p>
                  Atenção! Cuidado para não mostrar dados pessoais ou o QR code
                  do ingresso na foto
                </p>
              </div>
            </label>
            <div id="campoImagem">
              <div className="upload-btn-wrapper">
                <div className='btn'>
                <FontAwesomeIcon
                  icon={faCamera}
                  style={{ color: '#E82C4F', fontSize: '3rem'}}
                />
         
                  <span className='adicionar-foto-texto'>
                    <b>Adicionar foto</b> <br/>
                    JPG e PNG somente
                  </span>
                </div>
                <input id="imagem" type="file" onChange={handleImageChange} />
              </div>
              {inputImage && (
                <img
                  id="imagemCarregada"
                  src={inputImage}
                  alt="Imagem carregada"
                />
              )}
              <FontAwesomeIcon
                  className='remover-imagem'
                  icon={faXmarkCircle}
                  style={{ color: '#E82C4F',display: removeStatusImage  }}
                  onClick={handleImageRemove}
                />
            </div>
          </div>
        </div>
        <div
          className={primeiroInput ? 'textfield' : 'textfield-hidden'}
          style={{
            animation: animationStatus
              ? 'slide-in 0.6s ease-in-out'
              : 'pop-down 0.4s alternate'
          }}
        >
          <label>Descrição do evento</label>
          <textarea
            onFocus={event => HandleFocus(event)}
            onBlur={event => BlurFocus(event)}
            maxLength={280}
            onChange={event => aoDigitado(event)}
            name="descricao"
          ></textarea>
          <div className="contador">({inputDescricao.length}/280)</div>
        </div>

        <button
          onClick={() => avancar(3)}
          style={{ display: segundoInput ? 'block' : 'none' }}
        >
          avançar
        </button>
      </div>

      <div
        id={dadosQuartoDisplay ? 'dadosQuarto' : 'dadosQuarto-hidden'}
        className="dados"
        style={{
          animation: animationStatus
            ? 'pop-up 0.7s ease-in-out'
            : 'pop-down 0.4s alternate'
        }}
      >
        <h1
          style={{
            animation: animationStatus
              ? 'pop-up 0.7s ease-in-out'
              : 'pop-down 0.4s alternate'
          }}
          className="titulo"
        >
          <button
            onClick={() => voltar(3)}
            style={{ display: primeiroInput ? 'flex' : 'none' }}
            className="botao-voltar"
          >
            {'<'}
          </button>
          Diz para gente onde fica esse evento...
        </h1>

        <div
          className={dadosQuartoDisplay ? 'textfield' : 'textfield-hidden'}
          style={{
            animation: animationStatus
              ? 'slide-in 0.6s ease-in-out'
              : 'pop-down 0.4s alternate'
          }}
        >
          <label>CEP*</label>
          <input
            onFocus={event => HandleFocus(event)}
            onBlur={event => BlurFocus(event)}
            type="text"
            name="cep"
            value={inputCep}
            onChange={aoDigitado}
            placeholder="Digite o CEP"
            maxLength={9}
          />
        </div>
        <div
          className={primeiroInput ? 'textfield' : 'textfield-hidden'}
          style={{
            animation: animationStatus
              ? 'slide-in 0.6s ease-in-out'
              : 'pop-down 0.4s alternate'
          }}
        >
          <label>Logradouro*</label>
          <input
            onFocus={event => HandleFocus(event)}
            onBlur={event => BlurFocus(event)}
            type="text"
            maxLength={55}
            onChange={aoDigitado}
            placeholder="Digite o logradouro do evento"
            name="logradouro"
            value={`${inputLogradouro}`}
          />
        </div>

        <div
          className={segundoInput ? 'textfield' : 'textfield-hidden'}
          style={{
            animation: animationStatus
              ? 'slide-in 0.6s ease-in-out'
              : 'pop-down 0.4s alternate'
          }}
        >
          <label>Cidade*</label>
          <input
            onFocus={event => HandleFocus(event)}
            onBlur={event => BlurFocus(event)}
            type="text"
            maxLength={40}
            onChange={aoDigitado}
            placeholder="Digite a cidade do evento"
            name="cidade"
            value={`${inputCidade}`}
          />
        </div>

        <div
          className={terceiroInput ? 'textfield' : 'textfield-hidden'}
          style={{
            animation: animationStatus
              ? 'slide-in 0.6s ease-in-out'
              : 'pop-down 0.4s alternate'
          }}
        >
          <label>Estado(UF)*</label>
          <select
            className="select-estado"
            onFocus={event => HandleFocus(event)}
            onBlur={event => BlurFocus(event)}
            onChange={aoSelecionarEstado}
            name="estado"
            value={inputEstado}
          >
            <option value="">Selecione o estado do evento</option>
            <option value="AC">Acre</option>
            <option value="AL">Alagoas</option>
            <option value="AP">Amapá</option>
            <option value="AM">Amazonas</option>
            <option value="BA">Bahia</option>
            <option value="CE">Ceará</option>
            <option value="DF">Distrito Federal</option>
            <option value="ES">Espírito Santo</option>
            <option value="GO">Goiás</option>
            <option value="MA">Maranhão</option>
            <option value="MT">Mato Grosso</option>
            <option value="MS">Mato Grosso do Sul</option>
            <option value="MG">Minas Gerais</option>
            <option value="PA">Pará</option>
            <option value="PB">Paraíba</option>
            <option value="PR">Paraná</option>
            <option value="PE">Pernambuco</option>
            <option value="PI">Piauí</option>
            <option value="RJ">Rio de Janeiro</option>
            <option value="RN">Rio Grande do Norte</option>
            <option value="RS">Rio Grande do Sul</option>
            <option value="RO">Rondônia</option>
            <option value="RR">Roraima</option>
            <option value="SC">Santa Catarina</option>
            <option value="SP">São Paulo</option>
            <option value="SE">Sergipe</option>
            <option value="TO">Tocantins</option>
          </select>
        </div>

        <button
          onClick={() => avancar(4)}
          style={{ display: terceiroInput ? 'block' : 'none' }}
        >
          avançar
        </button>
      </div>

      <div
        id={dadosQuintoDisplay ? 'dadosQuinto' : 'dadosQuinto-hidden'}
        className="dados"
        style={{
          animation: animationStatus
            ? 'pop-up 0.7s ease-in-out'
            : 'pop-down 0.4s alternate'
        }}
      >
        <h1
          style={{
            animation: animationStatus
              ? 'pop-up 0.7s ease-in-out'
              : 'pop-down 0.4s alternate'
          }}
          className="titulo"
        >
          <button
            onClick={() => voltar(4)}
            style={{ display: dadosQuintoDisplay ? 'flex' : 'none' }}
            className="botao-voltar"
          >
            {'<'}
          </button>
          Para finalizar os dados do seu anúncio...
        </h1>

        <div
          className={dadosQuintoDisplay ? 'textfield' : 'textfield-hidden'}
          style={{
            animation: animationStatus
              ? 'slide-in 0.6s ease-in-out'
              : 'pop-down 0.4s alternate'
          }}
        >
          <label>Preço*</label>
          <input
            onFocus={event => HandleFocus(event)}
            onBlur={event => BlurFocus(event)}
            value={inputPreco}
            onChange={event => aoDigitado(event)}
            type="text"
            placeholder="R$0,00"
            name="preco"
          />
        </div>

        <div
          className={primeiroInput ? 'textfield' : 'textfield-hidden'}
          style={{
            animation: animationStatus
              ? 'slide-in 0.6s ease-in-out'
              : 'pop-down 0.4s alternate'
          }}
        >
          <label>Lote do ingresso (se houver) </label>
          <input
            onFocus={event => HandleFocus(event)}
            onBlur={event => BlurFocus(event)}
            name="lote"
            maxLength={20}
            value={inputLote}
            onChange={event => aoDigitado(event)}
            placeholder="Digite o lote do ingresso"
            type="text"
          />
        </div>

        <div
          className={segundoInput ? 'textfield' : 'textfield-hidden'}
          style={{
            animation: animationStatus
              ? 'slide-in 0.6s ease-in-out'
              : 'pop-down 0.4s alternate'
          }}
        >
          <div id="termosIngresso">
            <input value={inputTermos} type="checkbox" name="termos" />
            <h5>
              declaro que li e aceito os <b>termos e condições</b>
            </h5>
          </div>
        </div>

        <button
          onClick={submitFormulario}
          style={{ display: dadosQuintoDisplay ? 'block' : 'none' }}
        >
          cadastrar
        </button>
        <h5 id="campos-obrigatorios">Os campos com (*) são obrigatórios</h5>

        <div
          style={{
            animation: erros.camposVazios
              ? 'pop-up 0.7s ease-in-out'
              : 'pop-down 0.4s alternate'
          }}
          className="erro"
          id={erros.camposVazios ? 'erro-campos-vazios' : 'erro-campos-vazios-hidden'}
        >
          
           <h4> 
             <FontAwesomeIcon
                  className='remover-imagem'
                  icon={faXmarkCircle}
                  style={{ color: '#E82C4F',display: removeStatusImage  }}
                  onClick={handleImageRemove}
                />Existem campos obrigatórios (*) vazios.</h4> 
           </div>


      </div>
    </div>
  )
}

export default Card
