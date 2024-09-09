import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledNavLink = styled(Link)`
  color: white;
  padding: 10px 20px;
  text-decoration: none;
  font-weight: bold;
  transition: color 0.3s ease;
  border: 1px solid white;
  border-radius: 5px;

  &:hover {
    color: #3498db;  // Couleur au survol
  }
`;

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ to, children }) => {
  return <StyledNavLink to={to}>{children}</StyledNavLink>;
};

export default NavLink;
