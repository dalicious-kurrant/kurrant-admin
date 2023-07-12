import {useUpdateMakersDetail} from 'hooks/useMakers';
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

import Select from 'react-select';
import styled from 'styled-components';

import useFoodGroupMutation from '../useFoodGroupMutation';
import useGetFoodGroupQuery from '../useGetFoodGroupQuery';
import {fillMakersDropboxObjectForFoodGroup} from 'utils/dataFormChangeLogics/logic';

function FoodGroupCreateModal({open, setOpen}) {
  const {createFoodGroupMutation} = useFoodGroupMutation(() => {
    setOpen(false);
  });

  const {makersList} = useGetFoodGroupQuery();

  const [makersDropbox, setMakersDropbox] = useState([]);

  useEffect(() => {
    if (makersList) {
      setMakersDropbox(fillMakersDropboxObjectForFoodGroup(makersList));
    }
  }, [makersList]);

  const [makers, setMakers] = useState('');
  const [name, setName] = useState('');
  const [groupNumbers, setGroupNumbers] = useState('');

  const onSubmit = () => {
    createFoodGroupMutation({
      makers: makers,
      name: name,
      groupNumbers: groupNumbers,
    });
  };

  return (
    <Form onSubmit={onSubmit}>
      <Modal
        size="large"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}>
        <Modal.Header>상품그룹 정보 추가</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <LineBox>
              {/* <Form.Field>
                <FlexBox width={150}>
                  <Label size="mini">상품 그룹 ID</Label>
                  <Input
                    placeholder="계좌번호"
                    defaultValue={nowData.id}
                    disabled={true}
                  />
                </FlexBox>
              </Form.Field> */}
              <Form.Field>
                <FlexBox width={240}>
                  <Label size="mini">메이커스</Label>
                  <SelectBox
                    placeholder={
                      <SelectBoxPlaceholder>
                        메이커스 리스트
                      </SelectBoxPlaceholder>
                    }
                    options={makersDropbox}
                    onChange={e => {
                      // if (makers !== '') {
                      //   setMakers(`${makers}, ${e.value.toString()}`);
                      // } else {

                      // }
                      setMakers(`${e.value.toString()}`);
                    }}
                  />
                </FlexBox>
              </Form.Field>

              <Form.Field>
                <FlexBox width={200}>
                  <Label size="mini">상품 그룹 이름</Label>
                  <Input
                    placeholder="상품 그룹 이름"
                    // defaultValue={nowData.name}
                    onChange={(e, data) => {
                      setName(data.value);
                    }}
                  />
                </FlexBox>
              </Form.Field>
              <Form.Field>
                <FlexBox width={330}>
                  <Label size="mini">
                    동일 날짜 동시 추천 가능 여부 (숫자가 같은 그룹끼리는 같은
                    날 추천 가능)
                  </Label>
                  <Input
                    placeholder="예) 1,2"
                    // defaultValue={nowData.groupNumbers}
                    onChange={(e, data) => {
                      setGroupNumbers(data.value);
                    }}
                  />
                </FlexBox>
              </Form.Field>
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

export default FoodGroupCreateModal;

const FlexBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
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
  gap: 20px;
`;

const SelectBoxPlaceholder = styled.span`
  color: #c7c7c7;
`;

const SelectBox = styled(Select)`
  width: ${({width}) => width}px;

  /* &::placeholder {
    color: blue;
  } */
`;

const GroupsInput = styled.input`
  &::placeholder {
    color: #bebebe;
  }

  padding-left: 10px;

  color: black;
  height: 30px;
  background-color: white;
  border: 1px solid #cccccc;
  border-radius: 3px;
`;

const ResetButton = styled.button``;
