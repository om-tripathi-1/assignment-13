import React from "react";
import AuthForm from "../components/AuthForm";

const LoginPage = () => {
  function handleLogin(formData) {
    console.log("Login details:", formData);
  }

  return <AuthForm mode="login" onSubmit={handleLogin} />;
};

export default LoginPage;
