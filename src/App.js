import React from 'react';
import {GlobalStyle} from './style/global';
import MainRouter from './router/MainRouter';
// import './App.css';
import {ModalProvider} from './hooks/useModal';

const App = () => {
  return (
    <ModalProvider>
      <GlobalStyle />
      <MainRouter />
    </ModalProvider>
  );
};

export default App;
