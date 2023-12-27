import './AuthenticatedMessage.scss'

const AuthenticatedMessage = ({displayStatus, firstName}) => {
    return( 
        <div style={{display: displayStatus ? 'flex' : 'none'}} className="authenticated-message">
            Bem vindo {firstName}!
        </div>
    )
}

export default AuthenticatedMessage;