import React from 'react';
import styled from 'styled-components';
import NavLink from '../atoms/Navlink';

const NavWrapper = styled.nav`
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #2c3e50;  // Fond sombre pour le menu
  padding: 15px 0;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const NavigationMenu: React.FC = () => {
  return (
    <NavWrapper>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/dashboard">Dashboard</NavLink>
      <NavLink to="/login">Login</NavLink>
      <NavLink to="/register">Register</NavLink>
    </NavWrapper>
  );
};

export default NavigationMenu;
