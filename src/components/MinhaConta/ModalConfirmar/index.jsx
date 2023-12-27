import Botao from '../../public/Botao';
import './ModalConfirmar.scss';

const ModalConfirmar = ({ display, cancelar, confirmar }) => {
    const handleCancelar = () => {
        if (cancelar) {
            cancelar();
        }
    };

    const handleConfirmar = () => {
        if (confirmar) {
            confirmar();
        }
    };

    return (
        <div className='modal container-fluid modal-confirmation' style={{ display: display ? 'flex' : 'none' }}>
            <p className='sair' onClick={handleCancelar}>x</p>
            <h1 className='titulo-confirmation'>Atenção!</h1>
            <span style={{ textAlign: 'center', fontSize: '1.1rem' }}>Alterar o e-mail fará você ser deslogado. Tem certeza que deseja continuar?</span>
            <div className='botoes-edit'>
                <span onClick={handleCancelar}>Cancelar</span>
                <Botao
                    text={'Confirmar'}
                    typeButton={'button'}
                    onClick={handleConfirmar}
                />
            </div>
        </div>
    );
};

export default ModalConfirmar;
