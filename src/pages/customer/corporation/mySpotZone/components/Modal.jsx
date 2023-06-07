import Input from 'components/input/Input';
import {useCreateMySpotAdmin, useModifyMySpotAdmin} from 'hooks/useMySpotAdmin';
import {useEffect, useState} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {Button, Form, Label, Modal} from 'semantic-ui-react';
import styled from 'styled-components';

import {
  formattedDateReverseType,
  formattedDateType,
  formattedWeekDateZ,
} from 'utils/dateFormatter';

const ModalComponent = ({open, setOpen, data, title, button}) => {
  const form = useForm({
    mode: 'all',
  });

  const {mutateAsync: createSpot} = useCreateMySpotAdmin();
  const {mutateAsync: modifySpot} = useModifyMySpotAdmin();

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
  const openDate = watch('openDate');
  const closeDate = watch('closeDate');
  const diningType = watch('diningType');
  console.log(
    zipcode,
    si,
    gu,
    dong,
    user,
    morning,
    lunch,
    dinner,
    status,
    openDate,
    closeDate,
    diningType,
  );
  const addSpot = async () => {
    data = {
      name: name,
      zipcodes: zipcode?.split(','),
      city: si,
      counties: gu?.split(','),
      villages: dong?.split(','),
      status:
        status?.trim() === '오픈 대기' ? 0 : status?.trim() === '오픈' ? 1 : 2,
      openStartDate: openDate,
      openCloseDate: closeDate,
      userCount: Number(user),
      diningTypes: diningType
        ?.split(',')
        ?.map(v => formattedDateReverseType(v)),
      breakfastDeliveryTime: morning?.split(','),
      lunchDeliveryTime: lunch?.split(','),
      dinnerDeliveryTime: dinner?.split(','),
      memo: memo === undefined || memo === '' ? null : memo,
    };

    await createSpot(data);
    setOpen(false);
    console.log(data);
  };

  const modifySpotButton = async () => {
    data = {
      id: Number(spotId),
      name: name,
      zipcodes: Array.isArray(zipcode) ? zipcode : zipcode?.split(','),
      city: si,
      counties: Array.isArray(gu) ? gu : gu?.split(','),
      villages: Array.isArray(dong) ? dong : dong?.split(','),
      status: Array.isArray(status)
        ? status
        : status?.trim() === '오픈 대기'
        ? 0
        : status?.trim() === '오픈'
        ? 1
        : 2,
      openStartDate: openDate,
      openCloseDate: closeDate,
      userCount: Number(user),
      diningTypes: Array.isArray(diningType)
        ? diningType?.map(v => formattedDateReverseType(v))
        : diningType?.split(',')?.map(v => formattedDateReverseType(v)),
      breakfastDeliveryTime: Array.isArray(morning)
        ? morning
        : morning?.split(','),
      lunchDeliveryTime: Array.isArray(lunch) ? lunch : lunch?.split(','),
      dinnerDeliveryTime: Array.isArray(dinner) ? dinner : dinner?.split(','),
      memo: memo === undefined || memo === '' ? null : memo,
    };
    //console.log(data, 'modifyData');
    await modifySpot(data);
    setOpen(false);
  };

  useEffect(() => {
    setValue('openDate', data?.openStartDate);
    setValue('closeDate', data?.openCloseDate);
    setValue('spotId', data?.id);
    setValue('name', data?.name);
    setValue('zipcode', data?.zipcodes);
    setValue('si', data?.city);
    setValue('gu', data?.counties);
    setValue('dong', data?.villages);
    setValue('user', data?.userCount);
    setValue(
      'status',
      data?.status === 0
        ? '오픈 대기'
        : data?.status === 1
        ? '오픈'
        : data?.status === 2 && '정지',
    );
    setValue('morning', data?.breakfastDeliveryTime);
    setValue('lunch', data?.lunchDeliveryTime);
    setValue('dinner', data?.dinnerDeliveryTime);
    setValue(
      'diningType',
      data?.diningType?.map(v => formattedDateType(v)),
    );
  }, [
    data?.breakfastDeliveryTime,
    data?.city,
    data?.counties,
    data?.diningType,
    data?.dinnerDeliveryTime,
    data?.id,
    data?.lunchDeliveryTime,
    data?.name,
    data?.openCloseDate,
    data?.openStartDate,
    data?.status,
    data?.userCount,
    data?.villages,
    data?.zipcodes,
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
                <InputBox name="spotId" type="number" readOnly />
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
                  content="시/군/구"
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
                <InputBox name="dong" width="250px" />
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
                  width="250px"
                  placeholder="30544,30522"
                />
              </InputWrap>
            </div>
            <div style={{marginLeft: -100}}>
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
                  placeholder="2023-06-06"
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
                  placeholder="2023-06-06"
                  width="120px"
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
                alignSelf: 'flex-start',
                marginLeft: 24,
              }}>
              <InputWrap>
                <Label
                  content="식사 타입"
                  style={{
                    width: 100,
                    textAlign: 'center',
                  }}
                />
                <InputBox
                  name="diningType"
                  width="250px"
                  placeholder="아침,점심,저녁"
                />
              </InputWrap>
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
                  placeholder="05:00,06:00"
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
                  placeholder="12:00,13:00"
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
                  placeholder="18:00,19:00"
                />
              </InputWrap>
            </div>
          </Wrap>
          <div>
            <Label
              content="메모"
              style={{
                textAlign: 'center',
                marginTop: 32,
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
            button === '추가' ? addSpot() : modifySpotButton();
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
