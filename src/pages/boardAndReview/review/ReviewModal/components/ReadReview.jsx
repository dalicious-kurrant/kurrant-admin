import {useEffect, useState} from 'react';
import styled from 'styled-components';

const ReadReview = ({
  content,
  onClickCallback,
  onClickCallback2 = () => {},
  disabled = true,
  title,
  buttonName,
  buttonDisable = false,
  button2Disable = false,

  buttonName2 = undefined,
  confirmButton2Color,
}) => {
  const [value, setValue] = useState('');
  // 내용 없을때

  useEffect(() => {
    if (content) {
      setValue(content);
    } else {
      setValue('');
    }
  }, [content]);

  const handleChange = e => {
    setValue(e.target.value);
  };
  const handleCallback = () => {
    onClickCallback(value);
  };
  const handleCallback2 = () => {
    onClickCallback2(value);
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

      <ButtonWrap>
        <ConfirmButton
          disabled={buttonDisable}
          buttonDisable={buttonDisable}
          onClick={handleCallback}>
          {buttonName}
        </ConfirmButton>

        {buttonName2 && (
          <ConfirmButton
            disabled={button2Disable}
            buttonDisable={button2Disable}
            confirmButton2Color={confirmButton2Color}
            onClick={handleCallback2}>
            {buttonName2}
          </ConfirmButton>
        )}
      </ButtonWrap>
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
const ButtonWrap = styled.div`
  width: 90%;
  display: flex;
`;

const ConfirmButton = styled.button`
  /* width: 90%; */
  flex: 1;
  font-size: 26px;
  padding: 4px 0;
  background-color: ${({confirmButton2Color}) =>
    confirmButton2Color ? confirmButton2Color : '#4472c4'};

  border-radius: 6px;
  color: white;

  opacity: ${({buttonDisable}) => (buttonDisable ? 0.4 : 1)};

  /* opacity: 0.4; */

  margin: 0px 5px;
`;
