import {useEffect, useState} from 'react';
import styled from 'styled-components';

const ReadReview = ({content, onClickCallback, editDisabled, buttonName}) => {
  const [value, setValue] = useState('');

  useEffect(() => {
    if (content) {
      setValue(content);
    }
  }, [content]);

  const handleChange = e => {
    console.log(e.target.value);
    setValue(e.target.value);
  };

  return (
    <Container>
      <Input onChange={handleChange} value={value} />

      <ConfirmButton onClick={onClickCallback}>{buttonName}</ConfirmButton>
    </Container>
  );
};

export default ReadReview;

const Container = styled.section`
  flex: 1;
  height: 100%;
  padding: 20px;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.textarea`
  width: 90%;

  height: 90%;
  border-radius: 10px;
  margin-bottom: 20px;
  padding: 20px;
`;

const ConfirmButton = styled.button`
  width: 90%;
  font-size: 30px;
  background-color: #4472c4;
  border-radius: 6px;
  color: white;
`;
