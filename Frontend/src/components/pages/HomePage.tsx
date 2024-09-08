import React from 'react';
import HomeTemplate from '../template/HomeTemplate'; 

const HomePage: React.FC = () => {
  // Vérifier si l'utilisateur est connecté en vérifiant la présence d'un token
  const isLoggedIn = !!localStorage.getItem('token');

  return (
    <HomeTemplate isLoggedIn={isLoggedIn} />
  );
};

export default HomePage;
