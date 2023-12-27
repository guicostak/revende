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
  faCamera,
  faXmarkCircle,
} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'
import ErrorMessageCadastroIngresso from '../ErrorMessageCadastroIngresso'
import Cookies from 'js-cookie';

const Card = () => {
  const [abrePagina, setAbrePagina] = useState(false)
  const [animationStatus, setAnimationStatus] = useState(true)
  const [categoriasDisplay, setCategoriasDisplay] = useState(true)
  const [dadosDisplay, setDadosDisplay] = useState(false)
  const [dadosSegundoDisplay, setDadosSegundoDisplay] = useState(false)
  const [dadosTerceiroDisplay, setDadosTerceiroDisplay] = useState(false)
  const [dadosQuartoDisplay, setDadosQuartoDisplay] = useState(false)
  const [primeiroInput, setPrimeiroInput] = useState(false)
  const [segundoInput, setSegundoInput] = useState(false)
  const [removeStatusImage, setRemoveStatusImage] = useState('none')
  const [formMensagem, setFormMensagem] = useState({});
  const [fisico, setFisico] = useState(false)
  const [digital, setDigital] = useState(false)
  const [ambos, setAmbos] = useState(false)

  const [inputCategoria, setInputCategoria] = useState('')
  const [inputNome, setInputNome] = useState('')
  const [inputData, setInputData] = useState('')
  const [inputTipo, setInputTipo] = useState('')
  const [inputImage, setInputImage] = useState('')
  const [inputDescricao, setInputDescricao] = useState('')
  const [inputLogradouro, setInputLogradouro] = useState('')
  const [inputPreco, setInputPreco] = useState('')
  const [inputTermos, setInputTermos] = useState('')
  const token = Cookies.get('access_token');

  const mensagensDeErro = {
    'none': '',
    'empty': 'Campo obrigatório*',
    'dataPassada': 'A data que você digitou já passou',
    'termos': 'Você deve aceitar os termos e condições',
    'preco':  'O valor mínimo do ingresso deve ser R$10,00',
    'image': 'Por favor, selecione uma imagem JPG ou PNG',
    'formulario': 'Houveram erros no formulário por favor'
  }; 

  const HandleFocus = event => {
    event.target.style.borderColor = 'var(--text-color)'
  }

  const BlurFocus = event => {
    event.target.style.borderColor = 'var(--main-color)'
    validaCampos(event);
  }

  const validaCampos = (e) => {
    const { name, value } = e.target; 

    if(value === '') {
      setFormMensagem({
        ...formMensagem,
        [name]: mensagensDeErro.empty,
      });
    }

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
        default:
          break
      }

      setTimeout(() => {
        setPrimeiroInput(true)
        setTimeout(() => {
          setSegundoInput(true)
        }, 200)
      }, 200)
    }, 380)
  }

  const voltar = etapa => {
    setAnimationStatus(false)

    setTimeout(() => {
      setPrimeiroInput(false)
      setSegundoInput(false)

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
        default:
          break
      }

      setTimeout(() => {
        setPrimeiroInput(true)
        setTimeout(() => {
          setSegundoInput(true)
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
    const file = e.target.files[0];

    if (file) {
        const fileExtension = file.name.split('.').pop().toLowerCase();
        if (fileExtension === 'jpg' || fileExtension === 'png') {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setInputImage(reader.result);
                    setRemoveStatusImage('flex');
                }
            };
            reader.readAsDataURL(file);
        } else {
          setFormMensagem((prevFormMensagem) => ({
            ...prevFormMensagem,
            image: mensagensDeErro.image,
          }));
            e.target.value = null;
        }
    }
};

  const aoDigitado = async ({ target }) => {
    const { name, value } = target

    setFormMensagem({
      ...formMensagem,
      [name]: mensagensDeErro.none,
    });

     if (name === 'descricao') {
      setInputDescricao(value)
    } else if (name === 'logradouro') {
      setInputLogradouro(value)
    } else if (name === 'nome') {
      setInputNome(value)
    } else if (name === 'data') {
      const dataInserida = new Date(value);
      const dataAtual = new Date();
    

      dataAtual.setHours(0, 0, 0, 0);
   
      if (dataInserida < dataAtual) {
        
        const novaData = new Date();
        setInputData(novaData.toISOString().split('T')[0]); 
      } else {
        // Se não for, aceita a data inserida
        setInputData(value);
      }
    }
     else if (name === 'termos') {
      setInputTermos(value)
    } else if (name === 'preco') {
      setInputPreco(formatarPreco(value))
    }
  }

  function formatarPreco(preco) {
    // Verifica se o preço é nulo ou vazio
    if (!preco || preco === 'R$ ,') {
      return '';
    }
  
    preco = preco.toString().replace(/\D/g, '');
    const centavos = preco.slice(-2);
    preco = preco.slice(0, -2);
    preco = preco.replace(/(\d{1,})(?:\.(\d{0,2}))?/, function (match, p1, p2) {
      p1 = p1.replace(/(\d)(?=(\d{3})+$)/g, '$1.');
      if (p2 !== undefined) {
        return p1 + ',' + p2;
      } else {
        return p1;
      }
    });
  
    return 'R$ ' + preco + ',' + centavos;  
  }

  const validaTodosCampos = () => {
   const campos = [
    {
      name: 'nome',
      value: inputNome
    },
    {
      name: 'data',
      value: inputData
    },
    {
      name: 'logradouro',
      value: inputLogradouro
    },
    {
      name: 'tipo',
      value: inputTipo
    },
    {
      name: 'image',
      value: inputImage
    },
    {
      name: 'descricao',
      value: inputDescricao
    },
    {
      name: 'preco',
      value: inputPreco
    },
   ]
   campos.forEach((campo) => {
    if (!campo.value) {
      setFormMensagem((prevFormMensagem) => ({
        ...prevFormMensagem,
        [campo.name]: mensagensDeErro.empty,
      }));
    } 
    else{
      if (campo.value < 10.0 && campo.name === 'preco' ) {
        setFormMensagem((prevFormMensagem) => ({
          ...prevFormMensagem,
          [campo.name]: mensagensDeErro.preco,
        }));
      }
  }
  });

  if (!inputTermos) {
    setFormMensagem((prevFormMensagem) => ({
      ...prevFormMensagem,
      termos: mensagensDeErro.termos,
    }));
  }

  
  }

  function transformarParaFloat(valorEmReais) {
    let valorFormatado = valorEmReais.replace('R$', '').replace(',', '.');
    
    // Converter para float
    let valorFloat = parseFloat(valorFormatado);
    
    return valorFloat;
}

  const submitFormulario = () => {
      if(validaTodosCampos()) {
        const apiUrl = `http://localhost:8080/api/tickets/register`;
        const headers = {
          Authorization: `Bearer ${token}`,
        };
    
        console.log(token)
        const data = {
          title: inputNome,
          date: inputData,
          event_place: inputLogradouro,
          price: transformarParaFloat(inputPreco),
          description: inputDescricao, 
          type: inputTipo, 
          category: inputCategoria, 
          image: inputImage
        };
    
        console.log(data)
      
        axios.post(apiUrl, data, { headers })
          .then(response => {
          
            
          })
          .catch(error => {
            console.error( error);
          });

      } 
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
                inputCategoria === 'ESPETACULO_E_TEATRO' ? '#e82c4f3d' : ''
            }}
            className="categoria-elemento ESPETACULO_E_TEATRO"
            onClick={selecionaCategoria}
          >
            <FontAwesomeIcon
                  className='icone'
                  icon={faTheaterMasks}
                  style={{ color: '#E82C4F'}}
                />
            <h2 className="titulo-categoria ESPETACULO_E_TEATRO">
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
          <label>Título*</label>
          <input
            onFocus={event => HandleFocus(event)}
            onBlur={event => BlurFocus(event)}
            type="text"
            maxLength={35}
            name="nome"
            value={inputNome}
            onChange={event => aoDigitado(event)}
            placeholder="Digite o nome do evento"
          ></input>
            <ErrorMessageCadastroIngresso 
           message={formMensagem.nome}
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
          <label>Dia do evento*</label>
          <input
            onFocus={event => HandleFocus(event)}
            onBlur={event => BlurFocus(event)}
            type="date"
            value={inputData}
            name="data"
            onChange={event => aoDigitado(event)}
          ></input>
          <ErrorMessageCadastroIngresso 
           message={formMensagem.data}
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
          <label>Local do evento*</label>
          <input
            onFocus={event => HandleFocus(event)}
            onBlur={event => BlurFocus(event)}
            type="text"
            maxLength={60}
            onChange={aoDigitado}
            placeholder="Digite o local do evento"
            name="logradouro"
            value={`${inputLogradouro}`}
          />
           <ErrorMessageCadastroIngresso 
            message={formMensagem.logradouro}
          />
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

            <ErrorMessageCadastroIngresso 
              message={formMensagem.tipo}
            />
          </div>
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
        <ErrorMessageCadastroIngresso 
           message={formMensagem.image}
          />
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
          <ErrorMessageCadastroIngresso 
            message={formMensagem.descricao}
          />
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
          <label>Preço*</label>
          <input
            onFocus={event => HandleFocus(event)}
            onBlur={event => BlurFocus(event)}
            value={inputPreco}
            onChange={event => aoDigitado(event)}
            type="text"
            placeholder="R$ 0,00"
            name="preco"
          />
          <ErrorMessageCadastroIngresso 
            message={formMensagem.preco}
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
        <ErrorMessageCadastroIngresso 
              message={formMensagem.termos}
            />

        <button
          onClick={submitFormulario}
          style={{ display: dadosQuartoDisplay ? 'block' : 'none' }}
        >
          cadastrar
        </button>
        <ErrorMessageCadastroIngresso 
              message={formMensagem.formulario}
            />
        <h5 id="campos-obrigatorios">Os campos com (*) são obrigatórios</h5>
      </div>
    </div>
  )
}

export default Card
