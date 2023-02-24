import {recommendationApis} from 'api/recommendation';
import {useCallback, useEffect, useState} from 'react';
import styled from 'styled-components';
import ContentsContainer from '../../common/ContentsContainer';
import {StyledDangerButton, StyledPrimaryButton} from '../../ui/inputs';
import {
  StyledTable,
  StyledTd,
  StyledTh,
  StyledThead,
  StyledTr,
} from '../../ui/table';

export default function LearningModelListForm() {
  const [models, setModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState('');

  const fetchModels = useCallback(async () => {
    const fetchedModels = await recommendationApis.getModels();
    setModels(fetchedModels);
    setSelectedModel(fetchedModels.find(model => model.isSelected).version);
  }, []);

  useEffect(() => {
    fetchModels();
  }, [fetchModels]);

  const selectHandler = e => {
    setSelectedModel(e.target.value);
  };

  const applyHandler = async e => {
    e.preventDefault();
    await recommendationApis.callApplyModel(selectedModel);
    await fetchModels();
  };

  const deleteHandler = async e => {
    e.preventDefault();
    await recommendationApis.callDeleteModel(selectedModel);
    await fetchModels();
  };

  return (
    <ContentsContainer header="학습 모델 목록">
      <StyledForm>
        <StyledTable>
          <StyledThead>
            <StyledTr>
              <StyledTh>선택</StyledTh>
              <StyledTh>버전</StyledTh>
              <StyledTh>추천 대상 기간</StyledTh>
              <StyledTh>데이터 추출 시각</StyledTh>
              <StyledTh>학습 데이터 용량</StyledTh>
              <StyledTh>학습 시작 시각</StyledTh>
              <StyledTh>학습 종료 시각</StyledTh>
              <StyledTh>학습 소요시간</StyledTh>
            </StyledTr>
          </StyledThead>

          <tbody>
            {models.map(model => {
              const learningTime =
                new Date(model.learningEndDate) -
                new Date(model.learningStartDate);
              let learningTimeMinutes = Math.floor(learningTime / 1000 / 60);
              const learningTimeHours = Math.floor(learningTimeMinutes / 60);
              learningTimeMinutes = learningTimeMinutes % 60;

              return (
                <StyledTr key={model.version}>
                  <StyledTd>
                    <input
                      name="model"
                      type="radio"
                      value={model.version}
                      checked={model.version === selectedModel}
                      onChange={selectHandler}
                    />
                  </StyledTd>
                  <StyledTd>{model.version}</StyledTd>
                  <StyledTd>
                    {model.recommendationStartDate}~
                    {model.recommendationEndDate}
                  </StyledTd>
                  <StyledTd>{model.dataExtractDate}</StyledTd>
                  <StyledTd>{model.dataExtractSize}</StyledTd>
                  <StyledTd>{model.learningStartDate}</StyledTd>
                  <StyledTd>{model.learningEndDate}</StyledTd>
                  <StyledTd>
                    {learningTimeHours}시간 {learningTimeMinutes}분
                  </StyledTd>
                </StyledTr>
              );
            })}
          </tbody>
        </StyledTable>
        <StyledActionsContainer>
          <StyledPrimaryButton onClick={applyHandler}>
            모델 적용
          </StyledPrimaryButton>
          <StyledDangerButton onClick={deleteHandler}>
            모델 삭제
          </StyledDangerButton>
        </StyledActionsContainer>
      </StyledForm>
    </ContentsContainer>
  );
}

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  row-gap: 8px;
`;

const StyledActionsContainer = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 8px;
  justify-content: center;
`;
