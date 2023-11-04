import './SuccessfullyChangeMessage.scss'

const SuccessfullyChangeMessage = ({displayStatus, message}) => {
    return( 
        <div style={{display: displayStatus ? 'flex' : 'none'}} className="successfully-message">
            {message}
        </div>
    )
}

export default SuccessfullyChangeMessage