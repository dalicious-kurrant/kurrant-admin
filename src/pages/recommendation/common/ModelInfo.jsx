import styled from "styled-components";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 16px;
  font-size: 16px;
  padding: 4px 0px;
`;

const ModelInfo = ({ modelInfo }) => {
  return (
    <StyledContainer>
      <span>모델 버전 : {modelInfo.version}</span>
      <span>
        기간 : {modelInfo.startDate} ~ {modelInfo.endDate}
      </span>
    </StyledContainer>
  );
};

export default ModelInfo;
