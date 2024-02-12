import React, { useState } from "react";

export interface ILoginForm {
  email: string;
  password: string;
}

export const useLoginHook = () => {
  const [loginForm, setLoginForm] = useState<ILoginForm>({
    email: "",
    password: "",
  });

  const [loginErrorMessages, setLoginErrorMessages] = useState<ILoginForm>({
    email: "",
    password: "",
  });

  const handleLoginFormChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { name, value } = event.target;
    setLoginForm((prevLoginForm) => ({ ...prevLoginForm, [name]: value }));
  };

  const handleLoginSubmit = (): void => {
   
  };

  const validateLoginForm = (): void => {
   
  };

  const handleKeyPress = (e: any): void => {

  }

  return {
    loginForm,
    loginErrorMessages,
    handleLoginFormChange,
    handleLoginSubmit,
    validateLoginForm,
    handleKeyPress
  };
};
