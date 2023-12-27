import React, { useEffect, useState } from 'react';
import Navbar from '../../layouts/Home/Navbar';
import Categorias from '../../layouts/Home/Categorias';
import Carrosel from '../../layouts/Home/Carrosel';
import Rodape from '../../layouts/Home/Rodape';

const HomePage = () => {

  return (
    <div id="home">
      <Navbar />
      <Categorias />
      <Carrosel />
      <Rodape />
    </div>
  );
}

export default HomePage;
