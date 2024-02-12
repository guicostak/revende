import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useSearchbarHook } from "./hooks/useSearchbarHook";
import { theme } from "../../common/styles/theme";
import media from "../../common/styles/mediaScreens";

export const StyledSearchbar = styled.div`
  display: flex;
  align-items: center;
  margin-left: 1rem;
  border: 1px solid rgb(188, 187, 187);
  border-radius: 10px;
  padding: 0.3rem 0.7rem;
  box-shadow: 1px 1px rgba(188, 187, 187, 0.638);
  height: 2rem;
  width: 40%;

  #search-txt {
    border: none;
    height: 1.5rem;
    width: 100%;
    padding-left: 1rem;
    font-family: ${theme.mainFont};
    font-weight: 500;
    font-size: 1rem;
    color: ${theme.darkGrey};
    outline: none;

    &::placeholder {
      font-size: 1rem;
      color: ${theme.darkGrey};
    }
  }

  ${media.tablet} {
    width: 78%;

  }

  ${media.mobile} {
    width: 93%;

  }
`;

export const Searchbar: React.FC = () => {
  const { searchbar, handleSearchbarInputChange, handleSearchbarSubmit } = useSearchbarHook();

  return (
    <StyledSearchbar>
      <FontAwesomeIcon
        onClick={(event) => {
          handleSearchbarSubmit();
        }}
        className="icon"
        icon={faMagnifyingGlass}
        style={{ color: theme.primaryColor}}
      />
      <input
        type="text"
        id="search-txt"
        placeholder={`Buscar "${searchbar.placeholder}"`}
        value={searchbar.fieldValue}
        onChange={handleSearchbarInputChange}
      />
    </StyledSearchbar>
  );
};
