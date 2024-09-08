import React from "react";
import Title from "../atoms/Title";
import Button from "../atoms/Button";

const DashboardPage: React.FC = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div>
      <Title size="large">Dashboard</Title>
      <p>Welcome to your dashboard!</p>
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
};

export default DashboardPage;
