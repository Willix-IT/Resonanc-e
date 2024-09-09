import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

// Animation de slide pour l'apparition et la disparition de la notification
const slideIn = keyframes`
  0% { transform: translateX(100%); }
  100% { transform: translateX(0); }
`;

const slideOut = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(100%); }
`;

// Styled-component pour la notification
const NotificationWrapper = styled.div<{ show: boolean; success: boolean }>`
  position: fixed;
  bottom: 20px; /* Position en bas de l'écran */
  right: 20px;  /* Position à droite de l'écran */
  background-color: white;
  color: #2C3E50;
  padding: 15px 30px;
  border-radius: 8px;
  animation: ${({ show }) => (show ? slideIn : slideOut)} 0.5s forwards;
  z-index: 1000; /* Élève la notification au-dessus des autres éléments */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3); /* Ajout d'une ombre pour la rendre plus visible */
`;

interface NotificationProps {
  message: string;
  success?: boolean;
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({
  message,
  success = true,
  onClose,
}) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000); // Notification disparaît après 3 secondes
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <NotificationWrapper show={true} success={success}>
      {message}
    </NotificationWrapper>
  );
};

export default Notification;
