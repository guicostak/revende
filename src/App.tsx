import React from 'react';
import { ThemedProvider } from './common/styles/GlobalStyle';
import Router from './routes/router';

export const App: React.FC = () => {
  return (
      <ThemedProvider>
        <Router />
      </ThemedProvider>
  );
};

