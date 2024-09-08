import React from "react";
import AuthTemplate from "../template/AuthTemplate"; 
import { registerUser } from "../../services/api"; 
import { useNavigate } from "react-router-dom";

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();

  const handleRegister = async (
    email: string,
    password: string,
    name?: string
  ) => {
    try {
      const result = await registerUser(name!, email, password);
      alert(result.message);
      navigate("/login"); 
    } catch (error: any) {
      alert(
        "Registration failed: " +
          (error.response?.data?.message || "Unknown error")
      );
    }
  };

  return <AuthTemplate isRegister={true} onSubmit={handleRegister} />;
};

export default RegisterPage;
