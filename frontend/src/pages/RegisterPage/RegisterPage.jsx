import React from "react";
import RegisterForm from "../../components/RegisterForm/RegisterForm";
import FormBackground from "../../components/FormBackground/FormBackground";
import "./RegisterPage.css";
function RegisterPage() {
    return (
        <section className="register-page">
        <FormBackground />
        <RegisterForm />
        </section>
    );
}

export default RegisterPage;