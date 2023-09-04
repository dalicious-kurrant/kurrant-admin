/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {Button, Dropdown, Label, Pagination} from 'semantic-ui-react';
import {PageWrapper} from '../../style/common.style';
import {completePlanAtom, exelCompletePlanAtom} from '../../utils/store';
import {useAtom} from 'jotai';
import styled from 'styled-components';
import {formattedWeekDate} from '../../utils/dateFormatter';
import CustomPlanExelTable from './components/CustomPlanExelTable';

import 'react-datepicker/dist/react-datepicker.css';
import {useGetCompleteCalendar, useGetFilter} from 'hooks/useCalendars';
import CustomPlanTable from './components/CustomPlanTable';
import DateRangePicker from 'components/DateRangePicker/DateRangePicker';
import ActivityIndicator from 'components/ActivityIndicator/ActivityIndicator';

// 메이커스 정보 페이지
const CompletePlans = () => {
  const [shouldFetchData, setShouldFetchData] = useState(false);
  const [exelPlan, ] = useAtom(exelCompletePlanAtom);
  const [plan, setPlan] = useAtom(completePlanAtom);
  const [selectMakers, setSelectMakers] = useState([]);
  const [selectClient, setSelectClient] = useState([]);
  const [totalPage, ] = useState(0);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const curr = new Date();
  const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
  const [options, setOption] = useState([]);
  const [optionsClient, setOptionsClient] = useState([]);
  const [accessStartDate, setAccessStartDate] = useState(
    new Date(curr.getTime() + curr.getTimezoneOffset() * 60 * 1000) +
      KR_TIME_DIFF,
  );
  const [accessEndDate, setAccessEndDate] = useState(
    new Date(curr.getTime() + curr.getTimezoneOffset() * 60 * 1000) +
      KR_TIME_DIFF,
  );
  const {
    data: calendarData,
    isSuccess,
    refetch: calendarRefetch,
    isFetching,
  } = useGetCompleteCalendar(
    formattedWeekDate(accessStartDate),
    formattedWeekDate(accessEndDate),
    20,
    page,
    selectMakers,
    selectClient,
    shouldFetchData,
  );
  const {data: filterList} = useGetFilter();
  const handleFetchData = () => {
    calendarRefetch();
    setShouldFetchData(true);
  };
  useEffect(() => {
    if (!exelPlan) {
      if (isSuccess) {
        //console.log(calendarData?.data);
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
  // useEffect(() => {
  //   calendarRefetch();
  // }, [
  //   page,
  //   selectMakers,
  //   accessStartDate,
  //   accessEndDate,
  //   selectClient,
  //   calendarRefetch,
  // ]);
  return (
    <PageWrapper>
      <Wrapper>
        {!exelPlan && (
          <DeadLineWrapper>
            <Label color="blue">날짜선택</Label>
            <RecoDatePickerContainer>
              <DateRangePicker
                endDate={accessEndDate}
                setEndDate={setAccessEndDate}
                startDate={accessStartDate}
                setStartDate={setAccessStartDate}
              />
              <Button color="green" onClick={handleFetchData}>
                조회
              </Button>
            </RecoDatePickerContainer>
            {/* <RecoDatePickerContainer>
              <RecoDatePickerBox>
                <DatePicker
                  selected={new Date(formattedWeekDateZ(accessStartDate))}
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
                  selected={new Date(formattedWeekDateZ(accessEndDate))}
                  onChange={date => {
                    setAccessEndDate(date);
                  }}
                  dateFormat="yyyy-MM-dd"
                  customInput={<SelectDatePicker />}
                />
              </RecoDatePickerBox>
            </RecoDatePickerContainer> */}
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
      {!exelPlan && (
        <FilterContainer>
          <FilterBox>
            <DropBox>
              <Label color="teal">메이커스</Label>
              <Dropdown
                placeholder="메이커스"
                fluid
                search
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
                search
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
      {isFetching ? (
        <ActivityIndicator />
      ) : (
        <div>
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
        </div>
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
