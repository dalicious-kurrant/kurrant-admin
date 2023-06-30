import {useEffect, useState} from 'react';
import styled from 'styled-components';
import useGetItemKeyword from './useGetItemKeyword';
import useItemKeywordMutation from './useItemKeywordMutation';

const ItemKeywordInput = ({foodId}) => {
  const [input, setInput] = useState('');

  const [names, setNames] = useState([]);

  const {reviewKeywordSearchQueryRefetch, keywordArr} =
    useGetItemKeyword(foodId);

  // useEffect(() => {
  //   reviewKeywordSearchQueryRefetch();
  // }, []);

  const {addKeywordMutate} = useItemKeywordMutation(() => {
    reviewKeywordSearchQueryRefetch();
  });

  useEffect(() => {
    setNames(input.split(',').map(v => v.trim()));
  }, [input, setNames]);

  const handleChange = e => {
    setInput(e.target.value);
  };

  useEffect(() => {
    console.log('키워드 배열');
    console.log(keywordArr);
  }, [keywordArr]);

  return (
    <Container>
      <Wrap>
        <Title>검색할 키워드 리스트</Title>
        <Input value={input} onChange={handleChange} />
      </Wrap>
      <Button
        onClick={() => {
          console.log('클릭');
          addKeywordMutate({
            foodId: foodId,
            names: names,
          });
          // reviewKeywordSearchQueryRefetch();
        }}>
        키워드 계산하기
      </Button>
      <Wrap>
        <Title>키워드 TOP8</Title>
        <Input
          disabled
          value={
            keywordArr === undefined
              ? undefined
              : Array.isArray(keywordArr) && keywordArr.length > 0
              ? keywordArr.join(', ')
              : '리뷰 키워드가 등록되지 않았습니다.'
          }
        />
      </Wrap>
    </Container>
  );
};
export default ItemKeywordInput;

const Container = styled.div`
  margin-top: 20px;
  /* padding: 10px; */
`;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

const Title = styled.span`
  margin-bottom: 8px;
`;

const Input = styled.input`
  border: 1px solid #e9e9ec;
  border-radius: 3px;
  height: 28px;
  padding: 10px 5px;
`;

const Button = styled.button`
  margin-bottom: 8px;
  /* background-color: transparent; */
  background-color: #21ba45;
  border: 1px solid #e9e9ec;
  border-radius: 4px;
  padding-top: 5px;
  /* height: 30px; */
  color: white;
`;
