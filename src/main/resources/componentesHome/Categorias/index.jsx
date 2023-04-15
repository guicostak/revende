import './Categorias.scss'
import shows from '../../img/categorias/shows.png'
import teatro from '../../img/categorias/teatro.png'
import esportes from '../../img/categorias/esportes.png'
import standup from '../../img/categorias/standup.png'
import palestras from '../../img/categorias/palestras.png'
import infantis from '../../img/categorias/infantis.png'
import outros from '../../img/categorias/outros.png'


const Categorias = () =>{
  return(
    <div className="Categorias">
      <h1 className="tituloHome">Seu site para a revenda de ingressos!</h1>
      <ul>
        <li><img src={shows}/><h2>Shows e festas</h2></li>
        <li><img src={teatro}/><h2>Espetáculos e teatro</h2></li>
        <li><img src={esportes}/><h2>Eventos esportivos</h2></li>
        <li><img src={standup}/><h2>Stand Up e comédia</h2></li>
        <li><img src={palestras}/><h2>Palestras e seminários</h2></li>
        <li><img src={infantis}/><h2>Eventos infantis</h2></li>
        <li><img src={outros}/><h2>Outras categorias</h2></li>
      </ul>
    </div>
  )

}


export default Categorias