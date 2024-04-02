import React, { useState } from "react";
import styled from "styled-components";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { theme } from "../../common/styles/theme";
import media from "../../common/styles/mediaScreens";
import { Modal } from "../Modal";
import { Textfield } from "../Textfield";
import { useLoginHook } from "./hooks/useLoginHook";
import { PasswordTextfield } from "../PasswordTextfield";
import { Button } from "../Button";

export const StyledLogin = styled.div`
  font-family: ${theme.mainFont};
  color: ${theme.darkGrey};

  .login-title {
    font-size: 1.5rem;
    font-weight: 100;
    text-align: center;
    margin-bottom: 0.7rem;
  }

  .keep-logged-in {
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
    width: 20rem;
    padding-left: 1rem;
    margin-block: 0.2rem;
    font-size: 0.9rem;
  }

  .forgot-password {
    font-size: 0.8rem;
    margin-bottom: 1rem;
    width: 20rem;
  }

  .nav-links {
    font-size: 0.8rem;
    color: ${theme.primaryColor};
    cursor: pointer;
  }

  .login-nav{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding-block: 1.4rem;
    font-size: 0.8rem;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    border-top: 1px solid ${theme.darkGrey};
    background-color: ${theme.secondBackground};
  
}

  ${media.tablet} {
  }

  ${media.mobile} {
  }
`;

export const Login: React.FC = () => {
  const [isOpenState, setIsOpenState] = useState<boolean>(false);
  const [currentAnimation, setCurrentAnimation] = useState<boolean>(false);
  // Quando true usa a animação de abrir modal e quando false a animação de fechar
  const modalWidthsArray = [25, 25, 90];
  const {
    loginForm,
    loginErrorMessages,
    handleLoginFormChange,
    validateLoginForm,
    handleKeyPress,
  } = useLoginHook();

  const openLoginModal = () => {
    setCurrentAnimation(true);
    setIsOpenState(true);
  };

  const closeLoginModal = () => {
    setIsOpenState(false);
  };

  return (
    <StyledLogin>
      <span onClick={openLoginModal} className="nav-item">
        entrar
      </span>
      <Modal
        changeAnimationActionProp={() => setCurrentAnimation(false)}
        animation={currentAnimation}
        zIndex="2"
        closeActionProp={closeLoginModal}
        isOpen={isOpenState}
        modalWidths={modalWidthsArray}
        modalHeight={"auto"}
      >
        <h3 className="login-title">Acesse sua conta</h3>
        <Textfield
          icon={faEnvelope}
          inputType={"text"}
          inputPlaceholder={"Email"}
          inputName={"email"}
          inputValue={loginForm.email}
          inputMaxLength={255}
          onChangeInputActionProp={handleLoginFormChange}
          onBlurActionProp={validateLoginForm}
          onKeyPressActionProp={(e) => handleKeyPress(e)}
          errorMessage={loginErrorMessages.email}
        />

        <PasswordTextfield
          inputPlaceholder={"Senha"}
          inputName={"password"}
          inputValue={loginForm.password}
          onChangeInputActionProp={handleLoginFormChange}
          onBlurActionProp={validateLoginForm}
          onKeyPressActionProp={(e) => handleKeyPress(e)}
          errorMessage={loginErrorMessages.email}
        />

        <div className="keep-logged-in">
          <input type="checkbox" />
          <span>Mantenha-me conectado</span>
        </div>

        <Button children={"entrar"} buttonWidth={20} />

        <div className="forgot-password">
          <span>
            Esqueceu sua senha?{" "}
            <a className="nav-links">Recuperar senha</a>
          </span>
        </div>

        <nav className="login-nav">
          <span>
            Não possui conta?{" "}
            <a className="nav-links">Cadastre-se</a>
          </span>
        </nav>

      </Modal>
    </StyledLogin>
  );
};
