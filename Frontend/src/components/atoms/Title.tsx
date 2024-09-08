import styled from 'styled-components';

interface TitleProps {
  size?: 'small' | 'medium' | 'large';
}

const Title = styled.h1<TitleProps>`
  font-size: ${({ size }) => (size === 'small' ? '1.5rem' : size === 'large' ? '2.5rem' : '2rem')};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.medium};
`;

export default Title;
