import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faXmarkCircle } from '@fortawesome/free-solid-svg-icons';
import Botao from '../../components/public/Botao';
import './ConfirmPage.scss';
import confirm from '../../assets/img/utils/Confirmed-rafiki.svg';
import error from '../../assets/img/utils/Feeling sorry-rafiki.svg';
import confirmed from '../../assets/img/utils/Confirmed-bro.svg';
import LoadingSpinner from '../../utils/LoadingSpinner'


function ConfirmPage() {
  const { token } = useParams();
  const [status, setStatus] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const apiUrl = `http://localhost:8080/api/users/confirm/${token}`;
  
    axios.get(apiUrl)
      .then((response) => {
        setStatus(response.status);
      })
      .catch((error) => {
        setResponseMessage(error.response.data);
      })
      .finally(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 700)
      });
  }, [token]);
  


  const renderConfirmationCard = (title, titleComplementation, imgSrc, message, displayCondition, buttonText, icone) => {
    return (
      <div style={{ display: displayCondition }} className="confirm-card">
        <div className="card-body">
          <h5 className="confirm-titulo">
            <b style={{ fontSize: '2.2rem' }}>{title}</b><br />
            {titleComplementation}
          </h5>
          <img className='confirm-img' src={imgSrc} />
          <p className="card-text">{message}<FontAwesomeIcon className='icone' icon={icone}  /></p> 
          <Botao
            text={buttonText}
            path="/"
            buttonWidth="20em"
          />
        </div>
      </div>
    );
  };

  return (
    <div className="confirm-body">
      {isLoading ? (
        <LoadingSpinner /> 
      ) : (
        <div>
          {renderConfirmationCard(
            'Oopss!',
            'Email já confirmado!',
            confirmed,
            'Faça login em sua conta agora mesmo! ',
            status !== 200 &&
              responseMessage ===
                'com.revende.exception.BusinessException: Email já foi confirmado anteriormente'
              ? 'flex'
              : 'none',
            'Voltar ao site',
            faCheckCircle
          )}
  
          {renderConfirmationCard(
            'Oopss!',
            'Erro na confirmação!',
            error,
            'Por favor, tente novamente mais tarde',
            status !== 200 &&
              responseMessage !==
                'com.revende.exception.BusinessException: Email já foi confirmado anteriormente'
              ? 'flex'
              : 'none',
            'Voltar ao site',
            faXmarkCircle
          )}
  
          {renderConfirmationCard(
            'Uhuull!',
            'Email confirmado!',
            confirm,
            'Sua conta foi ativada com sucesso!',
            status === 200 ? 'flex' : 'none',
            'Acesse sua Conta', 
            faCheckCircle
          )}
        </div>
      )}
    </div>
  );
  
}

export default ConfirmPage;
