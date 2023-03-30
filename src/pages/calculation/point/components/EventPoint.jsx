import {useAddEvent, useDeleteEvent, useGetEventPlicy} from 'hooks/usePoint';
import {useRef, useState} from 'react';
import {Button, Table} from 'semantic-ui-react';
import {TableWrapper} from 'style/common.style';
import styled from 'styled-components';
import Select from 'react-select';
import {FormProvider, useForm} from 'react-hook-form';
import Input from 'components/input/Input';
import {formattedWeekDate, formattedWeekDateZ} from 'utils/dateFormatter';
import EventModify from './EventModify';
import withCommas from 'utils/withCommas';

const EventPoint = () => {
  const conditionRef = useRef(null);
  const startDateRef = useRef(null);
  const endDateRef = useRef(null);
  const day = new Date();
  const days = formattedWeekDateZ(day);
  const [startDate, setStartDate] = useState(days);
  const [endDate, setEndDate] = useState(days);
  const [nowData, setNowData] = useState([]);
  const [checkItems, setCheckItems] = useState([]);
  const [conditionOption, setConditionOption] = useState(null);
  const [showOpenModal, setShowOpenModal] = useState(false);
  const {data: eventPlicy} = useGetEventPlicy();
  const {mutateAsync: addEvent} = useAddEvent();
  const {mutateAsync: deleteEvent} = useDeleteEvent();

  const form = useForm({
    mode: 'all',
  });
  const {watch, setValue} = form;

  const getStartDate = e => {
    setStartDate(e.target.value);
  };
  const getEndDate = e => {
    setEndDate(e.target.value);
  };

  const conditionArr = eventPlicy?.data?.pointConditionSelectBoxList.map(el => {
    return {
      value: el.code,
      label: el.condition,
    };
  });

  const completedCount = watch('completedCount');
  const accountLimit = watch('accountLimit');
  const rewardPoint = watch('rewardPoint');

  const handleSingleCheck = (checked, id, data) => {
    const arr = [data];

    if (checked) {
      setCheckItems(prev => [...prev, id]);
      setNowData(arr.filter(el => el.pointPolicyId === id));
    } else {
      setCheckItems(checkItems.filter(el => el !== id));
    }
  };

  const addEventCondition = async () => {
    const data = {
      pointCondition: conditionOption.value,
      completedConditionCount: Number(completedCount),
      accountCompletionLimit: Number(accountLimit),
      rewardPoint: Number(rewardPoint),
      eventStartDate: startDate,
      eventEndDate: endDate,
    };
    await addEvent(data);
    setValue('completedCount', '');
    setValue('accountLimit', '');
    setValue('rewardPoint', '');
    setStartDate(days);
    setEndDate(days);
    setConditionOption(null);
  };

  const deleteEventCondition = async () => {
    if (checkItems.length === 1) {
      const policyId = checkItems[0];
      await deleteEvent(policyId);
      setCheckItems([]);
    }
  };

  const showEditOpen = () => {
    if (checkItems.length === 1) {
      setShowOpenModal(true);
    } else if (checkItems.length === 0) {
      alert('수정할 조건을 선택해 주세요');
    } else {
      alert('수정은 한개씩 가능합니다.');
    }
  };
  return (
    <TableWrapper>
      <ButtonWrap>
        <Button
          content="추가"
          color="blue"
          size="small"
          onClick={addEventCondition}
        />
        <Button
          content="수정"
          color="green"
          size="small"
          onClick={showEditOpen}
        />
        <Button
          content="삭제"
          color="red"
          size="small"
          onClick={deleteEventCondition}
        />
      </ButtonWrap>
      <TableWrap>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell textAlign="center">조건</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">
                조건 완료 횟수
              </Table.HeaderCell>
              <Table.HeaderCell textAlign="center">
                계정당 횟수
              </Table.HeaderCell>
              <Table.HeaderCell textAlign="center">
                지급 포인트
              </Table.HeaderCell>
              <Table.HeaderCell textAlign="center">기간 MIN</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">기간 MAX</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell>
                <div style={{justifyContent: 'center', display: 'flex'}}>
                  <SelectBox
                    ref={conditionRef}
                    options={conditionArr}
                    placeholder="조건 선택"
                    value={conditionOption}
                    onChange={e => {
                      if (e) {
                        setConditionOption(e);
                      } else {
                        setConditionOption(null);
                      }
                    }}
                  />
                </div>
              </Table.Cell>
              <FormProvider {...form}>
                <Table.Cell textAlign="center">
                  <Input name="completedCount" />
                </Table.Cell>
                <Table.Cell textAlign="center">
                  <Input name="accountLimit" />
                </Table.Cell>
                <Table.Cell textAlign="center">
                  <Input name="rewardPoint" />
                </Table.Cell>
              </FormProvider>
              <Table.Cell textAlign="center">
                <DateInput
                  ref={startDateRef}
                  type="date"
                  value={startDate}
                  onChange={e => getStartDate(e)}
                />
              </Table.Cell>
              <Table.Cell textAlign="center">
                <DateInput
                  // ref={endDateRef}
                  type="date"
                  value={endDate}
                  onChange={e => getEndDate(e)}
                />
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </TableWrap>
      <TableWrap>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell textAlign="center">선택</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">ID</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">조건</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">
                조건 완료 횟수
              </Table.HeaderCell>
              <Table.HeaderCell textAlign="center">
                계정당 횟수
              </Table.HeaderCell>
              <Table.HeaderCell textAlign="center">
                지급 포인트
              </Table.HeaderCell>
              <Table.HeaderCell textAlign="center">기간 MIN</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">기간 MAX</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {eventPlicy?.data?.eventPointPolicyList?.map((el, idx) => {
              return (
                <Table.Row key={idx}>
                  <Table.Cell textAlign="center">
                    <input
                      checked={
                        checkItems.includes(el.pointPolicyId) ? true : false
                      }
                      type="checkbox"
                      // onClick={e => {
                      //   checked(e, v.orderItemDailyFoodId);
                      // }}
                      onChange={e =>
                        handleSingleCheck(
                          e.target.checked,
                          el.pointPolicyId,
                          el,
                        )
                      }
                    />
                  </Table.Cell>
                  <Table.Cell textAlign="center">{el.pointPolicyId}</Table.Cell>
                  <Table.Cell textAlign="center">
                    {el.pointConditionValue}
                  </Table.Cell>
                  <Table.Cell textAlign="center">
                    {el.completedConditionCount}
                  </Table.Cell>
                  <Table.Cell textAlign="center">
                    {el.accountCompletionLimit}
                  </Table.Cell>
                  <Table.Cell textAlign="center">
                    {withCommas(el.rewardPoint)}p
                  </Table.Cell>
                  <Table.Cell textAlign="center">
                    {el.eventStartDate}
                  </Table.Cell>
                  <Table.Cell textAlign="center">{el.eventEndDate}</Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </TableWrap>
      {showOpenModal && (
        <EventModify
          open={showOpenModal}
          setOpen={setShowOpenModal}
          data={nowData}
          checkedId={checkItems}
          conditionArr={conditionArr}
          setCheckItems={setCheckItems}
        />
      )}
    </TableWrapper>
  );
};

export default EventPoint;

const TableWrap = styled.div`
  width: 85%;
  margin-top: 24px;
`;

const ButtonWrap = styled.div`
  margin-top: 12px;
  width: 85%;
  justify-content: flex-end;
  display: flex;
`;

const DateInput = styled.input`
  padding: 4px;
  width: 150px;
  border-radius: 4px;
  border: 1px solid ${({theme}) => theme.colors.grey[5]};
  margin-top: 4px;
`;

const SelectBox = styled(Select)`
  width: 200px;
  margin-top: 4px;
`;
