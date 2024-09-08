import React from 'react';
import AuthTemplate from '../template/AuthTemplate'; 
import { loginUser } from '../../services/api'; 
import { useNavigate } from 'react-router-dom'; 

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = async (email: string, password: string) => {
    try {
      const { access_token } = await loginUser(email, password);
      localStorage.setItem('token', access_token);
      alert('Login successful');
      navigate('/dashboard'); 
    } catch (error: any) {
      alert('Login failed: ' + (error.response?.data?.message || 'Unknown error'));
    }
  };

  return <AuthTemplate isRegister={false} onSubmit={handleLogin} />;
};

export default LoginPage;
