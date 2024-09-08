import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/pages/LoginPage';
import RegisterPage from './components/pages/RegisterPage';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './styles/globalStyles';
import { theme } from './styles/theme';
import HomePage from './components/pages/HomePage';
import DashboardPage from './components/pages/DashboardPage';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} /> 
          <Route path="/login" element={<LoginPage />} /> 
          <Route path="/register" element={<RegisterPage />} /> 
          <Route path="/dashboard" element={<DashboardPage />} /> 
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
