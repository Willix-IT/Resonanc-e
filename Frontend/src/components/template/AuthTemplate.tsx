import React from 'react';
import Title from '../atoms/Title'; 
import AuthForm from '../organisms/AuthForm'; 

interface AuthTemplateProps {
  isRegister: boolean;
  onSubmit: (email: string, password: string, name?: string) => void;
}

const AuthTemplate: React.FC<AuthTemplateProps> = ({ isRegister, onSubmit }) => (
  <div>
    <Title>{isRegister ? 'Register' : 'Login'}</Title> 
    <AuthForm isRegister={isRegister} onSubmit={onSubmit} />
  </div>
);

export default AuthTemplate;
