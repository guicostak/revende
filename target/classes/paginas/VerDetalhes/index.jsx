import Header from '../../componentesCadIngressos/HeaderVermelho'
import Ingresso from '../../componentesVerDetalhes/Ingresso'
import Ingressos from '../../componentesHome/Ingressos'
import Rodape from '../../componentesHome/Rodape'

const VerDetalhes = () =>{
return(
<body>
  <Header />
  <Ingresso />
  <Ingressos api={'http://localhost:8080/ticket/recomended'} titulo={"Anúncios relacionados"} tituloTamanho={'22vw'}/>
  <Rodape/>
</body>
)
}

export default VerDetalhes