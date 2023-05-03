import {useEffect, useState} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {Button, Form, Modal} from 'semantic-ui-react';
import styled from 'styled-components';
import Input from '../../../components/input/Input';
import {useUserPoint} from 'hooks/usePoint';
import {formattedWeekDateZ} from 'utils/dateFormatter';

const IssueModal = ({open, setOpen, setModifyData}) => {
  const [date, setDate] = useState(formattedWeekDateZ(new Date()));

  const form = useForm({
    mode: 'all',
  });
  const {watch} = form;

  // const issue = watch('issue');
  // const calc = watch('calc');
  const price = watch('price');
  const content = watch('content');

  const onClick = () => {
    const data = {
      issueDate: date,
      price: Number(price),
      memo: content,
    };

    if (data.memo !== undefined) {
      setModifyData(prev => [...prev, data]);
    }
    setOpen(false);
  };
  return (
    // <Form>
    <Modal
      style={{width: 400}}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button>Show Modal</Button>}>
      <Modal.Header style={{textAlign: 'center'}}>정산 이슈 추가</Modal.Header>
      <Modal.Content>
        <FormProvider {...form}>
          {/* <InputWrap>
            <Title>이슈항목</Title>
            <Input name="issue" width="200px" />
          </InputWrap>
          <InputWrap>
            <Title>정산항목</Title>
            <Input name="calc" width="200px" />
          </InputWrap> */}
          <InputWrap>
            <Title>
              날{`\u00A0`}
              {`\u00A0`}
              {`\u00A0`}
              {`\u00A0`}
              {`\u00A0`}
              {`\u00A0`}
              {`\u00A0`}짜
            </Title>
            <InputBox
              type="date"
              onChange={e => {
                setDate(e.target.value);
              }}
            />
          </InputWrap>
          <InputWrap>
            <Title>
              금{`\u00A0`}
              {`\u00A0`}
              {`\u00A0`}
              {`\u00A0`}
              {`\u00A0`}
              {`\u00A0`}
              {`\u00A0`}액
            </Title>
            <Input name="price" width="200px" type="number" />
          </InputWrap>
          <InputWrap>
            <Title>이슈내용</Title>
            <Input name="content" width="200px" />
          </InputWrap>
        </FormProvider>
      </Modal.Content>
      <Modal.Actions style={{textAlign: 'center'}}>
        <Button
          type="submit"
          content="확인"
          positive
          onClick={() => {
            onClick();
          }}
        />
      </Modal.Actions>
    </Modal>
    // </Form>
  );
};

export default IssueModal;

const InputWrap = styled.div`
  display: flex;
  justify-content: center;
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding-right: 12px;
`;

const InputBox = styled.input`
  display: flex;
  padding-top: 5px;
  padding-bottom: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 200px;
  padding-left: 8px;

  margin-top: 12px;
  margin-right: 8px;
`;
