import React from "react";
import AuthForm from "../components/AuthForm";

const SignupPage = () => {
  function handleSignup(formData) {
    console.log("Signup details:", formData);
  }

  return <AuthForm mode="signup" onSubmit={handleSignup} />;
};

export default SignupPage;
