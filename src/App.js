import React from 'react';
import { AuthProvider } from './contexts/AuthContext';
import Root from './Root';

function App() {
  return (
    <AuthProvider>
      <Root />
    </AuthProvider>
  );
}

export default App;
