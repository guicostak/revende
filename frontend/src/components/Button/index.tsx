import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { theme } from "../../common/styles/theme";
import media from "../../common/styles/mediaScreens";

interface IButtonProps {
  children: string;
  buttonWidth: number;
}

export const StyledButton = styled.button<IButtonProps>`
  cursor: pointer;
  width: ${(props) => props.buttonWidth}rem;
  height: 2.2rem;

  background-color: ${theme.primaryColor};
  color: white;

  border: none;
  border-radius: 10px;

  font-family: ${theme.mainFont};
  font-weight: 600;
  font-size: 0.8rem;

  transition: 0.7s;

  &:hover {
    transition: 0.7s;
    background-color: white;
    color: ${theme.primaryColor};
    border: 1px solid ${theme.primaryColor};
  }

  ${media.tablet} {
    width: 20rem;
    height: 2.5rem;
  }
`;

export const Button: React.FC<IButtonProps> = ({ children, buttonWidth }) => {
  return <StyledButton buttonWidth={buttonWidth}>{children}</StyledButton>;
};
