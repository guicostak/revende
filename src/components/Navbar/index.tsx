import React from "react";
import styled from "styled-components";
import media from "../../common/styles/mediaScreens";
import { Logo } from "../Logo";
import { Searchbar } from "../Searchbar";
import { Location } from "../Location";
import { Button } from "../Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { theme } from "../../common/styles/theme";
import { faCircleQuestion } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { Login } from "../Login";

export const StyledNavbar = styled.nav`
  .desktop-navbar {
    display: flex;
    width: 100%;
    align-items: center;
    padding-top: 1rem;
    padding-inline: 1rem;
  }

  .nav-options {
    display: flex;
    align-items: center;
    justify-content: right;
    gap: 2rem;
    width: 40%;

    .nav-item {
      cursor: pointer;
      font-family: ${theme.mainFont};
      font-weight: 600;
      font-size: 0.9rem;
      color: ${theme.primaryColor};
    }

    .nav-item:hover {
      border-bottom: 2px solid ${theme.primaryColor};
    }
  }

  .mobile-navbar,
  .tablet-navbar {
    display: none;
  }

  ${media.tablet} {
    .tablet-navbar {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-inline: auto;
      padding-inline: 1rem;
    }

    .tablet-navbar > .table-navbar-row {
      display: flex;
      margin-inline: auto;
      justify-content: center;
      align-items: center;
      margin-block: 1rem;
    }

    .tablet-navbar > .table-navbar-row:last-child {
      gap: 40%;
    }

    .nav-options {
      display: flex;
      justify-content: right;
    }

    .desktop-navbar {
      display: none;
    }
  }

  ${media.mobile} {
    .desktop-navbar {
      display: none;
    }

    .mobile-navbar {
      width: 100%;
      display: inline-block;
    }

    .mobile-navbar > .mobile-navbar-row {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;

      padding-left: 1rem;
      margin-block: 1rem;
    }
  }
`;

export const Navbar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <StyledNavbar>
      <div className="desktop-navbar">
        <Logo />
        <Searchbar />
        <Location />
        <div className="nav-options">
          <FontAwesomeIcon
            onClick={() => navigate("/help")}
            className="icon nav-item"
            icon={faCircleQuestion}
            style={{ color: theme.primaryColor }}
          />
          <Login />
          <Button buttonWidth={8} children={"quero vender"} />
        </div>
      </div>

      <div className="tablet-navbar">
        <div className="table-navbar-row">
          <Logo />
          <Searchbar />
        </div>
        <div className="table-navbar-row">
          <Location />
          <div className="nav-options">
            <FontAwesomeIcon
              onClick={() => navigate("/help")}
              className="icon nav-item"
              icon={faCircleQuestion}
              style={{ color: theme.primaryColor }}
            />
            <Login />
            <Button 
            buttonWidth={8}
            children={"quero vender"} />
          </div>
        </div>
      </div>

      <div className="mobile-navbar">
        <div className="mobile-navbar-row">
          <Logo />
          <Location />
        </div>
        <Searchbar />
      </div>
    </StyledNavbar>
  );
};
