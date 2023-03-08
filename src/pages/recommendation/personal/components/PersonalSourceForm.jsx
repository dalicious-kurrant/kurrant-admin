import CheckboxList from '../../common/CheckboxList';
import Map from '../../common/Map';
import styled from 'styled-components';
import ContentsContainer from '../../common/ContentsContainer';
import {useEffect, useState} from 'react';
import {RECOMMENDED_YES} from '../../../../shared/recommendation-constants';
import {StyledSecondaryButton} from '../../ui/inputs';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 8px;
  align-items: center;
`;

const StyledGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 2fr;
  grid-template-rows: 240px;
  grid-auto-rows: min-content min-content;
  column-gap: 8px;
  row-gap: 8px;
`;

const PersonalSourceForm = ({makers, foods, onSubmit}) => {
  const [checkedMakers, setCheckedMakers] = useState([]);
  const [listedFoods, setListedFoods] = useState([]);
  const [checkedFoods, setCheckedFoods] = useState([]);

  useEffect(() => {
    checkRecommended();

    function checkRecommended() {
      setCheckedMakers(
        makers
          .filter(maker => maker.recommended === RECOMMENDED_YES)
          .map(maker => maker.id.toString()),
      );
      setCheckedFoods(
        foods
          .filter(food => food.recommended === RECOMMENDED_YES)
          .map(food => food.id.toString()),
      );
    }
  }, [makers, foods]);

  useEffect(() => {
    uncheckFoods();
    listFoods();

    function uncheckFoods() {
      setCheckedFoods(prev =>
        prev.filter(checkedFood =>
          checkedMakers.includes(
            foods
              .find(food => food.id.toString() === checkedFood)
              .maker.id.toString(),
          ),
        ),
      );
    }

    function listFoods() {
      setListedFoods(
        foods.filter(food => checkedMakers.includes(food.maker.id.toString())),
      );
    }
  }, [makers, foods, checkedMakers]);

  return (
    <ContentsContainer header="추천 메이커스 및 음식 선택">
      <form onSubmit={onSubmit}>
        <StyledContainer>
          <StyledGrid>
            <CheckboxList
              header="메이커 선택"
              name="makers"
              items={makers}
              idPicker={maker => maker.id.toString()}
              valuePicker={maker => maker.id.toString()}
              labelPicker={maker => maker.name.toString()}
              checkedItems={checkedMakers}
              setCheckedItems={setCheckedMakers}
            />
            <CheckboxList
              header="음식 선택"
              name="foods"
              items={listedFoods}
              idPicker={food => food.id.toString()}
              valuePicker={food => food.id.toString()}
              labelPicker={food => food.name.toString()}
              checkedItems={checkedFoods}
              setCheckedItems={setCheckedFoods}
            />
            <Map>
              {makers.filter(maker =>
                checkedMakers.includes(maker.id.toString()),
              )}
            </Map>
          </StyledGrid>
          <div>
            <StyledSecondaryButton>조회</StyledSecondaryButton>
          </div>
        </StyledContainer>
      </form>
    </ContentsContainer>
  );
};

export default PersonalSourceForm;
