import {createGlobalStyle} from 'styled-components';
import reset from 'styled-reset';

export const GlobalStyle = createGlobalStyle`
    ${reset};

    .ui.celled.table tr th {
        white-space: nowrap;
    }
`;
