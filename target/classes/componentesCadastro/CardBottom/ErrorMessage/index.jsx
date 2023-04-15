import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

const ErrorMessage = ({ classError, textError, displayState }) => {
  
  return(
    <div style={{ display: displayState }} className={classError}>
    <span>{textError}</span>
    <FontAwesomeIcon icon={faTimesCircle} />
    </div>
  )
}

export default ErrorMessage