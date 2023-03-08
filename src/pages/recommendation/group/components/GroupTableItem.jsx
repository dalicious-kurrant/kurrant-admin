import {StyledTd} from 'pages/recommendation/ui/table';
import {
  DEFAULT_BORDER_RADIUS,
  DEFAULT_BORDER_SIZE,
  DEFAULT_BORDER_STYLE,
  POLAR_GREEN_3,
  POLAR_GREEN_6,
} from 'shared/recommendation-constants';
import styled from 'styled-components';

const GroupTableItem = ({makers: makersAndFoods}) => {
  const makers = makersAndFoods.map(maker =>
    Object({id: maker.id, name: maker.name}),
  );
  const foods = makersAndFoods.map(maker => maker.foods).flat();

  return (
    <StyledContainer>
      {foods.map(food => (
        <StyledFoodContainer>
          <StyledFoodName>{food.name}</StyledFoodName>
          <StyledFoodPrice>{food.price.toLocaleString()}</StyledFoodPrice>
        </StyledFoodContainer>
      ))}
      <StyledMakerContainer>
        {makers.map(maker => (
          <StyledMakerTag>{maker.name}</StyledMakerTag>
        ))}
      </StyledMakerContainer>
    </StyledContainer>
  );
};

export default GroupTableItem;

const StyledContainer = styled(StyledTd)`
  padding: 0px;
  vertical-align: top;
`;

const StyledCellContainer = styled.div`
  display: inline-flex;
  width: 200px;
  padding: 16px;
`;
const StyledFoodContainer = styled(StyledCellContainer)`
  justify-content: space-between;
`;

const StyledMakerContainer = styled(StyledCellContainer)`
  gap: 8px;
  flex-wrap: wrap;
`;

const StyledFoodName = styled.span`
  font-size: 14px;
`;
const StyledFoodPrice = styled.span`
  font-size: 14px;
  color: #00000080;
`;

const StyledMakerTag = styled.div`
  max-width: 100%;
  white-space: nowrap;
  font-size: 12px;
  color: ${POLAR_GREEN_6};
  border: ${DEFAULT_BORDER_SIZE} ${DEFAULT_BORDER_STYLE} ${POLAR_GREEN_3};
  border-radius: ${DEFAULT_BORDER_RADIUS};
  padding: 1px 8px;
  overflow: hidden;
  text-overflow: ellipsis;
`;
