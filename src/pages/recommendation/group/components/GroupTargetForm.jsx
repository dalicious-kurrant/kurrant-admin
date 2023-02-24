import CheckboxList from 'pages/recommendation/common/CheckboxList';
import ContentsContainer from 'pages/recommendation/common/ContentsContainer';
import {StyledSecondaryButton} from 'pages/recommendation/ui/inputs';
import {useState} from 'react';
import styled from 'styled-components';

const GroupTargetForm = ({groups, diningTypes, onSubmit}) => {
  const [checkedGroups, setChcekedGroups] = useState([]);
  const [checkedDiningTypes, setChcekedDiningTypes] = useState([]);

  return (
    <ContentsContainer table="추천 대상 선택">
      <form onSubmit={onSubmit}>
        <StyledContainer>
          <StyledCheckboxesContainer>
            <CheckboxList
              header="그룹 선택"
              name="groups"
              items={groups}
              idPicker={group => group.id.toString()}
              valuePicker={group => group.id.toString()}
              labelPicker={group => group.name.toString()}
              checkedItems={checkedGroups}
              setCheckedItems={setChcekedGroups}
            />
            <CheckboxList
              header="식사구분 선택"
              name="diningTypes"
              items={diningTypes}
              idPicker={diningType => diningType.id.toString()}
              valuePicker={diningType => diningType.id.toString()}
              labelPicker={diningType => diningType.name.toString()}
              checkedItems={checkedDiningTypes}
              setCheckedItems={setChcekedDiningTypes}
            />
          </StyledCheckboxesContainer>
          <StyledActionsContainer>
            <StyledSecondaryButton>조회</StyledSecondaryButton>
          </StyledActionsContainer>
        </StyledContainer>
      </form>
    </ContentsContainer>
  );
};

export default GroupTargetForm;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 8px;
  align-items: center;
`;

const StyledCheckboxesContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 240px;
  column-gap: 8px;
  align-itmes: center;
`;

const StyledActionsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;
