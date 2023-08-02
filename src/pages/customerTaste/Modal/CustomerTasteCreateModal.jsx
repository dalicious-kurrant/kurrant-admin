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
  TextArea,
} from 'semantic-ui-react';
import styled from 'styled-components';

import Select from 'react-select';

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
              {/* <Form.Field>
                <FlexBox width={140}>
                  <Label size="mini">추천 비중</Label>
                  <Input
                    placeholder="예) 1,2"
                    // defaultValue={nowData.groupNumbers}
                    onChange={(e, data) => {
                      //   setGroupNumbers(data.value);
                      // setImportance1(data.value);
                    }}
                  />
                </FlexBox>
                <FlexBox width={140}>
                  <Label size="mini">추천 비중</Label>
                  <Input
                    placeholder="예) 1,2"
                    // defaultValue={nowData.groupNumbers}
                    onChange={(e, data) => {
                      //   setGroupNumbers(data.value);
                      // setImportance1(data.value);
                    }}
                  />
                </FlexBox>
              </Form.Field> */}

              <CustomerTasteTextInput
                // fieldsToOpen={fieldsToOpen}
                // fieldName={value.fieldNameKor}
                fieldName={'foodId1'}
                registerStatus={'register'}
                key={1}
                input={input1}
                setInput={setInput1}
                required
                name={'필드이름'}
                placeholder={'플레이스'}
                maxCharLength={12}
                // headerWidth={190}
                flex={1}
                defaultValue={''}
              />
              <CustomerTasteTextInput
                // fieldsToOpen={fieldsToOpen}
                // fieldName={value.fieldNameKor}
                fieldName={'foodId11111'}
                registerStatus={'register'}
                key={2}
                input={input1}
                setInput={setInput1}
                required
                name={'필드이름'}
                placeholder={'플레이스'}
                maxCharLength={12}
                // headerWidth={190}
                flex={1}
                defaultValue={''}
              />
              <CustomerTasteTextInput
                // fieldsToOpen={fieldsToOpen}
                // fieldName={value.fieldNameKor}
                fieldName={'foodId11111'}
                registerStatus={'register'}
                key={1}
                input={input1}
                setInput={setInput1}
                required
                name={'필드이름'}
                placeholder={'플레이스'}
                maxCharLength={12}
                // headerWidth={190}
                flex={1}
                defaultValue={''}
              />
              <CustomerTasteTextInput
                // fieldsToOpen={fieldsToOpen}
                // fieldName={value.fieldNameKor}
                fieldName={'foodId11111'}
                registerStatus={'register'}
                key={2}
                input={input1}
                setInput={setInput1}
                required
                name={'필드이름'}
                placeholder={'플레이스'}
                maxCharLength={12}
                // headerWidth={190}
                flex={1}
                defaultValue={''}
              />
              <CustomerTasteTextInput
                // fieldsToOpen={fieldsToOpen}
                // fieldName={value.fieldNameKor}
                fieldName={'foodId11111'}
                registerStatus={'register'}
                key={1}
                input={input1}
                setInput={setInput1}
                required
                name={'필드이름'}
                placeholder={'플레이스'}
                maxCharLength={12}
                // headerWidth={190}
                flex={1}
                defaultValue={''}
              />
              <CustomerTasteTextInput
                // fieldsToOpen={fieldsToOpen}
                // fieldName={value.fieldNameKor}
                fieldName={'foodId11111'}
                registerStatus={'register'}
                key={2}
                input={input1}
                setInput={setInput1}
                required
                name={'필드이름'}
                placeholder={'플레이스'}
                maxCharLength={12}
                // headerWidth={190}
                flex={1}
                defaultValue={''}
              />
              <CustomerTasteTextInput
                // fieldsToOpen={fieldsToOpen}
                // fieldName={value.fieldNameKor}
                fieldName={'foodId11111'}
                registerStatus={'register'}
                key={1}
                input={input1}
                setInput={setInput1}
                required
                name={'필드이름'}
                placeholder={'플레이스'}
                maxCharLength={12}
                // headerWidth={190}
                flex={1}
                defaultValue={''}
              />
              <CustomerTasteTextInput
                // fieldsToOpen={fieldsToOpen}
                // fieldName={value.fieldNameKor}
                fieldName={'foodId11111'}
                registerStatus={'register'}
                key={2}
                input={input1}
                setInput={setInput1}
                required
                name={'필드이름'}
                placeholder={'플레이스'}
                maxCharLength={12}
                // headerWidth={190}
                flex={1}
                defaultValue={''}
              />
              <CustomerTasteTextInput
                // fieldsToOpen={fieldsToOpen}
                // fieldName={value.fieldNameKor}
                fieldName={'foodId11111'}
                registerStatus={'register'}
                key={1}
                input={input1}
                setInput={setInput1}
                required
                name={'필드이름'}
                placeholder={'플레이스'}
                maxCharLength={12}
                // headerWidth={190}
                flex={1}
                defaultValue={''}
              />
              <CustomerTasteTextInput
                // fieldsToOpen={fieldsToOpen}
                // fieldName={value.fieldNameKor}
                fieldName={'foodId11111'}
                registerStatus={'register'}
                key={2}
                input={input1}
                setInput={setInput1}
                required
                name={'필드이름'}
                placeholder={'플레이스'}
                maxCharLength={12}
                // headerWidth={190}
                flex={1}
                defaultValue={''}
              />
              <CustomerTasteTextInput
                // fieldsToOpen={fieldsToOpen}
                // fieldName={value.fieldNameKor}
                fieldName={'foodId11111'}
                registerStatus={'register'}
                key={1}
                input={input1}
                setInput={setInput1}
                required
                name={'필드이름'}
                placeholder={'플레이스'}
                maxCharLength={12}
                // headerWidth={190}
                flex={1}
                defaultValue={''}
              />
              <CustomerTasteTextInput
                // fieldsToOpen={fieldsToOpen}
                // fieldName={value.fieldNameKor}
                fieldName={'foodId11111'}
                registerStatus={'register'}
                key={2}
                input={input1}
                setInput={setInput1}
                required
                name={'필드이름'}
                placeholder={'플레이스'}
                maxCharLength={12}
                // headerWidth={190}
                flex={1}
                defaultValue={''}
              />
              <CustomerTasteTextInput
                // fieldsToOpen={fieldsToOpen}
                // fieldName={value.fieldNameKor}
                fieldName={'foodId11111'}
                registerStatus={'register'}
                key={1}
                input={input1}
                setInput={setInput1}
                required
                name={'필드이름'}
                placeholder={'플레이스'}
                maxCharLength={12}
                // headerWidth={190}
                flex={1}
                defaultValue={''}
              />
              <CustomerTasteTextInput
                // fieldsToOpen={fieldsToOpen}
                // fieldName={value.fieldNameKor}
                fieldName={'foodId11111'}
                registerStatus={'register'}
                key={2}
                input={input1}
                setInput={setInput1}
                required
                name={'필드이름'}
                placeholder={'플레이스'}
                maxCharLength={12}
                // headerWidth={190}
                flex={1}
                defaultValue={''}
              />
              <CustomerTasteTextInput
                // fieldsToOpen={fieldsToOpen}
                // fieldName={value.fieldNameKor}
                fieldName={'foodId11111'}
                registerStatus={'register'}
                key={1}
                input={input1}
                setInput={setInput1}
                required
                name={'필드이름'}
                placeholder={'플레이스'}
                maxCharLength={12}
                // headerWidth={190}
                flex={1}
                defaultValue={''}
              />
              <CustomerTasteTextInput
                // fieldsToOpen={fieldsToOpen}
                // fieldName={value.fieldNameKor}
                fieldName={'foodId11111'}
                registerStatus={'register'}
                key={2}
                input={input1}
                setInput={setInput1}
                required
                name={'필드이름'}
                placeholder={'플레이스'}
                maxCharLength={12}
                // headerWidth={190}
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

const FlexBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 26px;
  /* margin-right: 10px; */
  width: ${({width}) => (width ? `${width}px` : '300px')};
`;
const FlexBox2 = styled.div`
  display: flex;
  gap: 10px;
  width: ${({width}) => (width ? `${width}px` : '100px')};
`;
const LineBox = styled.div`
  display: flex;
  font-size: 12px;
  overflow: auto;

  /* gap: 20px; */
`;

const SelectBox = styled(Select)`
  width: ${({width}) => width}px;

  /* height: 40px; */
  /* margin-right: 50px; */
`;

const SelectBoxPlaceholder = styled.span`
  color: #c7c7c7;
`;

const ResetButton = styled.button``;

const GroupsInput = styled.input`
  &::placeholder {
    color: #bebebe;
  }

  padding-left: 10px;
  /* background-color: black; */
  color: black;
  height: 30px;
  background-color: white;
  border: 1px solid #cccccc;
  border-radius: 3px;
`;
const TitleH1 = styled.h1`
  font-size: 20px;
  margin-left: 8px;
  margin-bottom: 20px;
`;
