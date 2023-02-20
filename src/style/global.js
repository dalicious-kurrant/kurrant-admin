import {createGlobalStyle} from 'styled-components';
import reset from 'styled-reset';

export const GlobalStyle = createGlobalStyle`
    ${reset};

    .ui.celled.table tr th {
        white-space: nowrap;
    }

    button {
  outline: 0;
  cursor: pointer;
  border: 0;
}
*, *::before, *::after {
    box-sizing: border-box;
  };


`;
