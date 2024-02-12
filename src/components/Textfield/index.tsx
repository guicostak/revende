import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { theme } from "../../common/styles/theme";

interface ITextfieldProps {
  icon: any;
  inputType: string;
  inputPlaceholder: string;
  inputName: string;
  inputValue: string;
  inputMaxLength: number;
  onChangeInputActionProp: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlurActionProp: (e: React.FocusEvent<HTMLInputElement>) => void;
  onKeyPressActionProp: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  errorMessage: string;
}

const StyledTextfield = styled.div<ITextfieldProps>`
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
    width: fill;
  }
`;

export const Textfield: React.FC<ITextfieldProps> = ({
  inputType,
  icon,
  inputPlaceholder,
  inputName,
  inputValue,
  onChangeInputActionProp,
  onBlurActionProp,
  inputMaxLength,
  onKeyPressActionProp,
  errorMessage,
}) => {
  const inputFocus = (e: any) => {
    const parentElement = e.target.parentElement;
    parentElement.style.borderBottom = "1px solid black";
  };

  const inputBlur = (e: any) => {
    const parentElement = e.target.parentElement;
    parentElement.style.borderBottom = `1px solid ${theme.primaryColor}`;
    onBlurActionProp(e);
  };

  return (
    <StyledTextfield
      icon={icon}
      inputType={inputType}
      inputPlaceholder={inputPlaceholder}
      inputName={inputName}
      inputValue={inputValue}
      onChangeInputActionProp={onChangeInputActionProp}
      onBlurActionProp={onBlurActionProp}
      inputMaxLength={inputMaxLength}
      onKeyPressActionProp={onKeyPressActionProp}
      errorMessage={errorMessage}
    >
      <div className="textfield-input">
        <FontAwesomeIcon
          className="icon"
          icon={icon}
          style={{ color: theme.primaryColor }}
        />
        <input
          autoComplete="on"
          type={inputType}
          placeholder={inputPlaceholder}
          name={inputName}
          value={inputValue}
          onChange={onChangeInputActionProp}
          onFocus={(e) => inputFocus(e)}
          onBlur={(e) => inputBlur(e)}
          maxLength={inputMaxLength}
          onKeyDown={onKeyPressActionProp}
        />
        <span className="error-message">{errorMessage}</span>
      </div>
    </StyledTextfield>
  );
};
