import Input from 'components/input/Input';
import { useAddShareSpot } from 'hooks/useSpot';
import {FormProvider, useForm} from 'react-hook-form';
import {Button, Label, Modal} from 'semantic-ui-react';
import styled from 'styled-components';

const AddShareModal = ({open, setOpen, data, title, button}) => {
  const {mutateAsync: addSpot} = useAddShareSpot();
  const form = useForm({
    mode: 'all',
  });
  const {handleSubmit} = form;

  const addSpotButton = async (datas) => {
    console.log(datas);
    data = {
      "shareSpotRequestType": 2,
      "userId": datas.userId|| null,
      "groupId": 93,
      "address": {
          "address1": datas.address1,
          "address2": datas.address2,
          "zipCode" : null
      },
      "deliveryTime": datas.deliveryTime,
      "entranceOption": datas.entranceOption==="가능"? true:false,
      "memo": datas.memo
  };

    await addSpot(data);
    setOpen(false);
  };

 
  return (
    // <Form>
    <Modal
      style={{width: 800}}
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
                  content="*주소(도로명)"
                  style={{
                    width: 130,
                    textAlign: 'start',
                  }}
                />
                <InputBox name="address1" width="250px" />
              </InputWrap>
              <InputWrap>
                <Label
                  content="*상세주소"
                  style={{
                    width: 130,
                    textAlign: 'start',
                  }}
                />
                <InputBox name="address2"  width="250px"/>
              </InputWrap>
              <InputWrap>
                <Label
                  content="외부인 출입 여부 "
                  style={{
                    width: 130,
                    textAlign: 'start',
                  }}
                />
                <InputBox name="entranceOption" placeholder={'ex)가능,불가'}  width="250px"/>
              </InputWrap>
            </div>
            <div style={{marginLeft: 24}}>
              <InputWrap>
                <Label
                  content="배송시간"
                  style={{
                    width: 100,
                    textAlign: 'start',
                  }}
                />
                <InputBox name="deliveryTime" />
              </InputWrap>
              <InputWrap>
                <Label
                  content="신청 유저 ID"
                  style={{
                    width: 100,
                    textAlign: 'start',
                  }}
                />
                <InputBox name="userId" type="number" />
              </InputWrap>
            </div>
          </Wrap>
          <div>
            <Label
              content="메모"
              style={{
                textAlign: 'start',
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
            button === '추가' && handleSubmit(addSpotButton)();
          }}
        />
      </Modal.Actions>
    </Modal>
    // </Form>
  );
};

export default AddShareModal;

const InputWrap = styled.div`
  display: flex;
  align-items: flex-end;
`;



const InputBox = styled(Input)`
  display: flex;
  padding-top: 5px;
  padding-bottom: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  min-width: 150px;
  padding-left: 8px;

  margin-top: 12px;
  margin-right: 8px;
  margin-left: 8px;
`;

const Wrap = styled.div`
  display: flex;
`;
