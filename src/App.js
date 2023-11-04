import Root from './Root';
import Cookies from 'js-cookie';
import React, { useEffect } from 'react';
import axios from 'axios';

function App() {
  const expires = Cookies.get('expires');
  const refreshToken = Cookies.get('refresh_token');
  const email = Cookies.get('email');

  useEffect(() => {
    const dataGerada = new Date(expires);
    const dataAtual = new Date();

    if (dataAtual > dataGerada) {

      const body = {
        refresh_token: refreshToken,
        email: email,
      };

      async function fetchData() {
        try {
          const response = await axios.post('http://localhost:8080/api/auth/token', body);
          const { token, expires } = response.data;  

          Cookies.set('access_token', token);
          Cookies.set('expires', expires);
        } catch (error) {
          console.log(error);
        }
      }

      fetchData();
    } 
  }, []);

  return <Root />;
}

export default App;
