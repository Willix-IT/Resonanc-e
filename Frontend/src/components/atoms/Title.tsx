import styled from 'styled-components';

interface TitleProps {
  size?: 'small' | 'medium' | 'large';
  color?: string; // Optionnel, la couleur peut être passée en prop
}

const Title = styled.h1<TitleProps>`
  font-size: ${({ size }) => (size === 'small' ? '1.5rem' : size === 'large' ? '2.5rem' : '2rem')};
  color: ${({ color, theme }) => (color ? color : theme.colors.text)};  // Utilise la couleur si fournie, sinon celle du thème
  margin-bottom: ${({ theme }) => theme.spacing.medium};
`;

export default Title;

