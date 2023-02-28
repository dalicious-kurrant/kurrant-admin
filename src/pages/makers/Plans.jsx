import useModal from '../../hooks/useModal';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Button, Dropdown, Label, Pagination, Table} from 'semantic-ui-react';
import {BtnWrapper, PageWrapper, TableWrapper} from '../../style/common.style';
import {
  exelPlanAtom,
  exelStaticAtom,
  planAtom,
  recommandPlanAtom,
} from '../../utils/store';
import {useAtom} from 'jotai';
import styled from 'styled-components';
import {
  formattedDate,
  formattedDateAndTime,
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
  useGetRecommandCalendar,
  usePostCalendar,
  usePostPresetCalendar,
} from 'hooks/useCalendars';
import {scheduleFormatted2} from 'utils/statusFormatter';
import {QueryClient} from 'react-query';
const options = [
  {key: '달리셔스', text: '달리셔스', value: '달리셔스'},
  {key: '커런트', text: '커런트', value: '커런트'},
];
const optionsClient = [
  {key: '달리셔스', text: '달리셔스', value: '달리셔스'},
  {key: '이너스', text: '이너스', value: '이너스'},
];
const optionsDiningStatus = [
  {key: '요청', text: '요청', value: 0},
  {key: '승인', text: '승인', value: 1},
  {key: '거절', text: '거절', value: 2},
];

// 메이커스 정보 페이지
const Plans = () => {
  const {onActive} = useModal();
  const [exelPlan, setExelPlan] = useAtom(exelPlanAtom);
  const [exelStatic, setStaticPlan] = useAtom(exelStaticAtom);
  const [plan, setPlan] = useAtom(planAtom);
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
  } = useGetCalendar(20, page, selectMakers, selectClient, selectDiningStatus);
  const [recommandStartDate, setRecommandStartDate] = useState(new Date());
  const [recommandEndDate, setRecommandEndDate] = useState(new Date());
  const [options, setOption] = useState([]);
  const [optionsClient, setOptionsClient] = useState([]);
  const {data: calendarRecommandData, refetch: recommandRefetch} =
    useGetRecommandCalendar(
      formattedWeekDate(recommandStartDate),
      formattedWeekDate(recommandEndDate),
      20,
      page,
      selectMakers,
      selectClient,
      selectDiningStatus,
      isClick,
      setIsClick,
    );
  const [startDate, setStartDate] = useState(
    new Date().setDate(new Date().getDate() + 1),
  );
  const [accessStartDate, setAccessStartDate] = useState(new Date());
  const [accessEndDate, setAccessEndDate] = useState(new Date());
  const recommandData = () => {
    setIsClick(true);
    setReCommandPlan();
    setExelPlan();
    setStaticPlan();
    setPlan();
    setTotalPage();
    setReCommandPlan(calendarRecommandData?.data.items?.presetScheduleList);
  };
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
      const req = plan.map(makers => {
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
      reCommandPlan.map(makers => {
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
        }
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
  }, [recommandRefetch, recommandStartDate]);
  useEffect(() => {
    if (!exelPlan && !reCommandPlan) {
      if (isSuccess) {
        console.log(calendarData?.data);
        setTotalPage(calendarData?.data?.total);
        setPlan(calendarData?.data?.items?.presetScheduleList);
        setOption(
          calendarData?.data?.items?.makersInfoList.map(v => {
            return {key: v.makersName, text: v.makersName, value: v.makersId};
          }),
        );
        setOptionsClient(
          calendarData?.data?.items?.groupInfoList.map(v => {
            return {key: v.groupName, text: v.groupName, value: v.groupId};
          }),
        );
      }
    } else {
      setPlan();
    }
  }, [calendarData, exelPlan, isSuccess, reCommandPlan, setPlan]);

  useEffect(() => {
    if (plan && !exelPlan && !reCommandPlan) {
      setCount(
        plan.map((v, i) => {
          let num = 0;
          v.clientSchedule.map((s, si) => {
            return s.foodSchedule.map((d, di) => {
              return num++;
            });
          });
          return num;
        }),
      );
    }
    if (!exelPlan && !plan && reCommandPlan) {
      setCount(
        reCommandPlan.map((v, i) => {
          let num = 0;
          v.clientSchedule.map((s, si) => {
            return s.foodSchedule.map((d, di) => {
              return num++;
            });
          });
          return num;
        }),
      );
    }
  }, [exelPlan, plan, reCommandPlan]);
  useEffect(() => {
    calendarRefetch();
    recommandRefetch();
  }, [
    page,
    selectMakers,
    selectClient,
    selectDiningStatus,
    calendarRefetch,
    recommandRefetch,
  ]);
  useEffect(() => {
    return () => {
      console.log('비우기');
      setExelPlan();
      setPlan();
    };
  }, [setExelPlan, setPlan]);
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
          <PagenationBox>
            <Pagination
              defaultActivePage={page}
              totalPages={totalPage}
              onPageChange={(e, data) => {
                console.log(data.activePage);
              }}
            />
          </PagenationBox>
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
`;
const FilterBox = styled.div`
  display: flex;
  gap: 20px;
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
