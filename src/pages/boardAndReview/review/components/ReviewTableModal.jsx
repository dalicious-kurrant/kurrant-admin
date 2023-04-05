import {useAtom} from 'jotai';
import React, {useEffect, useState} from 'react';
import {
  Button,
  Header,
  Form,
  Modal,
  Input,
  Label,
  Checkbox,
} from 'semantic-ui-react';
import styled from 'styled-components';

function ReviewTableModal({open, setOpen}) {
  const onSubmit = () => {
    setOpen(false);
  };
  return (
    <Form onSubmit={onSubmit}>
      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}>
        <Modal.Header>유저 정보 변경</Modal.Header>
        <Modal.Content>
          <Modal.Description></Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button color="black" onClick={() => setOpen(false)}>
            취소
          </Button>
          <Button
            type="submit"
            content="수정"
            labelPosition="right"
            icon="checkmark"
            positive
            onClick={onSubmit}
          />
        </Modal.Actions>
      </Modal>
    </Form>
  );
}

export default ReviewTableModal;

const FlexBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  width: ${({width}) => (width ? `${width}px` : '300px')};
`;
const LineBox = styled.div`
  display: flex;
  gap: 20px;
`;
