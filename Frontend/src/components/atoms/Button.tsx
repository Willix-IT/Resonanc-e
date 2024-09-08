import styled from 'styled-components';

interface ButtonProps {
  children: React.ReactNode; // Utilisation de children pour le contenu du bouton
  onClick: () => void;
  variant?: 'primary' | 'secondary'; 
}

const StyledButton = styled.button<ButtonProps>`
  background-color: ${({ theme, variant }) => (variant === 'secondary' ? theme.colors.secondary : theme.colors.primary)};
  color: white;
  padding: ${({ theme }) => theme.spacing.medium};
  border: none;
  border-radius: 4px;
  font-size: 1rem;

  &:hover {
    background-color: ${({ theme, variant }) => (variant === 'secondary' ? theme.colors.primary : theme.colors.secondary)};
  }
`;

const Button: React.FC<ButtonProps> = ({ children, onClick, variant = 'primary' }) => {
  return <StyledButton variant={variant} onClick={onClick}>{children}</StyledButton>;
};

export default Button;
