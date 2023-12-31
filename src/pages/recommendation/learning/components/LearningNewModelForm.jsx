import {useEffect, useState} from 'react';
import styled from 'styled-components';
import {
  LEARNING_STATE_DONE,
  LEARNING_STATE_FAILED,
  LEARNING_STATE_LEARNING,
  LEARNING_STATE_NONE,
  LEARNING_STATE_STOPPED,
} from '../../../../shared/recommendation-constants';
import {StyledInputDate, StyledSecondaryButton} from '../../ui/inputs';
import {recommendationApis} from 'api/recommendation';
import {addDays, formattedDateForRecommendation} from 'utils/dateFormatter';

export default function LearningNewModelForm() {
  const [learningState, setLearningState] = useState(LEARNING_STATE_NONE);
  const [startDate, setStartDate] = useState(
    formattedDateForRecommendation(new Date()),
  );

  useEffect(() => {
    fetchLearningState();

    async function fetchLearningState() {
      const fetchedLearningState = await recommendationApis.getLearningState();
      setLearningState(fetchedLearningState.code);
      fetchedLearningState.startDate &&
        setStartDate(fetchedLearningState.startDate);
    }
  }, []);

  const dateChangeHandler = e => {
    setStartDate(e.target.value);
  };

  const buttonClickHandler = async e => {
    const fetchedLearningState =
      learningState === LEARNING_STATE_LEARNING
        ? await recommendationApis.callStopLearning()
        : await recommendationApis.callStartLearning();

    setLearningState(fetchedLearningState.code);
  };

  const getButtonMessage = () => {
    return learningState === LEARNING_STATE_LEARNING
      ? '학습 중지'
      : '학습 시작';
  };

  const getInfoMessage = () => {
    switch (learningState) {
      case LEARNING_STATE_NONE:
        return '';
      case LEARNING_STATE_LEARNING:
        return '신규 모델을 학습하고 있습니다.';
      case LEARNING_STATE_STOPPED:
        return '신규 모델의 학습을 중지하였습니다.';
      case LEARNING_STATE_DONE:
        return '신규 모델 학습이 완료되었습니다.';
      case LEARNING_STATE_FAILED:
        return '신규 모델 학습이 실패하였습니다.';
      default:
        return 'ERROR';
    }
  };

  const endDate = formattedDateForRecommendation(addDays(startDate, 13));

  const buttonMessage = getButtonMessage();

  const infoMessage = getInfoMessage();

  return (
    <StyledContainer>
      <StyledLabel>
        추천 대상 기간{' : '}
        <StyledInputDate
          name="start_date"
          value={startDate}
          onChange={dateChangeHandler}
          disabled={learningState === LEARNING_STATE_LEARNING}
        />
        {' ~ '}
        <StyledInputDate name="end_date" value={endDate} disabled />
      </StyledLabel>
      <StyledSecondaryButton onClick={buttonClickHandler}>
        {buttonMessage}
      </StyledSecondaryButton>
      <StyledInfoMessage>{infoMessage}</StyledInfoMessage>
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  margin: 8px 0px;
  display: flex;
  flex-direction: row;
  column-gap: 16px;
`;

const StyledInfoMessage = styled.span`
  display: inline-block;
  font-size: 14px;
  font-weight: bold;
  vertical-align: middle;
`;

const StyledLabel = styled.label`
  font-size: 14px;
`;
