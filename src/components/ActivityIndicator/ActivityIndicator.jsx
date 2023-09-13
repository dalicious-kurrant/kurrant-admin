import React from 'react';
import styled, {keyframes} from 'styled-components';

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${({height}) => height && height};
`;

const Spinner = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.3);
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: ${spin} 2s linear infinite;
`;

const ActivityIndicator = ({height = '100vh'}) => {
  return (
    <Container height={height}>
      <Spinner />
    </Container>
  );
};

export default ActivityIndicator;
