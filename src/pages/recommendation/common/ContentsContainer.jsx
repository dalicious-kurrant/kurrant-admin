import styled from 'styled-components';

const StyledBlock = styled.section`
  display: flex;
  flex-direction: column;
  padding: 16px 0px;
  row-gap: 8px;
  justify-content: center;
`;

const StyledHeader = styled.div`
  width: 100%;
  font-size: 16px;
`;

const ContentsContainer = ({header, children}) => {
  return (
    <StyledBlock>
      {header && <StyledHeader>{header}</StyledHeader>}
      {children}
    </StyledBlock>
  );
};

export default ContentsContainer;
