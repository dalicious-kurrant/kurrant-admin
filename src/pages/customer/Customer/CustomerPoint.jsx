import {useState} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {Button, Modal} from 'semantic-ui-react';
import styled from 'styled-components';
import Input from '../../../components/input/Input';
import {useUserPoint} from 'hooks/usePoint';

const CustomerPoint = ({open, setOpen, userCheck}) => {
  const {mutateAsync: userPoint} = useUserPoint();
  const [addState, ] = useState();
  const [minusState, ] = useState();
  console.log(addState, minusState);
  const form = useForm({
    mode: 'all', 
  });
  const {watch} = form;

  const point = watch('point');

  const pointAddButton = async () => {
    if (userCheck.length !== 0) {
      const data = {
        userIdList: userCheck,
        pointStatus: 4,
        rewardPoint: Number(point),
      };
      await userPoint(data);
      setOpen(false);
      window.location.reload();
    }
  };
  const pointMinusButton = async () => {
    if (userCheck.length !== 0) {
      const data = {
        userIdList: userCheck,
        pointStatus: 5,
        rewardPoint: Number(point),
      };
      await userPoint(data);
      setOpen(false);
      window.location.reload();
    }
  };

  return (
    // <Form>
    <Modal
      style={{width: 300}}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button>Show Modal</Button>}>
      <Modal.Header style={{textAlign: 'center'}}>포인트 관리</Modal.Header>
      <Modal.Content>
        <FormProvider {...form}>
          {/* <div>
            <label htmlFor="add">포인트 적립</label>
            <input
              type="checkbox"
              id={4}
              name="add"
              onChange={e => {
                if (e && e.target.checked) {
                  setAddState(e.target.id);
                }
              }}
            />
          </div>
          <div>
            <label htmlFor="minus">포인트 차감</label>
            <input
              type="checkbox"
              id={5}
              name="minus"
              onChange={e => {
                if (e && e.target.checked) {
                  setMinusState(e.target.id);
                }
              }}
            />
          </div> */}
          <InputWrap>
            <Input
              type="number"
              name="point"
              label="포인트"
              width="200px"
              // onKeyPress={handleOnKeyPress}
            />
            {/* <Input
              name="origin"
              label="원산지"
              width="200px"
              // onKeyPress={handleOnKeyPress}
            /> */}
          </InputWrap>
        </FormProvider>
      </Modal.Content>
      <Modal.Actions style={{textAlign: 'center'}}>
        {/* <Button color="black" onClick={() => setOpen(false)}>
          취소
        </Button> */}
        <Button
          type="submit"
          content="적립"
          //labelPosition="right"
          //icon="checkmark"
          positive
          onClick={pointAddButton}
        />
        <Button
          type="submit"
          content="차감"
          //labelPosition="right"
          //icon="checkmark"
          color="red"
          onClick={pointMinusButton}
        />
      </Modal.Actions>
    </Modal>
    // </Form>
  );
};

export default CustomerPoint;

const InputWrap = styled.div`
  display: flex;
  justify-content: center;
`;
