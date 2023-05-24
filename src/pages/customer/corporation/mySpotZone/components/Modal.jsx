import Input from 'components/input/Input';
import {useEffect, useState} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {Button, Form, Label, Modal} from 'semantic-ui-react';
import styled from 'styled-components';

import {formattedWeekDateZ} from 'utils/dateFormatter';

const ModalComponent = ({open, setOpen, data, title, button}) => {
  const form = useForm({
    mode: 'all',
  });

  const {watch, setValue} = form;
  const spotId = watch('spotId');
  const name = watch('name');
  const zipcode = watch('zipcode');
  const si = watch('si');
  const gu = watch('gu');
  const dong = watch('dong');
  const user = watch('user');
  const memo = watch('memo');
  const morning = watch('morning');
  const lunch = watch('lunch');
  const dinner = watch('dinner');
  const status = watch('status');

  const addSpot = () => {
    data = {
      si: si,
      gu: gu,
      dong: dong,
      user: user,
      zipcode: zipcode,
      memo: memo,
    };
    setOpen(false);
    console.log(data);
  };

  useEffect(() => {
    setValue('openDate', data?.openDate);
    setValue('closeDate', data?.closeDate);
    setValue('spotId', data?.spotId);
    setValue('name', data?.name);
    setValue('zipcode', data?.zipcode);
    setValue('si', data?.si);
    setValue('gu', data?.gu);
    setValue('dong', data?.dong);
    setValue('user', data?.user);
    setValue('status', data?.status);
    setValue('morning', data?.morning);
    setValue('lunch', data?.lunch);
    setValue('dinner', data?.dinner);
  }, [
    data?.closeDate,
    data?.dinner,
    data?.dong,
    data?.gu,
    data?.lunch,
    data?.morning,
    data?.name,
    data?.openDate,
    data?.si,
    data?.spotId,
    data?.status,
    data?.user,
    data?.zipcode,
    setValue,
  ]);
  return (
    // <Form>
    <Modal
      style={{width: 950}}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button>Show Modal</Button>}>
      <Modal.Header style={{textAlign: 'left'}}>{title}</Modal.Header>
      <Modal.Content>
        <FormProvider {...form}>
          <Wrap>
            <div>
              <InputWrap>
                <Label
                  content="스팟 ID"
                  style={{
                    width: 100,
                    textAlign: 'center',
                  }}
                />
                <InputBox name="spotId" type="number" />
              </InputWrap>
              <InputWrap>
                <Label
                  content="내부 스팟명"
                  style={{
                    width: 100,
                    textAlign: 'center',
                  }}
                />
                <InputBox name="name" width="120px" />
              </InputWrap>
              <InputWrap>
                <Label
                  content="시/도"
                  style={{
                    width: 100,
                    textAlign: 'center',
                  }}
                />
                <InputBox name="si" width="120px" />
              </InputWrap>
              <InputWrap>
                <Label
                  content="군/구"
                  style={{
                    width: 100,
                    textAlign: 'center',
                  }}
                />
                <InputBox name="gu" width="120px" />
              </InputWrap>
              <InputWrap>
                <Label
                  content="동/읍/리"
                  style={{
                    width: 100,
                    textAlign: 'center',
                  }}
                />
                <InputBox name="dong" width="120px" />
              </InputWrap>
            </div>
            <div style={{marginLeft: 24}}>
              <InputWrap>
                <Label
                  content="상태"
                  style={{
                    width: 100,
                    textAlign: 'center',
                  }}
                />
                <InputBox
                  name="status"
                  width="120px"
                  placeholder="오픈/오픈 대기"
                />
              </InputWrap>
              <InputWrap>
                <Label
                  content="오픈 시작날짜"
                  style={{
                    width: 100,
                    textAlign: 'center',
                  }}
                />
                <InputBox
                  name="openDate"
                  placeholder="ex)20230606"
                  width="120px"
                />
              </InputWrap>
              <InputWrap>
                <Label
                  content="오픈 마감날짜"
                  style={{
                    width: 100,
                    textAlign: 'center',
                  }}
                />
                <InputBox
                  name="closeDate"
                  placeholder="ex)20230606"
                  width="120px"
                />
              </InputWrap>
              <InputWrap>
                <Label
                  content="우편번호"
                  style={{
                    width: 100,
                    textAlign: 'center',
                  }}
                />
                <InputBox
                  name="zipcode"
                  width="350px"
                  placeholder="ex)30544,30522"
                />
              </InputWrap>
              <InputWrap>
                <Label
                  content="이용자 수"
                  style={{
                    width: 100,
                    textAlign: 'center',
                  }}
                />
                <InputBox name="user" type="number" />
              </InputWrap>
            </div>
            <div
              style={{
                marginLeft: -214,
                alignSelf: 'flex-start',
              }}>
              <InputWrap>
                <Label
                  content="아침 시간"
                  style={{
                    width: 100,
                    textAlign: 'center',
                  }}
                />
                <InputBox
                  name="morning"
                  width="250px"
                  placeholder="ex)05:00,06:00"
                />
              </InputWrap>
              <InputWrap>
                <Label
                  content="점심 시간"
                  style={{
                    width: 100,
                    textAlign: 'center',
                  }}
                />
                <InputBox
                  name="lunch"
                  width="250px"
                  placeholder="ex)05:00,06:00"
                />
              </InputWrap>
              <InputWrap>
                <Label
                  content="저녁 시간"
                  style={{
                    width: 100,
                    textAlign: 'center',
                  }}
                />
                <InputBox
                  name="dinner"
                  width="250px"
                  placeholder="ex)05:00,06:00"
                />
              </InputWrap>
            </div>
          </Wrap>
          <div>
            <Label
              content="메모"
              style={{
                textAlign: 'center',
                marginTop: 48,
              }}
            />

            <Input name="memo" width="650px" height="100px" />
          </div>
        </FormProvider>
      </Modal.Content>
      <Modal.Actions style={{textAlign: 'right'}}>
        <Button
          type="submit"
          content="취소"
          color="black"
          onClick={() => {
            setOpen(false);
          }}
        />
        <Button
          type="submit"
          content={button}
          positive
          onClick={() => {
            button === '추가' && addSpot();
          }}
        />
      </Modal.Actions>
    </Modal>
    // </Form>
  );
};

export default ModalComponent;

const InputWrap = styled.div`
  display: flex;
  align-items: flex-end;
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding-right: 12px;
`;

const InputBox = styled(Input)`
  display: flex;
  padding-top: 5px;
  padding-bottom: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  //width: 150px;
  padding-left: 8px;

  margin-top: 12px;
  margin-right: 8px;
  margin-left: 8px;
`;

const Wrap = styled.div`
  display: flex;
`;
