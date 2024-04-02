import React from "react";
import LogoRevende from "../../assets/img/logos/logo.png";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export const StyledLogo = styled.img`
  width: 10%;
  height: auto;
  min-width: 9rem;
`;

export const Logo: React.FC = () => {
  const navigate = useNavigate();

  return (
    <StyledLogo
      onClick={() => navigate("/")}
      src={LogoRevende}
      alt="Logo"
    />
  );
};
