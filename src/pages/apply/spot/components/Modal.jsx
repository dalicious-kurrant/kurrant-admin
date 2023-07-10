import Input from 'components/input/Input';
import {useAddMySpot, useModifyMySpot} from 'hooks/useMySpot';
import {useEffect, useState} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {Button, Form, Label, Modal} from 'semantic-ui-react';
import styled from 'styled-components';

const ModalComponent = ({open, setOpen, data, title, button}) => {
  const {mutateAsync: addSpot} = useAddMySpot();
  const {mutateAsync: modifySpot} = useModifyMySpot();
  const form = useForm({
    mode: 'all',
  });
  const {watch, setValue} = form;

  const zipcode = watch('zipcode');
  const city = watch('city');
  const county = watch('county');
  const village = watch('village');
  const waitingUserCount = watch('waitingUserCount');
  const memo = watch('memo');

  const addSpotButton = async () => {
    data = {
      city: city,
      county: county,
      village: village,
      waitingUserCount: Number(waitingUserCount),
      zipcode: zipcode,
      memo: memo === undefined ? null : memo,
    };

    await addSpot(data);
    setOpen(false);
  };
  const modifySpotButton = async () => {
    data = {
      id: data.id,
      city: city,
      county: county,
      village: village,
      requestUserCount: Number(waitingUserCount),
      zipcode: zipcode,
      memo: memo === undefined ? null : memo,
    };

    await modifySpot(data);
    setOpen(false);
  };

  useEffect(() => {
    setValue('zipcode', data?.zipcode);
    setValue('city', data?.city);
    setValue('county', data?.county);
    setValue('village', data?.village);
    setValue('waitingUserCount', data?.requestUserCount);
    setValue('memo', data?.memo);
  }, [
    data?.city,
    data?.county,
    data?.memo,
    data?.requestUserCount,
    data?.village,
    data?.zipcode,
    setValue,
  ]);
  return (
    // <Form>
    <Modal
      style={{width: 700}}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button>Show Modal</Button>}>
      <Modal.Header style={{textAlign: 'left'}}>{title}</Modal.Header>
      <Modal.Content>
        <div style={{fontSize: 12}}> * 필수 입력값 입니다.</div>
        <FormProvider {...form}>
          <Wrap>
            <div>
              <InputWrap>
                <Label
                  content="*우편번호"
                  style={{
                    width: 100,
                    textAlign: 'center',
                  }}
                />
                <InputBox name="zipcode" type="number" />
              </InputWrap>
              <InputWrap>
                <Label
                  content="*시/도"
                  style={{
                    width: 100,
                    textAlign: 'center',
                  }}
                />
                <InputBox name="city" />
              </InputWrap>
              <InputWrap>
                <Label
                  content="*군/구"
                  style={{
                    width: 100,
                    textAlign: 'center',
                  }}
                />
                <InputBox name="county" />
              </InputWrap>
              <InputWrap>
                <Label
                  content="*동/읍/리"
                  style={{
                    width: 100,
                    textAlign: 'center',
                  }}
                />
                <InputBox name="village" />
              </InputWrap>
            </div>
            <div style={{marginLeft: 24}}>
              <InputWrap>
                <Label
                  content="*신청 유저 수"
                  style={{
                    width: 100,
                    textAlign: 'center',
                  }}
                />
                <InputBox name="waitingUserCount" type="number" />
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
            button === '추가' && addSpotButton();
            button === '수정' && modifySpotButton();
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
  width: 150px;
  padding-left: 8px;

  margin-top: 12px;
  margin-right: 8px;
  margin-left: 8px;
`;

const Wrap = styled.div`
  display: flex;
`;
