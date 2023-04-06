import {useEffect, useState} from 'react';
import styled from 'styled-components';

const ShowCommentsReview = ({
  content,
  onClickCallback,
  disabled = true,
  title,
  buttonName,
  isMakersOrAdminComment,
}) => {
  const [value, setValue] = useState('');
  // 내용 없을때

  useEffect(() => {
    console.log(content);
  }, [content]);

  useEffect(() => {
    if (content && content.length > 0) {
      // 작성일자 추가해주기

      setValue(content[content.length - 1].comment);
    }
  }, [content]);

  const handleChange = e => {
    setValue(e.target.value);
  };
  const handleCallback = () => {
    onClickCallback(value);
  };

  return (
    <Container>
      <Title>{title}</Title>

      <Input
        disabled={disabled}
        placeholder={disabled ? '(댓글없음)' : '댓글을 작성해주세요'}
        onChange={handleChange}
        value={value}
      />

      <ConfirmButton onClick={handleCallback}>{buttonName}</ConfirmButton>
    </Container>
  );
};

export default ShowCommentsReview;

const Container = styled.section`
  flex: 1;
  height: 100%;
  padding: 20px;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 20px;
  margin-bottom: 20px;
`;

const Input = styled.textarea`
  width: 90%;

  height: 90%;
  border-radius: 10px;
  margin-bottom: 20px;
  padding: 20px;

  /* &:disabled {
    background: #ccc;
  } */

  background-color: #fff;
  color: #000;
  border: 1px solid #000;

  &:disabled {
    background-color: #fff;
    color: #888;
    border: 1px solid #000;
  }
`;

const ConfirmButton = styled.button`
  width: 90%;
  font-size: 26px;
  padding: 4px 0;
  background-color: #4472c4;
  border-radius: 6px;
  color: white;
`;
