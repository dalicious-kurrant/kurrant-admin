import Input from 'components/input/Input';
import {useApplyMakers} from 'hooks/useApplyMakers';
import {useState} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {Button, Dropdown, Form, Label, Modal} from 'semantic-ui-react';
import styled from 'styled-components';
import {registerMakersStatusData} from 'utils/statusFormatter';

const ModalComponent = ({open, setOpen, data}) => {
  const {mutateAsync: applyMakers} = useApplyMakers();

  const [status, setStatus] = useState();
  const form = useForm({
    mode: 'all',
  });
  const {watch, setValue} = form;

  const makersName = watch('makersName');
  const address = watch('address');
  const mainProduct = watch('mainProduct');
  const name = watch('name');
  const phone = watch('phone');
  const memo = watch('memo');

  const addSpotButton = async () => {
    data = {
      progressStatus: status,
      makersName: makersName,
      address: address,
      mainProduct: mainProduct,
      name: name,
      phone: phone,
      memo: memo === undefined ? null : memo,
    };

    const value = Object.values(data);
    if (value.includes(undefined) || value.includes('')) {
      alert('메모를 제외한 모든 값을 입력해 주세요!');
    } else {
      await applyMakers(data);
      setOpen(false);
    }
  };

  return (
    // <Form>
    <Modal
      //style={{width: 700}}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button>Show Modal</Button>}>
      <Modal.Header style={{textAlign: 'left'}}>메이커스 신청</Modal.Header>
      <Modal.Content>
        <FormProvider {...form}>
          <Wrap>
            <div>
              <div style={{display: 'flex'}}>
                <InputWrap>
                  <Label
                    content="상태"
                    style={{
                      width: 100,
                      textAlign: 'center',
                    }}
                  />
                  <Dropdown
                    style={{marginLeft: 10, width: 148, marginRight: 8}}
                    placeholder="상태"
                    fluid
                    selection
                    options={registerMakersStatusData}
                    onChange={(e, data) => {
                      setStatus(data.value);
                    }}
                  />
                </InputWrap>
                <InputWrap>
                  <Label
                    content="이름"
                    style={{
                      width: 100,
                      textAlign: 'center',
                    }}
                  />
                  <InputBox name="name" />
                </InputWrap>
                <InputWrap>
                  <Label
                    content="전화번호"
                    style={{
                      width: 100,
                      textAlign: 'center',
                    }}
                  />
                  <InputBox name="phone" type="number" />
                </InputWrap>
              </div>
              <div style={{display: 'flex'}}>
                <InputWrap>
                  <Label
                    content="메이커스명"
                    style={{
                      width: 100,
                      textAlign: 'center',
                    }}
                  />
                  <InputBox name="makersName" />
                </InputWrap>
                <InputWrap>
                  <Label
                    content="메인 상품"
                    style={{
                      width: 100,
                      textAlign: 'center',
                    }}
                  />
                  <InputBox name="mainProduct" />
                </InputWrap>
              </div>

              <InputWrap>
                <Label
                  content="주소"
                  style={{
                    width: 100,
                    textAlign: 'center',
                    marginRight: 10,
                  }}
                />
                <Input name="address" width="540px" />
              </InputWrap>
            </div>
          </Wrap>
          <div>
            <Label
              content="메모"
              style={{
                textAlign: 'center',
                marginTop: 12,
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
        <Button type="submit" content="추가" positive onClick={addSpotButton} />
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
  //display: flex;
`;
