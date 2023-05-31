import styled from 'styled-components';
import {
  foodTypeTag,
  allergyTag,
  appetiteTag,
  countryTag,
  featureTag,
  ingredientTag,
  spicyTag,
  tasteTag,
  styleTag,
  temperatureTag,
  typeTag,
  wayTag,
} from './tagData';
import useGetFoodGroupQuery from 'pages/shop/foodGroup/useGetFoodGroupQuery';
import {useEffect, useState} from 'react';

const HashTag = ({clicked, setClicked, makersId}) => {
  const {foodGroupList} = useGetFoodGroupQuery(makersId);

  const [selectedFoodGroup, setSelectedFoodGroup] = useState({});

  useEffect(() => {
    console.log(selectedFoodGroup);
  }, [selectedFoodGroup]);

  // foodGroupList 바꾸기
  // useEffect(() => {
  //   console.log(foodGroupList);
  // }, [foodGroupList]);

  const onSelect = id => {
    if (clicked?.includes(id)) {
      return setClicked(clicked?.filter(v => v !== id));
    }
    setClicked([...clicked, id]);
  };
  // console.log(clicked);
  return (
    <Wrap>
      <Title>식품 타입</Title>
      <BoxWrap>
        {foodTypeTag.map((el, idx) => (
          <Box
            key={el.id}
            onClick={() => onSelect(el.id)}
            touch={clicked?.includes(el.id)}>
            <Text touch={clicked?.includes(el.id)}>{el.style}</Text>
          </Box>
        ))}
      </BoxWrap>

      <Title>식품 그룹</Title>
      <BoxWrap>
        {foodGroupList.length < 1 ? (
          foodGroupList.map((el, idx) => (
            <Box
              key={el.id}
              onClick={() => {
                if (selectedFoodGroup.id === el.id) {
                  setSelectedFoodGroup({});
                } else {
                  setSelectedFoodGroup({...el});
                }
              }}
              touch={el.id === selectedFoodGroup.id}>
              <Text touch={el.id === selectedFoodGroup.id}>{el.name}</Text>
            </Box>
          ))
        ) : (
          <FoodGroupListSpan>
            해당 메이커스의 식품 그룹이 아직 존재하지 않습니다.{' '}
          </FoodGroupListSpan>
        )}
      </BoxWrap>
      <Title>요리스타일</Title>
      <BoxWrap>
        {styleTag.map((el, idx) => (
          <Box
            key={el.id}
            onClick={() => onSelect(el.id)}
            touch={clicked?.includes(el.id)}>
            <Text touch={clicked?.includes(el.id)}>{el.style}</Text>
          </Box>
        ))}
      </BoxWrap>
      <Title>국가</Title>
      <BoxWrap>
        {countryTag.map((el, idx) => (
          <Box
            key={el.id}
            onClick={() => onSelect(el.id)}
            touch={clicked?.includes(el.id)}>
            <Text touch={clicked?.includes(el.id)}>{el.country}</Text>
          </Box>
        ))}
      </BoxWrap>
      <Title>식품 유형</Title>
      <BoxWrap>
        {typeTag.map((el, idx) => (
          <Box
            key={el.id}
            onClick={() => onSelect(el.id)}
            touch={clicked?.includes(el.id)}>
            <Text touch={clicked?.includes(el.id)}>{el.type}</Text>
          </Box>
        ))}
      </BoxWrap>
      <Title>주재료</Title>
      <BoxWrap>
        {ingredientTag.map((el, idx) => (
          <Box
            key={el.id}
            onClick={() => onSelect(el.id)}
            touch={clicked?.includes(el.id)}>
            <Text touch={clicked?.includes(el.id)}>{el.ingredient}</Text>
          </Box>
        ))}
      </BoxWrap>
      <Title>조리법</Title>
      <BoxWrap>
        {wayTag.map((el, idx) => (
          <Box
            key={el.id}
            onClick={() => onSelect(el.id)}
            touch={clicked?.includes(el.id)}>
            <Text touch={clicked?.includes(el.id)}>{el.way}</Text>
          </Box>
        ))}
      </BoxWrap>
      <Title>온도</Title>
      <BoxWrap>
        {temperatureTag.map((el, idx) => (
          <Box
            key={el.id}
            onClick={() => onSelect(el.id)}
            touch={clicked?.includes(el.id)}>
            <Text touch={clicked?.includes(el.id)}>{el.temperature}</Text>
          </Box>
        ))}
      </BoxWrap>
      <Title>맛</Title>
      <BoxWrap>
        {tasteTag.map((el, idx) => (
          <Box
            key={el.id}
            onClick={() => onSelect(el.id)}
            touch={clicked?.includes(el.id)}>
            <Text touch={clicked?.includes(el.id)}>{el.taste}</Text>
          </Box>
        ))}
      </BoxWrap>
      <Title>메뉴성격</Title>
      <BoxWrap>
        {featureTag.map((el, idx) => (
          <Box
            key={el.id}
            onClick={() => onSelect(el.id)}
            touch={clicked?.includes(el.id)}>
            <Text touch={clicked?.includes(el.id)}>{el.featrue}</Text>
          </Box>
        ))}
      </BoxWrap>
      <Title>알레르기체크</Title>
      <BoxWrap>
        {allergyTag.map((el, idx) => (
          <Box
            key={el.id}
            onClick={() => onSelect(el.id)}
            touch={clicked?.includes(el.id)}>
            <Text touch={clicked?.includes(el.id)}>{el.allergy}</Text>
          </Box>
        ))}
      </BoxWrap>
      <Title>특이식성</Title>
      <BoxWrap>
        {appetiteTag.map((el, idx) => (
          <Box
            key={el.id}
            onClick={() => onSelect(el.id)}
            touch={clicked?.includes(el.id)}>
            <Text touch={clicked?.includes(el.id)}>{el.appetite}</Text>
          </Box>
        ))}
      </BoxWrap>
      <Title>매움정도</Title>
      <BoxWrap>
        {spicyTag.map((el, idx) => (
          <Box
            key={el.id}
            onClick={() => onSelect(el.id)}
            touch={clicked?.includes(el.id)}>
            <Text touch={clicked?.includes(el.id)}>{el.spicy}</Text>
          </Box>
        ))}
      </BoxWrap>
    </Wrap>
  );
};

export default HashTag;

const Wrap = styled.div`
  flex-wrap: wrap;
`;

const Text = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({touch}) => (touch ? 'white' : 'black')};
`;

const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({touch}) => (touch ? '#4236EB' : 'white')};
  border-radius: 8px;
  padding: 10px;
  border: 0.5px solid #c8c8d2;
  cursor: pointer;
  margin: 4px;
  width: 110px;
  white-space: normal;
`;

const BoxWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  word-break: keep-all;
  text-align: center;
`;

const Title = styled.div`
  font-size: 16px;
  font-weight: 600;
  margin: 24px 0px;
`;

const FoodGroupListSpan = styled.span`
  margin-left: 16px;
`;
