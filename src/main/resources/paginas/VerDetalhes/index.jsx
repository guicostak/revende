import Header from '../../componentesCadIngressos/Header'
import Ingresso from '../../componentesVerDetalhes/Ingresso'
import Ingressos from '../../componentesHome/Ingressos'
import Rodape from '../../componentesHome/Rodape'
import Quebra from '../../componentesHome/Quebra'

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