import './ErrorMessageCadastroIngresso.scss'

const ErrorMessageCadastroIngresso = ({message}) => {
    return (
        <span style={{ display: message ? 'flex' : 'none' }} className='error-message'>
            {message}
        </span>
    )
}

export default ErrorMessageCadastroIngresso;