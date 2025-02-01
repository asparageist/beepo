import React from 'react';
import './App.css';
import AppContainer from './appContainer';
import { AppProvider } from '../context/AppContext';

function App() {
  return (
    <AppProvider>
      <div>
        <AppContainer/>
      </div>
    </AppProvider>
  );
}

export default App;