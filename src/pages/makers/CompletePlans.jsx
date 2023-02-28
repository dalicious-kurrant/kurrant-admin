import useModal from '../../hooks/useModal';
import React, {useEffect, useState} from 'react';
import {Dropdown, Label, Pagination} from 'semantic-ui-react';
import {PageWrapper} from '../../style/common.style';
import {completePlanAtom, exelCompletePlanAtom} from '../../utils/store';
import {useAtom} from 'jotai';
import styled from 'styled-components';
import {formattedWeekDate} from '../../utils/dateFormatter';
import CustomPlanExelTable from './components/CustomPlanExelTable';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import SelectDatePicker from './components/SelectDatePicker';
import {useGetCompleteCalendar, useGetFilter} from 'hooks/useCalendars';
import CustomPlanTable from './components/CustomPlanTable';

// 메이커스 정보 페이지
const CompletePlans = () => {
  const {onActive} = useModal();
  const [exelPlan, setExelPlan] = useAtom(exelCompletePlanAtom);
  const [plan, setPlan] = useAtom(completePlanAtom);
  const [selectMakers, setSelectMakers] = useState([]);
  const [selectClient, setSelectClient] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);

  const [options, setOption] = useState([]);
  const [optionsClient, setOptionsClient] = useState([]);
  const [accessStartDate, setAccessStartDate] = useState(new Date());
  const [accessEndDate, setAccessEndDate] = useState(new Date());
  const {
    data: calendarData,
    isSuccess,
    refetch: calendarRefetch,
  } = useGetCompleteCalendar(
    formattedWeekDate(accessStartDate),
    formattedWeekDate(accessEndDate),
    20,
    page,
    selectMakers,
    selectClient,
  );
  const {data: filterList} = useGetFilter();
  useEffect(() => {
    if (!exelPlan) {
      if (isSuccess) {
        console.log(calendarData?.data);
        setPlan(calendarData?.data);
        setOption(
          filterList?.data?.makers?.map(v => {
            return {key: v.makersName, text: v.makersName, value: v.makersId};
          }),
        );
        setOptionsClient(
          filterList?.data?.groups?.map(v => {
            return {key: v.groupName, text: v.groupName, value: v.groupId};
          }),
        );
      }
    } else {
      setPlan();
    }
  }, [calendarData, exelPlan, isSuccess, setPlan]);

  useEffect(() => {
    if (plan && !exelPlan) {
      setCount(
        plan.map(v => {
          let num = 0;
          v.makersSchedules.map(s => {
            return s.foodSchedules.map(() => {
              return num++;
            });
          });
          return num;
        }),
      );
    }
  }, [exelPlan, plan]);
  useEffect(() => {
    calendarRefetch();
  }, [
    page,
    selectMakers,
    accessStartDate,
    accessEndDate,
    selectClient,
    calendarRefetch,
  ]);
  return (
    <PageWrapper>
      <Wrapper>
        {plan && (
          <DeadLineWrapper>
            <Label color="blue">날짜선택</Label>
            <RecoDatePickerContainer>
              <RecoDatePickerBox>
                <DatePicker
                  selected={accessStartDate}
                  onChange={date => {
                    setAccessStartDate(date);
                  }}
                  dateFormat="yyyy-MM-dd"
                  customInput={<SelectDatePicker />}
                />
              </RecoDatePickerBox>
              -
              <RecoDatePickerBox>
                <DatePicker
                  selected={accessEndDate}
                  onChange={date => {
                    setAccessEndDate(date);
                  }}
                  dateFormat="yyyy-MM-dd"
                  customInput={<SelectDatePicker />}
                />
              </RecoDatePickerBox>
            </RecoDatePickerContainer>
          </DeadLineWrapper>
        )}
      </Wrapper>
      {/* <ContentWrapper>
        <BtnWrapper>
          <CallWrapper>
            <Button
              color="blue"
              content="식사요청"
              onClick={callPostCalendar}
            />
            <Button color="grey" content="2023-02-20" icon="calendar" onClick={onActive} />
            <DatePickerBox>
              <DatePicker
                selected={startDate}
                onChange={date => setStartDate(date)}
                timeInputLabel="Time:"
                dateFormat="yyyy-MM-dd aa h:mm"
                showTimeInput
                customInput={<SelectDatePicker />}
              />
            </DatePickerBox>
          </CallWrapper>
        </BtnWrapper>

        <BtnWrapper>
          <AccessBox>
            <Button color="blue" content="식단 완료(미완)" onClick={onActive} />
            <AccessDate>
              <AccessDatePickerBox>
                <DatePicker
                  selected={accessStartDate}
                  onChange={date => setAccessStartDate(date)}
                  dateFormat="yyyy-MM-dd"
                  customInput={<SelectDatePicker />}
                />
              </AccessDatePickerBox>
              -
              <AccessDatePickerBox>
                <DatePicker
                  selected={accessEndDate}
                  onChange={date => setAccessEndDate(date)}
                  dateFormat="yyyy-MM-dd"
                  customInput={<SelectDatePicker />}
                />
              </AccessDatePickerBox>
            </AccessDate>
          </AccessBox>
        </BtnWrapper>
      </ContentWrapper> */}
      {plan && (
        <FilterContainer>
          <FilterBox>
            <DropBox>
              <Label color="teal">메이커스</Label>
              <Dropdown
                placeholder="메이커스"
                fluid
                multiple
                selection
                options={options}
                value={selectMakers}
                onChange={(e, data) => {
                  setSelectMakers(data.value);
                }}
              />
            </DropBox>
            <DropBox>
              <Label color="orange">고객사</Label>
              <Dropdown
                placeholder="고객사"
                fluid
                multiple
                selection
                options={optionsClient}
                value={selectClient}
                onChange={(e, data) => {
                  setSelectClient(data.value);
                }}
              />
            </DropBox>
            {/* <DropBox>
            <Label>다이닝별 승인 상태</Label>
            <Dropdown
              placeholder="다이닝별 승인 상태"
              fluid
              multiple
              selection
              options={optionsDiningStatus}
              value={selectDiningStatus}
              onChange={(e, data) => {
                setSelectDiningStatus(data.value);
              }}
            />
          </DropBox> */}
          </FilterBox>
          {totalPage > 0 && (
            <PagenationBox>
              <Pagination
                defaultActivePage={page}
                totalPages={totalPage}
                boundaryRange={1}
                onPageChange={(e, data) => {
                  setPage(data.activePage);
                }}
              />
            </PagenationBox>
          )}
        </FilterContainer>
      )}
      {exelPlan && <CustomPlanExelTable />}
      {plan && (
        <>
          <CustomPlanTable
            count={count}
            testData={plan}
            setTestData={setPlan}
          />
        </>
      )}
    </PageWrapper>
  );
};

export default CompletePlans;
const PagenationBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 50px;
`;
const FilterBox = styled.div`
  display: flex;
  gap: 20px;
`;
const DeadLineWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
`;
const RecoDatePickerBox = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  justify-content: space-between;
  width: 100px;
`;
const RecoDatePickerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;
const Wrapper = styled.div`
  margin-bottom: 10px;
`;
const DropBox = styled.div`
  width: 250px;
  padding-top: 10px;
  padding-bottom: 20px;
`;
const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
`;
