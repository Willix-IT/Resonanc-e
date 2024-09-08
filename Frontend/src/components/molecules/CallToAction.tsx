import React from "react";
import Button from "../atoms/Button";

const CallToAction: React.FC = () => (
  <div>
    <Button onClick={() => (window.location.href = "/login")}>Login</Button>
    <Button
      onClick={() => (window.location.href = "/register")}
      variant="secondary"
    >
      Register
    </Button>
  </div>
);

export default CallToAction;
