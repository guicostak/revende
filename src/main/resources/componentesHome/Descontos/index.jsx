import './Descontos.css'
import cinquentaoff from '../../img/descontos/50off.png'
import vinteoff from '../../img/descontos/20off.png'
import quarentaoff from '../../img/descontos/40off.png'
import sessentaoff from '../../img/descontos/60off.png'
import oitentaoff from '../../img/descontos/80off.png'


const Descontos = () =>{
  return(
    <div className='descontos'>
      <h1>Anúncios com descontos</h1>
      <div className='descontosLista'>
        <div className='borda'>
          <img src={vinteoff}/>
        </div>
        <div className='borda'>
          <img src={quarentaoff}/>
        </div>
        <div className='borda'>
          <img src={cinquentaoff}/>
        </div>
        <div className='borda'>
          <img src={sessentaoff}/>
        </div>
        <div className='borda'>
          <img src={oitentaoff}/>
        </div>
      </div>

    </div>
  )

}

export default Descontos