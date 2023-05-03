import Input from 'components/input/Input';
import {useEffect, useState} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {Button, Modal} from 'semantic-ui-react';
import styled from 'styled-components';
import Select from 'react-select';
import {useEditEvent} from 'hooks/usePoint';

const EventModify = ({
  open,
  setOpen,
  data,
  checkedId,
  conditionArr,
  setCheckItems,
}) => {
  const {mutateAsync: editPoint} = useEditEvent();

  const getStartDate = e => {
    setStartDate(e.target.value);
  };
  const getEndDate = e => {
    setEndDate(e.target.value);
  };

  const initialData = data?.filter(el => el.pointPolicyId === checkedId[0]);

  const [startDate, setStartDate] = useState(initialData[0]?.eventStartDate);
  const [endDate, setEndDate] = useState(initialData[0]?.eventEndDate);

  const conditionFilter = conditionArr.filter(
    el => el.value === initialData[0].pointConditionCode,
  );
  const [conditionOption, setConditionOption] = useState(conditionFilter);

  const form = useForm({
    mode: 'all',
  });
  const {
    watch,

    setValue,
  } = form;

  const completedCount = watch('completedCount');
  const accountLimit = watch('accountLimit');
  const rewardPoint = watch('rewardPoint');
  const noticeId = watch('noticeId');

  useEffect(() => {
    setValue('completedCount', initialData[0]?.completedConditionCount);
    setValue('accountLimit', initialData[0]?.accountCompletionLimit);
    setValue('rewardPoint', initialData[0]?.rewardPoint);
    setValue('noticeId', initialData[0]?.boardId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setValue]);

  const modifyButton = async () => {
    const data = {
      body: {
        pointCondition: conditionOption.value,
        completedConditionCount: Number(completedCount),
        accountCompletionLimit: Number(accountLimit),
        rewardPoint: Number(rewardPoint),
        eventStartDate: startDate,
        eventEndDate: endDate,
        boardId: Number(noticeId),
      },
      policyId: checkedId[0],
    };
    await editPoint(data);
    setCheckItems([]);
    setOpen(false);
  };
  return (
    // <Form>
    <Modal
      style={{width: 'auto'}}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button>Show Modal</Button>}>
      <Modal.Header>이벤트포인트 수정</Modal.Header>
      <Modal.Content>
        <FormProvider {...form}>
          <div style={{marginBottom: 12}}>
            <Title>공지사항 ID</Title>
            <Input name="noticeId" />
          </div>
          <TopContents>
            <div>
              <Title>조건</Title>
              <SelectBox
                options={conditionArr}
                placeholder="조건 선택"
                defaultValue={conditionFilter}
                onChange={e => {
                  if (e) {
                    setConditionOption(e.value);
                  } else {
                    setConditionOption(null);
                  }
                }}
              />
            </div>
            <div>
              <Title>기간 MIN</Title>
              <DateInput
                type="date"
                defaultValue={startDate}
                onChange={e => getStartDate(e)}
              />
            </div>
            <div>
              <Title>기간 MAX</Title>
              <DateInput
                type="date"
                defaultValue={endDate}
                onChange={e => getEndDate(e)}
              />
            </div>
          </TopContents>
          <InputWrap>
            <Input name="completedCount" label="조건 완료 횟수" width="200px" />
            <Input name="accountLimit" label="계정당 횟수" width="200px" />
            <Input name="rewardPoint" label="지급 포인트" width="200px" />
          </InputWrap>
        </FormProvider>
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
          onClick={modifyButton}
        />
      </Modal.Actions>
    </Modal>
    // </Form>
  );
};

export default EventModify;

const InputWrap = styled.div`
  display: flex;
  justify-content: center;
`;

const DateInput = styled.input`
  padding: 4px;
  width: 200px;
  border-radius: 4px;
  border: 1px solid ${({theme}) => theme.colors.grey[5]};
  margin-top: 4px;
`;

const SelectBox = styled(Select)`
  width: 200px;
  margin-top: 4px;
`;

const TopContents = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 24px;
`;

const Title = styled.div`
  font-weight: 600;
`;
