import React from "react";
import FormBackground from "../../components/FormBackground/FormBackground";
import "./LoginPage.css";
import LoginForm from "../../components/LoginForm/LoginForm";
function LoginPage() {
  return (
    <section className="login-page">
        <FormBackground />
        <LoginForm />
    </section>
  );
}

export default LoginPage;