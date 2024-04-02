import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faLock } from "@fortawesome/free-solid-svg-icons";
import { theme } from "../../common/styles/theme";

interface IPasswordTextfieldProps {
  inputPlaceholder: string;
  inputName: string;
  inputValue: string;
  onChangeInputActionProp: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlurActionProp: (e: React.FocusEvent<HTMLInputElement>) => void;
  onKeyPressActionProp: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  errorMessage: string;
}

const StyledPasswordTextfield = styled.div<IPasswordTextfieldProps>`
  display: flex;
  flex-direction: column;
  gap: 1vh;
  user-select: none;
  width: 20rem;

  .textfield-input {
    display: flex;
    align-items: center;
    justify-content: left;
    gap: 1vw;

    border-bottom: 1px solid ${theme.primaryColor};

    height: 5vh;
    padding: 1rem;
  }

  .icon {
    color: var(--main-color);
    font-size: 1.1rem;
  }

  .textfield-input input {
    outline: none;
    border: none;
    width: 100%;
  }
`;

export const PasswordTextfield: React.FC<IPasswordTextfieldProps> = ({
  inputPlaceholder,
  inputName,
  inputValue,
  onChangeInputActionProp,
  onBlurActionProp,
  onKeyPressActionProp,
  errorMessage,
}) => {
  const [currentPasswordIcon, setCurrentPasswordIcon] =
    useState<any>(faEyeSlash);
  const [currentInputType, setCurrentInputType] = useState<string>("password");

  const inputFocus = (e: any) => {
    const parentElement = e.target.parentElement;
    parentElement.style.borderBottom = "1px solid black";
  };

  const inputBlur = (e: any) => {
    const parentElement = e.target.parentElement;
    parentElement.style.borderBottom = `1px solid ${theme.primaryColor}`;
    onBlurActionProp(e);
  };

  const handleShowAndHidePassword = () => {
    const newInputType = currentInputType === "password" ? "text" : "password";
    const newIcon = currentPasswordIcon === faEye ? faEyeSlash : faEye;

    setCurrentInputType(newInputType);
    setCurrentPasswordIcon(newIcon);
  };

  return (
    <StyledPasswordTextfield
      inputPlaceholder={inputPlaceholder}
      inputName={inputName}
      inputValue={inputValue}
      onChangeInputActionProp={onChangeInputActionProp}
      onBlurActionProp={onBlurActionProp}
      onKeyPressActionProp={onKeyPressActionProp}
      errorMessage={errorMessage}
    >
      <div className="textfield-input">
        <FontAwesomeIcon
          className="icon"
          icon={faLock}
          style={{ color: theme.primaryColor }}
        />
        <input
          autoComplete="off"
          type={currentInputType}
          placeholder={inputPlaceholder}
          name={inputName}
          value={inputValue}
          onChange={onChangeInputActionProp}
          onFocus={inputFocus}
          onBlur={inputBlur}
          maxLength={256}
          onKeyDown={onKeyPressActionProp}
        />
        <FontAwesomeIcon
          onClick={handleShowAndHidePassword}
          icon={currentPasswordIcon}
          style={{
            color: theme.primaryColor,
            cursor: "pointer",
            fontSize: "0.9rem",
          }}
        />
      </div>
      <span className="error-messages">{errorMessage}</span>
    </StyledPasswordTextfield>
  );
};
