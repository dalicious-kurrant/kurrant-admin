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
import styled from 'styled-components';

import Select from 'react-select';

import useFoodGroupMutation from '../useFoodGroupMutation';
import useGetFoodGroupQuery from '../useGetFoodGroupQuery';
import {fillMakersDropboxObjectForFoodGroup} from 'utils/dataFormChangeLogics/logic';

function FoodGroupEditModal({open, setOpen, nowData, setNowData}) {
  useEffect(() => {
    console.log(nowData);
  }, [nowData]);

  const {editFoodGroupMutation} = useFoodGroupMutation(
    () => {},
    () => {
      setOpen(false);
    },
    () => {},
  );

  const {makersList} = useGetFoodGroupQuery();

  const [makersDropbox, setMakersDropbox] = useState([]);

  useEffect(() => {
    if (makersList) {
      setMakersDropbox(fillMakersDropboxObjectForFoodGroup(makersList));
    }
  }, [makersList]);

  const onSubmit = () => {
    editFoodGroupMutation([
      {
        id: nowData.id,
        makers: nowData.makers,
        name: nowData.name,
        groupNumbers: nowData.groupNumbers,
      },
    ]);
  };

  return (
    <Form onSubmit={onSubmit}>
      <Modal
        size="large"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}>
        <Modal.Header>상품그룹 정보 수정</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <LineBox>
              <Form.Field>
                <FlexBox width={150}>
                  <Label size="mini">상품 그룹 ID</Label>
                  <Input
                    placeholder="계좌번호"
                    defaultValue={nowData.id}
                    disabled={true}
                  />
                </FlexBox>
              </Form.Field>

              <Form.Field>
                <FlexBox width={240}>
                  <Label size="mini">메이커스</Label>
                  <SelectBox
                    width={240}
                    // height={20}
                    placeholder={
                      <SelectBoxPlaceholder>
                        {/* 메이커스 리스트 */}
                        {nowData.makers}
                      </SelectBoxPlaceholder>
                    }
                    // value={nowData.makers}
                    options={makersDropbox}
                    onChange={e => {
                      setNowData({
                        ...nowData,
                        makers: e.value.toString() ? e.value.toString() : '',
                      });
                    }}
                  />
                </FlexBox>
              </Form.Field>

              {/* 
              <Form.Field>
                <FlexBox width={140}>
                  <Label size="mini">메이커스</Label>
                  <Input
                    placeholder="사용료"
                    defaultValue={nowData.makers}
                    onChange={(e, data) => {
                      setNowData({
                        ...nowData,
                        makers: data.value ? data.value : null,
                      });
                    }}
                  />
                </FlexBox>
              </Form.Field> */}
              <Form.Field>
                <FlexBox width={200}>
                  <Label size="mini">상품 그룹 이름</Label>
                  <Input
                    placeholder="상품 그룹 이름"
                    defaultValue={nowData.name}
                    onChange={(e, data) => {
                      setNowData({
                        ...nowData,
                        name: data.value ? data.value : null,
                      });
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
                    defaultValue={nowData.groupNumbers}
                    onChange={(e, data) => {
                      setNowData({
                        ...nowData,
                        groupNumbers: data.value ? data.value : null,
                      });
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

export default FoodGroupEditModal;

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
  /* color: #c7c7c7; */
  /* color: #c7c7c7; */
  color: black;
`;

const SelectBox = styled(Select)`
  width: ${({width}) => width}px;
  /* height: ${({height}) => height}px; */

  /* &::placeholder {
    color: blue;
  } */
`;
