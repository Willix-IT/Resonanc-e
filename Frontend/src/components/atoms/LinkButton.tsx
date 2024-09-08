import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledLinkButton = styled(Link)`
  display: inline-block;
  padding: ${({ theme }) => theme.spacing.small} ${({ theme }) => theme.spacing.medium};
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border-radius: 4px;
  text-align: center;
  text-decoration: none;

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }
`;

export default StyledLinkButton;
