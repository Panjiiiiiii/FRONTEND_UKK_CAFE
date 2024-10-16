"use client";
import RegisterForm from "@/components/RegisterForm";
import LoginForm from "../components/LoginForm";
import { useState } from "react";
import ResetPassword from "@/components/ResetPasswordForm";

export default function loginPage() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);

  return (
    <>
      <main className="bg">
        {forgotPassword ? (
          <ResetPassword isLoad={forgotPassword} toggle={setForgotPassword} />
        ) : isRegistering ? (
          <RegisterForm isLoad={isRegistering} toggle={setIsRegistering} />
        ) : (
          <LoginForm
            isLoad={!isRegistering}
            toggleForgotPassword={setForgotPassword}
            toggleRegister={setIsRegistering}
          />
        )}
      </main>
    </>
  );
}
