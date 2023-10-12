import React, {useState} from 'react';
import {
  Button,
  Form,
  Modal,
} from 'semantic-ui-react';
import styled from 'styled-components';


import CustomerTasteTextInput from './component/CustomerTasteTextInput';

function CustomerTasteCreateModal({open, setOpen}) {
  const onSubmit = () => {};

  const [input1, setInput1] = useState(false);

  return (
    <Form onSubmit={onSubmit}>
      <Modal
        size="large"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}>
        <Modal.Header>데이터 추가</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <LineBox>
              <CustomerTasteTextInput
                fieldName={'foodId1'}
                registerStatus={'register'}
                key={1}
                input={input1}
                setInput={setInput1}
                required
                name={'필드이름'}
                placeholder={'플레이스'}
                maxCharLength={12}
                flex={1}
                defaultValue={''}
              />
              <CustomerTasteTextInput
                fieldName={'foodId11111'}
                registerStatus={'register'}
                key={2}
                input={input1}
                setInput={setInput1}
                required
                name={'필드이름'}
                placeholder={'플레이스'}
                maxCharLength={12}
                flex={1}
                defaultValue={''}
              />
              <CustomerTasteTextInput
                fieldName={'foodId11111'}
                registerStatus={'register'}
                key={1}
                input={input1}
                setInput={setInput1}
                required
                name={'필드이름'}
                placeholder={'플레이스'}
                maxCharLength={12}
                flex={1}
                defaultValue={''}
              />
              <CustomerTasteTextInput
                fieldName={'foodId11111'}
                registerStatus={'register'}
                key={2}
                input={input1}
                setInput={setInput1}
                required
                name={'필드이름'}
                placeholder={'플레이스'}
                maxCharLength={12}
                flex={1}
                defaultValue={''}
              />
              <CustomerTasteTextInput
                fieldName={'foodId11111'}
                registerStatus={'register'}
                key={1}
                input={input1}
                setInput={setInput1}
                required
                name={'필드이름'}
                placeholder={'플레이스'}
                maxCharLength={12}
                flex={1}
                defaultValue={''}
              />
              <CustomerTasteTextInput
                fieldName={'foodId11111'}
                registerStatus={'register'}
                key={2}
                input={input1}
                setInput={setInput1}
                required
                name={'필드이름'}
                placeholder={'플레이스'}
                maxCharLength={12}
                flex={1}
                defaultValue={''}
              />
              <CustomerTasteTextInput
                fieldName={'foodId11111'}
                registerStatus={'register'}
                key={1}
                input={input1}
                setInput={setInput1}
                required
                name={'필드이름'}
                placeholder={'플레이스'}
                maxCharLength={12}
                flex={1}
                defaultValue={''}
              />
              <CustomerTasteTextInput
                fieldName={'foodId11111'}
                registerStatus={'register'}
                key={2}
                input={input1}
                setInput={setInput1}
                required
                name={'필드이름'}
                placeholder={'플레이스'}
                maxCharLength={12}
                flex={1}
                defaultValue={''}
              />
              <CustomerTasteTextInput
                fieldName={'foodId11111'}
                registerStatus={'register'}
                key={1}
                input={input1}
                setInput={setInput1}
                required
                name={'필드이름'}
                placeholder={'플레이스'}
                maxCharLength={12}
                flex={1}
                defaultValue={''}
              />
              <CustomerTasteTextInput
                fieldName={'foodId11111'}
                registerStatus={'register'}
                key={2}
                input={input1}
                setInput={setInput1}
                required
                name={'필드이름'}
                placeholder={'플레이스'}
                maxCharLength={12}
                flex={1}
                defaultValue={''}
              />
              <CustomerTasteTextInput
                fieldName={'foodId11111'}
                registerStatus={'register'}
                key={1}
                input={input1}
                setInput={setInput1}
                required
                name={'필드이름'}
                placeholder={'플레이스'}
                maxCharLength={12}
                flex={1}
                defaultValue={''}
              />
              <CustomerTasteTextInput
                fieldName={'foodId11111'}
                registerStatus={'register'}
                key={2}
                input={input1}
                setInput={setInput1}
                required
                name={'필드이름'}
                placeholder={'플레이스'}
                maxCharLength={12}
                flex={1}
                defaultValue={''}
              />
              <CustomerTasteTextInput
                fieldName={'foodId11111'}
                registerStatus={'register'}
                key={1}
                input={input1}
                setInput={setInput1}
                required
                name={'필드이름'}
                placeholder={'플레이스'}
                maxCharLength={12}
                flex={1}
                defaultValue={''}
              />
              <CustomerTasteTextInput
                fieldName={'foodId11111'}
                registerStatus={'register'}
                key={2}
                input={input1}
                setInput={setInput1}
                required
                name={'필드이름'}
                placeholder={'플레이스'}
                maxCharLength={12}
                flex={1}
                defaultValue={''}
              />
              <CustomerTasteTextInput
                fieldName={'foodId11111'}
                registerStatus={'register'}
                key={1}
                input={input1}
                setInput={setInput1}
                required
                name={'필드이름'}
                placeholder={'플레이스'}
                maxCharLength={12}
                flex={1}
                defaultValue={''}
              />
              <CustomerTasteTextInput
                fieldName={'foodId11111'}
                registerStatus={'register'}
                key={2}
                input={input1}
                setInput={setInput1}
                required
                name={'필드이름'}
                placeholder={'플레이스'}
                maxCharLength={12}
                flex={1}
                defaultValue={''}
              />
            </LineBox>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button color="black" onClick={() => setOpen(false)}>
            취소
          </Button>
          <Button
            type="submit"
            content="추가"
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

export default CustomerTasteCreateModal;

const LineBox = styled.div`
  display: flex;
  font-size: 12px;
  overflow: auto;

`;

