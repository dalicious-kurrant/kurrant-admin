import Input from 'components/input/Input';

import {useAddPrivateSpot} from 'hooks/useSpot';
import {useState} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {Button, Dropdown, Label, Modal} from 'semantic-ui-react';
import styled from 'styled-components';
import {registerMakersStatusData} from 'utils/statusFormatter';

const AddShareModal = ({open, setOpen, data, title, button}) => {
  const {mutateAsync: addSpot} = useAddPrivateSpot();
  const [status, setStatus] = useState();
  const form = useForm({
    mode: 'all',
  });
  const {watch} = form;

  const name = watch('name');
  const phone = watch('phone');
  const memo = watch('memo');
  const address = watch('address');

  const addSpotButton = async () => {
    const data = {
      name: name,
      address: address,
      phone: phone,
      memo: memo === undefined ? null : memo,
      progressStatus: status,
    };

    const value = Object.values(data);
    if (value.includes(undefined) || value.includes('')) {
      alert('메모를 제외한 모든 값을 입력해 주세요!');
    } else {
      await addSpot(data);
      setOpen(false);
    }
  };

  return (
    // <Form>
    <Modal
      //style={{width: 800}}
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
              <div style={{display: 'flex'}}>
                <InputWrap>
                  <Label
                    content="이름"
                    style={{
                      width: 100,
                      textAlign: 'center',
                    }}
                  />
                  <InputBox name="name" width="250px" />
                </InputWrap>
                <InputWrap>
                  <Label
                    content="전화번호 "
                    style={{
                      width: 100,
                      textAlign: 'center',
                    }}
                  />
                  <InputBox name="phone" width="250px" type="number" />
                </InputWrap>
              </div>
              <InputWrap>
                <Label
                  content="주소"
                  style={{
                    width: 100,
                    textAlign: 'center',
                  }}
                />
                <InputBox name="address" width="250px" />
              </InputWrap>
            </div>
          </Wrap>
          <div>
            <Label
              content="메모"
              style={{
                textAlign: 'start',
                marginTop: 24,
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

export default AddShareModal;

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
  min-width: 150px;
  padding-left: 8px;

  margin-top: 12px;
  margin-right: 8px;
  margin-left: 8px;
`;

const Wrap = styled.div`
  display: flex;
`;
