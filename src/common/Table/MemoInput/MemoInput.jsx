import React from 'react';
import styled from 'styled-components';
import TextAreaInput from './TextAreaInput/TextAreaInput';

const MemoInput = ({handleChange, input}) => {
  return (
    <Form>
      <TextAreaInput
        name="memo"
        onChange={handleChange}
        input={input}
        placeholder="메모를 즉석으로 작성할 수 있습니다"
      />
    </Form>
  );
};
export default MemoInput;

const Form = styled.form`
  flex: 1;
  /* width: 100%; */
  background-color: #ffffff;
  height: 100%;
`;
