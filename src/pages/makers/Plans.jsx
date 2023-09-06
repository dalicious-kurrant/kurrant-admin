/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Button, Dropdown, Label, Pagination} from 'semantic-ui-react';
import {BtnWrapper, PageWrapper} from '../../style/common.style';
import {
  exelPlanAtom,
  planAtom,
  planExportAtom,
  recommandPlanAtom,
} from '../../utils/store';
import {useAtom} from 'jotai';
import styled from 'styled-components';
import {
  formattedDate,
  formattedFullDate,
  formattedTime,
  formattedWeekDate,
} from '../../utils/dateFormatter';
import PlanExelTable from './components/PlanExelTable';
import PlanTable from './components/PlanTable';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import SelectDatePicker from './components/SelectDatePicker';
import {
  useCompleteCalendar,
  useGetCalendar,
  useGetExportCalendar,
  useGetRecommandCalendar,
  usePostCalendar,
} from 'hooks/useCalendars';
import {scheduleFormatted2} from 'utils/statusFormatter';

const optionsDiningStatus = [
  {key: '요청', text: '요청', value: 0},
  {key: '승인', text: '승인', value: 1},
  {key: '거절', text: '거절', value: 2},
];

// 메이커스 정보 페이지
const Plans = () => {
  const [exelPlan, setExelPlan] = useAtom(exelPlanAtom);
  const [plan, setPlan] = useAtom(planAtom);
  const [, setPlanExport] = useAtom(planExportAtom);
  const pageRef = useRef(null);
  const [reCommandPlan, setReCommandPlan] = useAtom(recommandPlanAtom);
  const [selectMakers, setSelectMakers] = useState([]);
  const [selectClient, setSelectClient] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [selectDiningStatus, setSelectDiningStatus] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [isClick, setIsClick] = useState(false);
  const {mutateAsync: postCalendar} = usePostCalendar();
  const {mutateAsync: completeCalendar} = useCompleteCalendar();
  const {
    data: calendarData,
    isSuccess,
    refetch: calendarRefetch,
  } = useGetCalendar(200, page, selectMakers, selectClient, selectDiningStatus);
  const {data: exportCalendarData} = useGetExportCalendar();
  const [recommandStartDate, setRecommandStartDate] = useState(new Date());
  const [recommandEndDate, setRecommandEndDate] = useState(new Date());
  const [options, setOption] = useState([]);
  const [optionsClient, setOptionsClient] = useState([]);
  const {
    data: calendarRecommandData,
    isSuccess: isRecommandSuccess,
    refetch: recommandRefetch,
  } = useGetRecommandCalendar(
    formattedWeekDate(recommandStartDate),
    formattedWeekDate(recommandEndDate),
    2000,
    page,
    selectMakers,
    selectClient,
    selectDiningStatus,
    isClick,
    setIsClick,
  );

  useEffect(() => {
    console.log(selectMakers);
  }, [selectMakers]);

  const [startDate, setStartDate] = useState(
    new Date().setDate(new Date().getDate() + 1),
  );
  const [accessStartDate, setAccessStartDate] = useState(new Date());
  const [accessEndDate, setAccessEndDate] = useState(new Date());
  const recommandData = useCallback(() => {
    setReCommandPlan();
    setExelPlan();
    if (isRecommandSuccess) {
      console.log(calendarRecommandData?.data);
      setTotalPage(calendarRecommandData?.data?.total);
      setReCommandPlan(calendarRecommandData?.data?.items?.presetScheduleList);
      setOption(
        calendarRecommandData?.data?.items?.makersInfoList.map(v => {
          return {key: v.makersId, text: v.makersName, value: v.makersId};
        }),
      );
      setOptionsClient(
        calendarRecommandData?.data?.items?.groupInfoList.map(v => {
          return {key: v.groupId, text: v.groupName, value: v.groupId};
        }),
      );
    }
  }, [calendarRecommandData?.data, isRecommandSuccess, setReCommandPlan]);
  const onCreate = async () => {
    await completeCalendar({
      startDate: formattedWeekDate(accessStartDate),
      endDate: formattedWeekDate(accessEndDate),
    });
    alert('식사 일정 최종 완료');
  };
  const callPostCalendar = async () => {
    const reqArray = [];
    if (plan) {
      plan.map(makers => {
        return makers.clientSchedule.map(client => {
          return client.foodSchedule.map(food => {
            const result = {
              makersName: makers.makersName,
              makersScheduleStatus: scheduleFormatted2(makers.scheduleStatus),
              serviceDate: makers.serviceDate,
              diningType: makers.diningType,
              makersCapacity: makers.makersCapacity,
              pickupTime: client.pickupTime,
              groupName: client.clientName,
              groupCapacity: client.clientCapacity,
              foodScheduleStatus: scheduleFormatted2(food.scheduleStatus),
              foodName: food.foodName,
              foodStatus: food.foodStatus,
              foodCapacity: food.foodCapacity,
            };
            reqArray.push(result);
          });
        });
      });
    }
    if (reCommandPlan) {
      console.log(reCommandPlan);
      reCommandPlan.map(makers => {
        return makers.clientSchedule.map(client => {
          return client.foodSchedule.map(food => {
            const result = {
              makersName: makers.makersName,
              makersScheduleStatus: makers.scheduleStatus,
              serviceDate: makers.serviceDate,
              diningType: makers.diningType,
              makersCapacity: makers.makersCapacity,
              pickupTime: client.pickupTime,
              groupName: client.clientName,
              groupCapacity: client.clientCapacity,
              foodScheduleStatus: food.scheduleStatus,
              foodName: food.foodName,
              foodStatus: food.foodStatus,
              foodCapacity: food.foodCapacity,
            };
            reqArray.push(result);
            return result
          });
        });
      });
    }
    if (exelPlan) {
      exelPlan.map((makers, i) => {
        if (i !== 0) {
          const result = {
            makersName: makers.makersName,
            makersScheduleStatus: scheduleFormatted2(makers.scheduleStatus),
            serviceDate: formattedDate(makers.serviceDate, '-'),
            diningType: makers.diningType,
            makersCapacity: makers.makersCapacity,
            pickupTime: formattedTime(makers.pickupTime),
            groupName: makers.clientName,
            groupCapacity: makers.clientCapacity,
            foodScheduleStatus: scheduleFormatted2(makers.scheduleStatus),
            foodName: makers.foodName,
            foodStatus: makers.foodStatus,
            foodCapacity: makers.foodCapacity,
          };
          reqArray.push(result);          
          return result;
        }
        return undefined
      });
    }
    await postCalendar({
      deadline: formattedFullDate(startDate, '-'),
      excelDataList: [...reqArray],
    });
    console.log(reqArray);
    alert('식사를 요청했습니다.');
  };
  useEffect(() => {
    recommandRefetch();
  }, [recommandRefetch, recommandStartDate, recommandEndDate]);
  useEffect(() => {
    if (!exelPlan && !reCommandPlan) {
      if (isSuccess) {
        console.log(calendarData?.data);
        setTotalPage(calendarData?.data?.total);
        setPlan(calendarData?.data?.items?.presetScheduleList);
        console.log(exportCalendarData?.data);
        setPlanExport(exportCalendarData?.data);
        setOption(
          calendarData?.data?.items?.makersInfoList.map(v => {
            return {key: v.makersId, text: v.makersName, value: v.makersId};
          }),
        );
        setOptionsClient(
          calendarData?.data?.items?.groupInfoList.map(v => {
            return {key: v.groupId, text: v.groupName, value: v.groupId};
          }),
        );
      }
    } else {
      setPlan();
    }
  }, [
    calendarData,
    calendarRecommandData?.data,
    exelPlan,
    isRecommandSuccess,
    isSuccess,
    plan,
    reCommandPlan,
    setPlan,
    setReCommandPlan,
  ]);

  useEffect(() => {
    if (plan && !exelPlan && !reCommandPlan) {
      setCount(
        plan.map((v) => {
          let num = 0;
          v.clientSchedule.map((s) => {
            return s.foodSchedule.map(() => {
              return num++;
            });
          });
          return num;
        }),
      );
    }
    if (!exelPlan && !plan && reCommandPlan) {
      setCount(
        reCommandPlan.map((v) => {
          let num = 0;
          v.clientSchedule.map((s) => {
            return s.foodSchedule.map(() => {
              return num++;
            });
          });
          return num;
        }),
      );
    }
  }, [exelPlan, plan, reCommandPlan]);
  useEffect(() => {
    if (plan) {
      calendarRefetch();
    }
    if (reCommandPlan) {
      recommandRefetch();
    }
  }, [
    page,
    selectMakers,
    selectClient,
    selectDiningStatus,
    calendarRefetch,
    recommandRefetch,
    plan,
    reCommandPlan,
  ]);
  useEffect(() => {
    return () => {
      console.log('비우기');
      setExelPlan();
      setPlan();
    };
  }, [setExelPlan, setPlan]);

  useEffect(() => {
    console.log('카운트랑 플랜이여');
    console.log(count);
    console.log(plan);
  }, [count, plan]);

  return (
    <PageWrapper>
      <Wrapper>
        <DeadLineWrapper>
          <Button
            color="blue"
            content="추천 가져오기"
            onClick={recommandData}
          />
          <RecoDatePickerContainer>
            <RecoDatePickerBox>
              <DatePicker
                selected={recommandStartDate}
                onChange={date => {
                  setRecommandStartDate(date);
                }}
                dateFormat="yyyy-MM-dd"
                customInput={<SelectDatePicker />}
              />
            </RecoDatePickerBox>
            -
            <RecoDatePickerBox>
              <DatePicker
                selected={recommandEndDate}
                onChange={date => {
                  setRecommandEndDate(date);
                }}
                dateFormat="yyyy-MM-dd"
                customInput={<SelectDatePicker />}
              />
            </RecoDatePickerBox>
          </RecoDatePickerContainer>
        </DeadLineWrapper>
      </Wrapper>
      <ContentWrapper>
        <BtnWrapper>
          <CallWrapper>
            {/* <Button color="grey" content="2023-02-20" icon="calendar" onClick={onActive} /> */}
            <DatePickerBox>
              <Label>마감날짜</Label>
              <DatePicker
                selected={startDate}
                onChange={date => setStartDate(date)}
                timeInputLabel="Time:"
                dateFormat="yyyy-MM-dd aa h:mm"
                showTimeInput
                customInput={<SelectDatePicker />}
              />
            </DatePickerBox>
            <Button
              color="blue"
              content="식사요청"
              onClick={callPostCalendar}
            />
          </CallWrapper>
        </BtnWrapper>

        <BtnWrapper>
          <AccessBox>
            <Button color="blue" content="식단 완료" onClick={onCreate} />
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
      </ContentWrapper>
      <FilterContainer>
        <FilterBox>
          <DropBox>
            <Label>메이커스</Label>
            <Dropdown
              placeholder="메이커스"
              fluid
              multiple
              selection
              search
              options={options}
              value={selectMakers}
              onChange={(e, data) => {
                if (pageRef.current !== null)
                  pageRef.current.state.activePage = 1;
                setPage(1);
                setSelectMakers(data.value);
              }}
            />
          </DropBox>
          <DropBox>
            <Label>고객사</Label>
            <Dropdown
              placeholder="고객사"
              fluid
              multiple
              selection
              search
              options={optionsClient}
              value={selectClient}
              onChange={(e, data) => {
                if (pageRef.current !== null)
                  pageRef.current.state.activePage = 1;
                setPage(1);
                setSelectClient(data.value);
              }}
            />
          </DropBox>
          <DropBox>
            <Label>다이닝별 승인 상태</Label>
            <Dropdown
              placeholder="다이닝별 승인 상태"
              fluid
              multiple
              selection
              search
              options={optionsDiningStatus}
              value={selectDiningStatus}
              onChange={(e, data) => {
                if (pageRef.current !== null)
                  pageRef.current.state.activePage = 1;
                setPage(1);
                setSelectDiningStatus(data.value);
              }}
            />
          </DropBox>
        </FilterBox>
        {totalPage > 0 && (
          <PagenationBox>
            <Pagination
              defaultActivePage={page}
              totalPages={totalPage}
              boundaryRange={1}
              ref={pageRef}
              onPageChange={(e, data) => {
                setPage(data.activePage);
              }}
            />
          </PagenationBox>
        )}
      </FilterContainer>
      {exelPlan && <PlanExelTable />}
      {plan && (
        <>
          <PlanTable count={count} testData={plan} setTestData={setPlan} />
        </>
      )}
      {reCommandPlan && (
        <>
          <PlanTable
            count={count}
            testData={reCommandPlan}
            setTestData={setReCommandPlan}
          />
        </>
      )}
    </PageWrapper>
  );
};

export default Plans;
const PagenationBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 50px;
  /* border: 5px solid black; */
`;
const FilterBox = styled.div`
  display: flex;
  gap: 20px;
  /* border: 1px solid black; */
`;
const AccessDate = styled.div`
  justify-content: center;
  align-items: center;
  gap: 10px;
  display: flex;
  margin-top: 10px;
`;
const AccessBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
`;
const AccessDatePickerBox = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  justify-content: space-between;
  width: 100px;
`;
const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const DeadLineWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
`;
const CallWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 20px;
`;
const DatePickerBox = styled.div`
  display: flex;
  cursor: pointer;
  align-items: flex-start;
  width: 200px;
  flex-direction: column;
`;
const RecoDatePickerBox = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  justify-content: space-between;
  width: 100px;
  margin-top: 10px;
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
