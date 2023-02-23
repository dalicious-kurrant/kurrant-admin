import styled from "styled-components";

const StyledPath = styled.div`
  font-size: 12;
`;

const StyledParentPath = styled.span`
  color: #8d8d8d;
`;

const StyledPresentPath = styled.span`
  color: #1e1e1e;
`;

const PageNavigation = ({ title }) => {
  return (
    <StyledPath>
      <StyledParentPath>식사 추천 {">"} </StyledParentPath>
      <StyledPresentPath>{title}</StyledPresentPath>
    </StyledPath>
  );
};

export default PageNavigation;
