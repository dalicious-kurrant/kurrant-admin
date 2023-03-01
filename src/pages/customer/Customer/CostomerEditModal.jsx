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
import {CustomerDataAtom} from './store';

function CostomerEditModal({
  open,
  setOpen,
  nowData,
  setNowData,
  testData,
  setTestData,
}) {
  console.log(nowData);
  console.log(nowData.userOrderAlarm);
  const onSubmit = () => {
    setTestData(
      testData.map(v => {
        if (v.id === nowData.id) {
          return nowData;
        }
        return v;
      }),
    );
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
          <Modal.Description>
            <FlexBox>
              <Label>이메일</Label>
              <Label color="blue" size="large">
                {nowData.email}
              </Label>
            </FlexBox>
            <LineBox>
              <Form.Field>
                <FlexBox>
                  <Label>유저 상태</Label>
                  <Input
                    placeholder="ex) 1.활성, 2.탈퇴"
                    defaultValue={nowData.status}
                    onChange={(e, data) => {
                      setNowData({
                        ...nowData,
                        status: data.value ? Number(data.value) : 1,
                      });
                    }}
                  />
                </FlexBox>
              </Form.Field>
              <Form.Field>
                <FlexBox width={500}>
                  <Label>비밀번호</Label>
                  <Input
                    placeholder="비밀번호"
                    defaultValue={nowData.password}
                    onChange={(e, data) => {
                      setNowData({
                        ...nowData,
                        password: data.value ? data.value : null,
                      });
                    }}
                  />
                </FlexBox>
              </Form.Field>
            </LineBox>
            <LineBox>
              <Form.Field>
                <FlexBox>
                  <Label>이름</Label>
                  <Input
                    placeholder="이름"
                    defaultValue={nowData.userName}
                    onChange={(e, data) => {
                      setNowData({
                        ...nowData,
                        userName: data.value ? data.value : '이름없음',
                      });
                    }}
                  />
                </FlexBox>
              </Form.Field>
              <Form.Field>
                <FlexBox>
                  <Label>핸드폰</Label>
                  <Input
                    placeholder="핸드폰"
                    defaultValue={nowData.phone}
                    onChange={(e, data) => {
                      setNowData({
                        ...nowData,
                        phone: data.value ? data.value : '',
                      });
                    }}
                  />
                </FlexBox>
              </Form.Field>
            </LineBox>
            <LineBox>
              <Form.Field>
                <FlexBox>
                  <Label>유저 타입</Label>
                  <Input
                    placeholder="유저 타입"
                    defaultValue={nowData.role}
                    onChange={(e, data) => {
                      setNowData({
                        ...nowData,
                        role: data.value ? data.value : '',
                      });
                    }}
                  />
                </FlexBox>
              </Form.Field>
              <Form.Field>
                <FlexBox width={200}>
                  <Label>보유 포인트</Label>
                  <Input
                    placeholder="보유 포인트"
                    defaultValue={nowData.point}
                    onChange={(e, data) => {
                      setNowData({
                        ...nowData,
                        point: data.value ? data.value : '',
                      });
                    }}
                  />
                </FlexBox>
              </Form.Field>
              <FlexBox>
                <Form.Field>
                  <FlexBox>
                    <Checkbox
                      label={'이메일 동의 여부'}
                      checked={nowData.marketingAlarm}
                      onChange={(e, data) => {
                        setNowData({
                          ...nowData,
                          marketingAlarm: data.checked ? data.checked : false,
                        });
                      }}
                    />
                  </FlexBox>
                </Form.Field>
                <Form.Field>
                  <FlexBox>
                    <Checkbox
                      label={'혜택 및 소식 알림'}
                      checked={nowData.marketingAgreed === 'true'}
                      onChange={(e, data) => {
                        setNowData({
                          ...nowData,
                          marketingAgreed: data.checked
                            ? data.checked.toString()
                            : 'false',
                        });
                      }}
                    />
                  </FlexBox>
                </Form.Field>
                <Form.Field>
                  <FlexBox>
                    <Checkbox
                      label={'주문 알림'}
                      checked={nowData.userOrderAlarm === 'true'}
                      onChange={(e, data) => {
                        setNowData({
                          ...nowData,
                          userOrderAlarm: data.checked
                            ? data.checked.toString()
                            : 'false',
                        });
                      }}
                    />
                  </FlexBox>
                </Form.Field>
              </FlexBox>
            </LineBox>
            <Form.Field>
              <FlexBox width={700}>
                <Label>그룹 이름</Label>
                <Input
                  placeholder="ex) 아파트,회사"
                  defaultValue={nowData.groupName}
                  onChange={(e, data) => {
                    setNowData({
                      ...nowData,
                      groupName: data.value ? data.value : false,
                    });
                  }}
                />
              </FlexBox>
            </Form.Field>
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

export default CostomerEditModal;

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
