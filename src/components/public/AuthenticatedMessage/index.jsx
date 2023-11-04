import './AuthenticatedMessage.scss'

const AuthenticatedMessage = ({displayStatus, usuario}) => {
    return( 
        <div style={{display: displayStatus ? 'flex' : 'none'}} className="authenticated-message">
            Bem vindo {usuario}!
        </div>
    )
}

export default AuthenticatedMessage;