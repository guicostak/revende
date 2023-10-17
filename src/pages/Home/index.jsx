import React, { useEffect, useState } from 'react';
import Navbar from '../../layouts/Home/Navbar';
import Categorias from '../../layouts/Home/Categorias';
import Carrosel from '../../layouts/Home/Carrosel';

const HomePage = () => {

  return (
    <div id="home" className='container-fluid body'>
      <Navbar />
      <Categorias />
      <Carrosel />
    </div>
  );
}

export default HomePage;
