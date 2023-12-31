import React from 'react';
import {GlobalStyle} from './style/global';
import MainRouter from './router/MainRouter';
// import './App.css';
import {ModalProvider} from './hooks/useModal';
import {ThemeProvider} from 'styled-components';
import Theme from './style/Theme';
import './Fonts/Font.css';

const App = () => {
  return (
    <ModalProvider>
      <ThemeProvider theme={Theme}>
        <GlobalStyle />
        <MainRouter />
      </ThemeProvider>
    </ModalProvider>
  );
};

export default App;
