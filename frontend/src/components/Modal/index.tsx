import React, { useState } from "react";
import { css, styled } from "styled-components";
import { theme } from "../../common/styles/theme";
import media from "../../common/styles/mediaScreens";
import {
  emergeAnimation,
  disappearAnimation,
} from "../../common/styles/animations";

interface IModalProps {
  zIndex: string;
  children: React.ReactNode;
  closeActionProp: () => void;
  changeAnimationActionProp: () => void;
  isOpen: boolean;
  animation: boolean;
  modalWidths: number[];
  modalHeight: string;
}

export const StyledModal = styled.div<IModalProps>`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.325);
  backdrop-filter: blur(2px);
  z-index: ${(props) => props.zIndex};
  overflow-y: hidden;
  display: ${(props) => (props.isOpen ? "flex" : "none")};

  animation: ${(props) =>
    props.animation
      ? css`
          ${emergeAnimation} 0.4s ease
        `
      : css`
          ${disappearAnimation} 0.4s ease
        `};

.modal { 
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3vh;
  padding-top: 2rem;

  width: ${(props) => props.modalWidths[0]}rem;
  position: fixed;
  top: 50%; 
  left: 50%;
  transform: translate(-50%, -50%); 

  height: ${(props) => props.modalHeight};

  z-index: 3; 

  background-color: ${theme.mainBackground};
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2); 

  .close{
      font-size: 1.2rem;
      font-weight: 600;
      cursor: pointer;  
      position: absolute;
      top: 3%; 
      left: 97%;
      transform: translate(-50%, -50%); 
      font-family: ${theme.mainFont};
      color: ${theme.darkGrey};
  }

  ${media.tablet} { 
    width: ${(props) => props.modalWidths[1]}rem;
    top: 50%;
    left: 50%;
  }

  ${media.mobile} { 
    width: ${(props) => props.modalWidths[2]}rem;
    top: 50%;
    left: 50%;
  }
`;

export const Modal: React.FC<IModalProps> = ({
  animation,
  zIndex,
  children,
  closeActionProp,
  changeAnimationActionProp,
  isOpen,
  modalWidths,
  modalHeight
}) => {
  const closeModalLocalMethod = () => {
    changeAnimationActionProp();

    setTimeout(() => {
      closeActionProp();
    }, 300);
  };

  return (
    <StyledModal
      animation={animation}
      isOpen={isOpen}
      closeActionProp={closeActionProp}
      changeAnimationActionProp={changeAnimationActionProp}
      zIndex={zIndex}
      modalWidths={modalWidths}
      modalHeight={modalHeight}
    >
      <div className="modal">
        <p className="close" onClick={closeModalLocalMethod}>
          x
        </p>
        {children}
      </div>
    </StyledModal>
  );
};
