import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faCaretDown,
  faLocationArrow,
} from "@fortawesome/free-solid-svg-icons";
import { theme } from "../../common/styles/theme";
import media from "../../common/styles/mediaScreens";
import { Modal } from "../Modal";
import { useLocationHook } from "./hooks/useLocationHook";

export const StyledLocation = styled.div`
.location-txt { 
    font-family: ${theme.mainFont};
}

.location-nav-item {
  display: flex;
  align-items: center; 
  justify-content: center;
  gap: 1rem;
  cursor: pointer;  
  width: 20%;
  padding-left: 4%;
  min-width: 20rem;
  font-size: 0.95rem;
}

.location-title {
  font-family: ${theme.mainFont};
  font-size: 1.2rem;  
  font-weight: 100;
  color: ${theme.darkGrey}; 
  width: 90%;
}

input {
  width: 30rem;
  border: 1px solid rgb(188, 187, 187);
  border-radius: 5px;
  padding: 0.3rem 0.7rem;
  box-shadow: 1px 1px rgba(188, 187, 187, 0.638);
  height: 2rem;
  outline: none;
}

.suggestion-list {
  list-style: none;
  padding-inline: 0.5rem;
  width: 90%;
}

.suggestion-item { 
  font-family: ${theme.mainFont};
  font-size: 0.9rem;  
  font-weight: 100;
  color: ${theme.darkGrey};
  border-bottom: 1px solid ${theme.boxShadow};
  padding-block: 1.2rem;
  cursor: pointer;
}

${media.tablet} {
  min-width: 8rem;
    .location-nav-item {
      padding-left: 0;
      justify-content-center;
    }
  }

${media.mobile} {
  min-width: min(50%, 20rem);
  padding-left: 0rem;
  .location-nav-item {
      font-size: 0.9rem;
      justify-content-center;
    }
  }
  .location-input {
    width: 90%;
  }
`;

export const Location: React.FC = () => {
  const [isOpenState, setIsOpenState] = useState<boolean>(false);
  const [currentAnimation, setCurrentAnimation] = useState<boolean>(false);
  // Quando true usa a animação de abrir modal e quando false a animação de fechar
  const { location, handleLocationInputChange, cleanFieldValue, handleLocationSubmit } = useLocationHook();
  const modalWidthsArray = [40, 40, 30];

  const openLocationModal = () => {
    setCurrentAnimation(true);
    setIsOpenState(true);
  }

  const closeLocationModal = () => {
    setIsOpenState(false);
    cleanFieldValue();
  }

  const selectCity = (city: string) => {
    handleLocationSubmit(city);
    cleanFieldValue();
    setIsOpenState(false);
  }

  return (
    <StyledLocation>
      <div className="location-nav-item" onClick={openLocationModal}>
        <FontAwesomeIcon
          className="icon"
          icon={faLocationDot}
          style={{ color: theme.primaryColor }}
        />
        <span className="location-txt"> {location.selectedLocation} </span>
        <FontAwesomeIcon
          className="icon"
          icon={faCaretDown}
          style={{ color: theme.primaryColor }}
        />
      </div>

      <Modal
        changeAnimationActionProp={() => setCurrentAnimation(false)}
        animation={currentAnimation}
        zIndex="2"
        closeActionProp={closeLocationModal}
        isOpen={isOpenState}
        modalWidths={ modalWidthsArray }
        modalHeight={"22 rem"}
      >
        <h3 className="location-title">Localização</h3>
        <input
          onChange={handleLocationInputChange}
          value={location.fieldValue}
          type="text"
          placeholder="Digite uma localização"
          className="location-input"
        />
        <ul className="suggestion-list" style={{ maxHeight: '200px', overflowY: 'auto' }}>
        {location.suggestions.map((city, index) => (
          <li key={index} className="suggestion-item" onClick={() => selectCity(city)}>
            <FontAwesomeIcon
              className="icon"
              icon={faLocationDot}
              style={{ color: theme.primaryColor, marginRight: '1rem'}}
            />
            {city}
          </li>
        ))}
      </ul>
      </Modal>
    </StyledLocation>
  );
};
