import React from 'react';
import Title from '../atoms/Title'; 
import CallToAction from '../molecules/CallToAction'; 

interface HomeTemplateProps {
  isLoggedIn: boolean;
}

const HomeTemplate: React.FC<HomeTemplateProps> = ({ isLoggedIn }) => (
  <div>
    <Title>Welcome to the Home Page</Title>
    {isLoggedIn ? (
      <p>You are logged in. Enjoy your stay!</p>
    ) : (
      <CallToAction />
    )}
  </div>
);

export default HomeTemplate;
