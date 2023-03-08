import styled from 'styled-components';
import Card from '../../common/Card';

const StyledCard = styled(Card)`
  width: 240px;
  height: 380px;
`;

const StyledImageHolder = styled.div`
  position: relative;
  width: 240px;
  height: 240px;
  overflow: hidden;
`;

const StyledImage = styled.img`
  position: absolute;
  border-radius: 2px 2px 0px 0px;
`;

const StyledAllergies = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #ff777780;
  color: white;
  font-weight: bold;
  font-size: 40px;
`;

const StyledContentBox = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 8px;
  padding: 16px;
  font-size: 14px;
  text-overflow: ellipsis;
`;

const StyledContentBold = styled.div`
  font-weight: bold;
`;

const StyledContentLightly = styled.div`
  color: #00000080;
`;

const FoodCard = ({
  image,
  name,
  score,
  makerName,
  makerScore,
  description,
  price,
  allergies,
}) => {
  return (
    <StyledCard>
      <StyledImageHolder>
        <StyledImage src={image} alt={name} width={240} height={240} />
        {allergies.length > 0 && (
          <StyledAllergies>
            {allergies.map(allergy => (
              <div key={allergy}>{allergy}</div>
            ))}
          </StyledAllergies>
        )}
      </StyledImageHolder>

      <StyledContentBox>
        <StyledContentBold>
          {name} / {score}점
        </StyledContentBold>
        <div>
          {makerName} / {makerScore}점
        </div>
        <div>{description}</div>
        <StyledContentLightly>{price.toLocaleString()}원</StyledContentLightly>
      </StyledContentBox>
    </StyledCard>
  );
};

export default FoodCard;
