import { Navbar } from "../../components/Navbar"
import React from "react";
import styled from "styled-components";
import media from "../../common/styles/mediaScreens";

export const StyledHome= styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 100%;
  align-items: center;
  background-color: white;
  
  ${media.mobile} { 
    overflow: hidden;
  }
`;

export const Home: React.FC = () => {
 
  return (
    <StyledHome>
      <Navbar />
    </StyledHome>
  );
};
