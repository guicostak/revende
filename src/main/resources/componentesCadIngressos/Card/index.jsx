import './Card.scss'
import { useState, useEffect } from 'react'
import shows from '../../img/vetores/categorias/shows.png'
import teatro from '../../img/vetores/categorias/teatro.png'
import esportes from '../../img/vetores/categorias/esportes.png'
import standup from '../../img/vetores/categorias/standup.png'
import palestras from '../../img/vetores/categorias/palestras.png'
import infantis from '../../img/vetores/categorias/infantis.png'
import outros from '../../img/vetores/categorias/outros.png'
import camera from '../../img/vetores/camera.png'
import remove from '../../img/vetores/remove.png'
import exclamacao from '../../img/vetores/exclamacaoVermelha.png'
import axios from 'axios'

const images = {
  SHOWS_E_FESTAS: shows,
  ESPETACULOS_E_TEATROS: teatro,
  EVENTOS_ESPORTIVOS: esportes,
  STANDUP_E_COMEDIA: standup,
  PALESTRAS_E_SEMINARIOS: palestras,
  EVENTOS_INFANTIS: infantis,
  OUTRAS_CATEGORIAS: outros
}

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
  const [removeStatusImage, setRemoveStatusImage] = useState('none')
  const [avisoDisplay, setAvisoDisplay] = useState(false)
  

  const [erros, setErros] = useState({
    nome: '',
    data: '',
    horario: '',
    categoria: '',
    tipo: '',
    cep: '',
    logradouro: '',
    cidade: '',
    estado: '',
    preco: '',
  });

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
    preco: false,
  });

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

  const HandleFocus = (event) => {
    event.target.style.borderColor = 'var(--text-color)';
  }

  const BlurFocus = (event) => {
    event.target.style.borderColor = 'var(--main-color)';
  }

  const selecionaCategoria = (event) => {
    setInputCategoria(event.target.id)

    Promise.resolve()
    .then(() => new Promise(resolve => setTimeout(resolve, 380)))
    .then(() => {
      setCategoriasDisplay(false);
      setAnimationStatus(true);
    })
    .then(() => new Promise(resolve => setTimeout(resolve, 200)))
    .then(() => {
      setDadosDisplay(true);
      setPrimeiroInput(true);
    })
    .then(() => new Promise(resolve => setTimeout(resolve, 200)))
    .then(() => setSegundoInput(true));
  }

  const avancar = (etapa) => {
    setAnimationStatus(false);
  
    setTimeout(() => {
      setPrimeiroInput(false);
      setSegundoInput(false);
  
      switch (etapa) {
        case 1:
          setDadosDisplay(false);
          setAnimationStatus(true);
          setDadosSegundoDisplay(true);
          break;
        case 2:
          setDadosSegundoDisplay(false);
          setAnimationStatus(true);
          setDadosTerceiroDisplay(true);
          break;
        case 3:
          setDadosTerceiroDisplay(false);
          setAnimationStatus(true);
          setDadosQuartoDisplay(true);
          break;
        case 4:
          setDadosQuartoDisplay(false);
          setAnimationStatus(true);
          setDadosQuintoDisplay(true);
          break;
        default:
          break;
      }
  
      setTimeout(() => {
        setPrimeiroInput(true);
        setTimeout(() => {
          setSegundoInput(true);
        }, 200);
      }, 200);
    }, 380);
  };

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
    const { name, value } = target;
    
    if (name === 'cep') {
      const formattedCep = value.replace(/\D/g, ''); // Remove caracteres não numéricos
      const cepWithMask = formattedCep.replace(/(\d{5})(\d)/, '$1-$2'); // Adiciona o hífen na posição correta
      setInputCep(cepWithMask);
      
      if (formattedCep.length === 8) {
        try {
          const response = await axios.get(
            `https://viacep.com.br/ws/${formattedCep}/json/`
          );
          
          setInputCidade(response.data.localidade);
          setInputEstado(response.data.uf);
          setInputLogradouro(response.data.logradouro);
        } catch (error) {
          console.log(error);
        }
      }
    } else if (name === 'descricao') {
      setInputDescricao(value);
    } else if (name === 'logradouro') {
      setInputLogradouro(value);
    } else if (name === 'cidade') {
      setInputCidade(value);
    } else if (name === 'estado') {
      setInputCidade(value);
    } else if (name === 'lote') {
      setInputLote(value);
    } else if (name === 'setor') {
      setInputSetor(value);
    } else if (name === 'quantidade') {
      setInputQuantidade(value);
    } else if (name === 'nome') {
      setInputNome(value);
    } else if (name === 'horario') {
      setInputHorario(value);
    } else if (name === 'data') {
      setInputData(value);
    } else if (name === 'preco') {
      const newPreco = formatarPreco(value);
      setInputPreco(newPreco);
      
      if (newPreco === '') {
        target.value = ''; // campo vazio se o novo preço for uma string vazia
      } else {
        inputPreco(newPreco); // exibir o novo preço formatado
      }
    }
  };

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
   

  if (!inputCategoria) {
  setCampoValido((prevState) => ({
    ...prevState,
    categoria: false
  }));
} else {
  setCampoValido((prevState) => ({
    ...prevState,
    categoria: true
  }))}

  if (!inputNome) {
    setCampoValido((prevState) => ({
      ...prevState,
      nome: false
      
    }));
  } else {
    setCampoValido((prevState) => ({
      ...prevState,
      nome: true
    }));
  }

  if (!inputData) {
    setCampoValido((prevState) => ({
      ...prevState,
      data: false
    }));
  } else {
    setCampoValido((prevState) => ({
      ...prevState,
      data: true
    }));
  }

  if (!inputHorario) {
    setCampoValido((prevState) => ({
      ...prevState,
      horario: false
    }));
  } else {
    setCampoValido((prevState) => ({
      ...prevState,
      horario: true
    }));
  }

  if (!inputTipo) {
    setCampoValido((prevState) => ({
      ...prevState,
      tipo: false
    }));
  } else {
    setCampoValido((prevState) => ({
      ...prevState,
      tipo: true
    }));
  }

  if (!inputCep) {
    setCampoValido((prevState) => ({
      ...prevState,
      cep: false
    }));
  } else {
    setCampoValido((prevState) => ({
      ...prevState,
      cep: true
    }));
  }

  if (!inputLogradouro) {
    setCampoValido((prevState) => ({
      ...prevState,
      logradouro: false
    }));
  } else {
    setCampoValido((prevState) => ({
      ...prevState,
      logradouro: true
    }));
  }

  if (!inputCidade) {
    setCampoValido((prevState) => ({
      ...prevState,
      cidade: false
    }));
  } else {
    setCampoValido((prevState) => ({
      ...prevState,
      cidade: true
    }));
  }

  if (!inputEstado) {
    setCampoValido((prevState) => ({
      ...prevState,
      estado: false
    }));
  } else {
    setCampoValido((prevState) => ({
      ...prevState,
      estado: true
    }));
  }

  if (!inputPreco) {
    setCampoValido((prevState) => ({
      ...prevState,
      preco: false
    }));
  } else {
    setCampoValido((prevState) => ({
      ...prevState,
      preco: true
    }));
  }

  if(Object.values(campoValido).every((valor) => valor === true)){
    
  }








  }

  return (
    <div className="card">
      <div
        className={categoriasDisplay ? 'categorias' : 'categorias-hidden'}
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
            id="SHOWS_E_FESTAS"
             style={{ backgroundColor: inputCategoria === "SHOWS_E_FESTAS" ? '#e82c4f3d' : '' }}
            className="categoria"
            onClick={selecionaCategoria}
          >
            <img src={images.SHOWS_E_FESTAS} alt="Shows e festas" />
            <h2>Shows e festas</h2>
          </div>
          <div
            id="ESPETACULOS_E_TEATROS"
            style={{ backgroundColor: inputCategoria === "ESPETACULOS_E_TEATROS" ? '#e82c4f3d' : '' }}
            className="categoria"
            onClick={selecionaCategoria}
          >
            <img
              src={images.ESPETACULOS_E_TEATROS}
              alt="Espetáculos e teatro"
            />
            <h2>Espetáculos e teatro</h2>
          </div>
          <div
            id="EVENTOS_ESPORTIVOS"
            style={{ backgroundColor: inputCategoria === "EVENTOS_ESPORTIVOS" ? '#e82c4f3d' : '' }}
            className="categoria"
            onClick={selecionaCategoria}
          >
            <img src={images.EVENTOS_ESPORTIVOS} alt="Eventos esportivos" />
            <h2>Eventos esportivos</h2>
          </div>
          <div
            id="STANDUP_E_COMEDIA"
            style={{ backgroundColor: inputCategoria === "STANDUP_E_COMEDIA" ? '#e82c4f3d' : '' }}
            className="categoria"
            onClick={selecionaCategoria}
          >
            <img src={images.STANDUP_E_COMEDIA} alt="Stand Up e Comédia" />
            <h2>Stand Up e Comédia</h2>
          </div>
          <div
            id="PALESTRAS_E_SEMINARIOS"
            style={{ backgroundColor: inputCategoria === "PALESTRAS_E_SEMINARIOS" ? '#e82c4f3d' : '' }}
            className="categoria"
            onClick={selecionaCategoria}
          >
            <img
              src={images.PALESTRAS_E_SEMINARIOS}
              alt="Palestras e seminários"
            />
            <h2>Palestras e seminários</h2>
          </div>
          <div
            id="EVENTOS_INFANTIS"
            style={{ backgroundColor: inputCategoria === "EVENTOS_INFANTIS" ? '#e82c4f3d' : '' }}
            className="categoria"
            onClick={selecionaCategoria}
          >
            <img src={images.EVENTOS_INFANTIS} alt="Eventos infantis" />
            <h2>Eventos infantis</h2>
          </div>
          <div
            id="OUTRAS_CATEGORIAS"
            style={{ backgroundColor: inputCategoria === "OUTRAS_CATEGORIAS" ? '#e82c4f3d' : '' }}
            className="categoria"
            onClick={selecionaCategoria}
          >
            <img src={images.OUTRAS_CATEGORIAS} alt="Outras categorias" />
            <h2>Outras categorias</h2>
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
          <label>*Nome do evento</label>
          <input
           onFocus={(event)=> HandleFocus(event)}
           onBlur={(event)=> BlurFocus(event)}
            type="text"
            maxLength={24}
            name='nome'
            value={inputNome}
            onChange={(event) => aoDigitado(event)}
            
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
          <label>*Dia do evento</label>
          <input onFocus={(event)=> HandleFocus(event)}
          onBlur={(event)=> BlurFocus(event)}
           type="date" value={inputData} name='data' onChange={(event) => aoDigitado(event)}></input>
        </div>
        <div
          className={segundoInput ? 'textfield' : 'textfield-hidden'}
          style={{
            animation: animationStatus
              ? 'slide-in 0.6s ease-in-out'
              : 'pop-down 0.4s alternate'
          }}
        >
          <label>*Horário do evento</label>
          <input onFocus={(event)=> HandleFocus(event)}
          onBlur={(event)=> BlurFocus(event)}
          type="time" name='horario' value={inputHorario} onChange={(event) => aoDigitado(event)} ></input>
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
          <label>*Tipo de ingresso</label>
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
          <label>Setor do ingresso(se houver)</label>
          <input
            onFocus={(event)=> HandleFocus(event)}
            onBlur={(event)=> BlurFocus(event)}
            type="text"
            placeholder="Digite o setor referente ao ingresso"
            name='setor'
            value={inputSetor}
            onChange={(event) => aoDigitado(event)}
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
          <input onFocus={(event)=> HandleFocus(event)}
          onBlur={(event)=> BlurFocus(event)} type="number" min="1" name='quantidade' value={inputQuantidade} placeholder="1" onChange={(event) => aoDigitado(event)}></input>
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
              Imagem do evento{' '}
              <img
                onMouseEnter={aviso}
                onMouseOut={avisoOff}
                class="aviso"
                src={exclamacao}
              />
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
                <img src={camera} className="btn" />
                <input id="imagem" type="file" onChange={handleImageChange} />
              </div>
              {inputImage && (
                <img
                  id="imagemCarregada"
                  src={inputImage}
                  alt="Imagem carregada"
                />
              )}
              <img
                style={{ display: removeStatusImage }}
                src={remove}
                className="remover-imagem"
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
          <textarea onFocus={(event)=> HandleFocus(event)}
          onBlur={(event)=> BlurFocus(event)} maxLength={280} onChange={(event) => aoDigitado(event)} name='descricao'></textarea>
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
          <label>*CEP</label>
          <input
            onFocus={(event)=> HandleFocus(event)}
            onBlur={(event)=> BlurFocus(event)}
            type="text"
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
          <label>*Logradouro </label>
          <input
            onFocus={(event)=> HandleFocus(event)}
            onBlur={(event)=> BlurFocus(event)}
            type="text"
            onChange={aoDigitado}
            placeholder="Digite o logradouro do evento"
            name='logradouro'
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
          <label>*Cidade</label>
          <input
            onFocus={(event)=> HandleFocus(event)}
            onBlur={(event)=> BlurFocus(event)}
            type="text"
            onChange={aoDigitado}
            placeholder="Digite a cidade do evento"
            name='cidade'
            value={`${inputCidade}`}
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
          <label>*Estado(UF)</label>
          <input
            onFocus={(event)=> HandleFocus(event)}
            onBlur={(event)=> BlurFocus(event)}
            type="text"
            onChange={aoDigitado}
            placeholder="Digite o estado do evento"
            name='estado'
            value={`${inputEstado}`}
          />
        </div>


        <button
          onClick={() => avancar(4)}
          style={{ display: segundoInput ? 'block' : 'none' }}
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
          <label>*Preço</label>
          <input
            onFocus={(event)=> HandleFocus(event)}
            onBlur={(event)=> BlurFocus(event)}
            value={inputPreco}
            onChange={event => aoDigitado(event)}
            type="text"
            placeholder="R$0,00"
            name='preco'
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
            onFocus={(event)=> HandleFocus(event)}
            onBlur={(event)=> BlurFocus(event)}
            name='lote'
            value={inputLote}
            onChange={event => aoDigitado(event)}
            placeholder='Digite o lote do ingresso'
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
          <div id='termosIngresso'>
          <input

            type="checkbox"
          /><h5>declaro que li e aceito os <b>termos e condições</b></h5>
        </div>
        </div>

        <button
          onClick={submitFormulario}
          style={{ display: dadosQuintoDisplay ? 'block' : 'none' }}
        >
          cadastrar
        </button>
      </div>
    </div>
  )
}

export default Card
