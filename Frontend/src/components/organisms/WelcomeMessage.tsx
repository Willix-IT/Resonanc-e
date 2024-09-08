import React from 'react';
import Paragraph from '../atoms/Paragraph';
import CallToAction from '../molecules/CallToAction';
import LinkButton from '../atoms/LinkButton';

const WelcomeMessage: React.FC<{ isLoggedIn: boolean }> = ({ isLoggedIn }) => {
  return (
    <div>
      {isLoggedIn ? (
        <>
          <Paragraph>You are logged in. Enjoy your stay!</Paragraph>
          <LinkButton to="/dashboard">Go to your Dashboard</LinkButton>
        </>
      ) : (
        <>
          <Paragraph>Please log in to access more features.</Paragraph>
          <CallToAction />
        </>
      )}
    </div>
  );
};

export default WelcomeMessage;
