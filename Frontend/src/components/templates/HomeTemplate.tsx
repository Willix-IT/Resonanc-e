import React from 'react';
import Title from '../atoms/Title';
import WelcomeMessage from '../organisms/WelcomeMessage';

const HomeTemplate: React.FC<{ isLoggedIn: boolean }> = ({ isLoggedIn }) => (
  <div>
    <Title>Welcome to the Home Page</Title>
    <WelcomeMessage isLoggedIn={isLoggedIn} />
  </div>
);

export default HomeTemplate;
