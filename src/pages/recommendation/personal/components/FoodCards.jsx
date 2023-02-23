import styled from 'styled-components';
import {DEFAULT_CARD_BORDER} from '../../../../shared/recommendation-constants';
import ContentsContainer from '../../common/ContentsContainer';
import FoodCard from './FoodCard';

const StyledFilledContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  column-gap: 8px;
  overflow-x: scroll;
`;

const StyledEmptyContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  border: ${DEFAULT_CARD_BORDER};
  font-size: 14px;
  padding: 16px;
`;

const FoodCards = ({foods, makers}) => {
  let body;
  if (foods.length > 0) {
    body = (
      <StyledFilledContainer>
        {foods.map(food => {
          const maker = makers.find(maker => maker.id === food.maker.id);

          return (
            <FoodCard
              key={food.id}
              image={food.image}
              name={food.name}
              score={food.score}
              makerName={maker.name}
              makerScore={maker.score}
              description={food.description}
              price={food.price}
              allergies={food.allergies}
            />
          );
        })}
      </StyledFilledContainer>
    );
  } else {
    body = <StyledEmptyContainer>음식을 추가해 주세요.</StyledEmptyContainer>;
  }
  return <ContentsContainer header="추천 음식 정보">{body}</ContentsContainer>;
};

export default FoodCards;
