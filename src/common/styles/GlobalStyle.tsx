import React from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { theme } from './theme'; 

export const GlobalStyle = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  .icon {
    width: 1rem;
    cursor: pointer;
  }
`;

interface ThemedProviderProps {
  children: React.ReactNode;
}

export const ThemedProvider: React.FC<ThemedProviderProps> = ({ children }) => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    {children}
  </ThemeProvider>
);
