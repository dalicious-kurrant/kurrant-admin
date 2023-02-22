import useModal from '../../hooks/useModal';
import React, {useEffect, useState} from 'react';
import {Button, Dropdown, Label, Table} from 'semantic-ui-react';
import {BtnWrapper, PageWrapper, TableWrapper} from '../../style/common.style';
import {exelPlanAtom, exelStaticAtom, planAtom} from '../../utils/store';
import {useAtom} from 'jotai';
import styled from 'styled-components';
import {
  formattedDate,
  formattedDateAndTime,
  formattedDateType,
  formattedFullDate,
  formattedTime,
  formattedWeekDate,
} from '../../utils/dateFormatter';
import PlanExelTable from './components/PlanExelTable';
import PlanTable from './components/PlanTable';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import SelectDatePicker from './components/SelectDatePicker';
import {useGetCalendar, usePostCalendar} from 'hooks/useCalendars';
import {scheduleFormatted2} from 'utils/statusFormatter';
const makersCalendar = [
  {
    presetMakersId: 1,
    scheduleStatus: 0,
    serviceDate: '2023-02-24',
    diningType: '아침',
    makersCapacity: 100,
    leftmakersCapacity: 80,
    deadline: '2023/02/30 18:00:00',
    clientSchedule: [
      {
        pickupTime: '07:50',
        clientName: '달리셔스',
        clientCapacity: 20,
        foodSchedule: [
          {
            presetFoodId: 9,
            foodName: '음식',
            foodStatus: '판매중',
            foodCapacity: 100,
            scheduleStatus: 2,
          },
          {
            presetFoodId: 10,
            foodName: '음식',
            foodStatus: '판매중',
            foodCapacity: 100,
            scheduleStatus: 2,
          },
        ],
      },
    ],
  },
  {
    presetMakersId: 2,
    scheduleStatus: 1,
    serviceDate: '2023-02-24',
    diningType: '아침',
    makersCapacity: 100,
    deadline: '2023/02/30 18:00:00',
    clientSchedule: [
      {
        pickupTime: '07:50',
        clientName: '달리셔스',
        clientCapacity: 20,
        foodSchedule: [
          {
            presetFoodId: 1,
            foodName: '음식',
            foodStatus: '판매중',
            foodCapacity: 100,
            scheduleStatus: 0,
          },
          {
            presetFoodId: 8,
            foodName: '음식',
            foodStatus: '판매중',
            foodCapacity: 100,
            scheduleStatus: 0,
          },
        ],
      },
    ],
  },
  {
    presetMakersId: 3,
    scheduleStatus: 0,
    serviceDate: '2023-02-24',
    diningType: '아침',
    makersCapacity: 100,
    deadline: '2023/02/30 18:00:00',
    clientSchedule: [
      {
        pickupTime: '07:50',
        clientName: '달리셔스',
        clientCapacity: 20,
        foodSchedule: [
          {
            presetFoodId: 2,
            foodName: '음식',
            foodStatus: '판매중',
            foodCapacity: 100,
            scheduleStatus: 0,
          },
          {
            presetFoodId: 3,
            foodName: '음식',
            foodStatus: '판매중',
            foodCapacity: 100,
            scheduleStatus: 0,
          },
          {
            presetFoodId: 4,
            foodName: '음식',
            foodStatus: '판매중',
            foodCapacity: 100,
            scheduleStatus: 0,
          },
        ],
      },
    ],
  },
  {
    presetMakersId: 4,
    scheduleStatus: 2,
    serviceDate: '2023-02-24',
    diningType: '아침',
    makersCapacity: 100,
    deadline: '2023/02/30 18:00:00',
    clientSchedule: [
      {
        pickupTime: '07:50',
        clientName: '달리셔스',
        clientCapacity: 20,
        foodSchedule: [
          {
            presetFoodId: 5,
            foodName: '음식',
            foodStatus: '판매중',
            foodCapacity: 100,
            scheduleStatus: 0,
          },
          {
            presetFoodId: 6,
            foodName: '음식',
            foodStatus: '판매중',
            foodCapacity: 100,
            scheduleStatus: 0,
          },
          {
            presetFoodId: 7,
            foodName: '음식',
            foodStatus: '판매중',
            foodCapacity: 100,
            scheduleStatus: 0,
          },
        ],
      },
    ],
  },
];
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
  const [exelStatic] = useAtom(exelStaticAtom);
  const [plan, setPlan] = useAtom(planAtom);
  const [selectMakers, setSelectMakers] = useState([]);
  const [selectClient, setSelectClient] = useState([]);
  const [selectDiningStatus, setSelectDiningStatus] = useState([]);
  const [startDate, setStartDate] = useState(
    new Date().setDate(new Date().getDate() + 1),
  );
  const recommandData = () => {
    setExelPlan();
    setPlan(makersCalendar);
  };
  const [count, setCount] = useState(0);
  const {mutateAsync: postCalendar} = usePostCalendar();
  const {data: calendarData, isSuccess} = useGetCalendar(10, 1);

  const callPostCalendar = async () => {
    if (plan) {
      const reqArray = [];
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
              leftMakersCapacity: client.leftMakersCapacity,
              foodScheduleStatus: scheduleFormatted2(food.scheduleStatus),
              foodName: food.foodName,
              foodStatus: food.foodStatus,
              foodCapacity: food.foodCapacity,
              leftFoodCapacity: food.leftFoodCapacity,
            };
            reqArray.push(result);
          });
        });
      });
      await postCalendar({
        deadline: formattedFullDate(startDate, '-'),
        excelDataList: [...reqArray],
      });
    }
    if (exelPlan) {
      const reqArray = [];
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
            leftMakersCapacity: 100,
            foodScheduleStatus: scheduleFormatted2(makers.scheduleStatus),
            foodName: makers.foodName,
            foodStatus: makers.foodStatus,
            foodCapacity: makers.foodCapacity,
            leftFoodCapacity: makers.leftFoodCapacity,
          };
          reqArray.push(result);
        }
      });

      await postCalendar({
        deadline: formattedFullDate(startDate, '-'),
        excelDataList: [...reqArray],
      });
    }
  };
  useEffect(() => {
    if (!exelPlan) {
      if (isSuccess) {
        setPlan(calendarData?.data?.items);
        console.log(calendarData);
      }
    }
  }, [calendarData, exelPlan, isSuccess, setPlan]);
  useEffect(() => {
    if (plan) {
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
  }, [plan]);
  return (
    <PageWrapper>
      <Wrapper>
        <Button color="blue" content="추천 가져오기" onClick={recommandData} />
      </Wrapper>
      <ContentWrapper>
        <BtnWrapper>
          <DeadLineWrapper>
            <Button
              color="blue"
              content="식사요청"
              onClick={callPostCalendar}
            />
            {/* <Button color="grey" content="2023-02-20" icon="calendar" onClick={onActive} /> */}
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
          </DeadLineWrapper>
        </BtnWrapper>

        <BtnWrapper>
          <Button color="blue" content="식단 완료(미완)" onClick={onActive} />
        </BtnWrapper>
      </ContentWrapper>
      <FilterContainer>
        <DropBox>
          <Label>메이커스</Label>
          <Dropdown
            placeholder="메이커스"
            fluid
            multiple
            selection
            options={options}
            value={selectMakers}
            onChange={(e, data) => {
              setSelectMakers(data.value);
              if (data.value.length !== 0) {
                const result = calendarData?.data?.items?.filter(makers => {
                  return data.value.includes(makers.makersName);
                });
                setPlan(result);
              } else {
                setPlan(calendarData?.data?.items);
              }
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
            options={optionsClient}
            value={selectClient}
            onChange={(e, data) => {
              setSelectClient(data.value);
              if (data.value.length !== 0) {
                if (plan) {
                  const result = calendarData?.data?.items?.map(makers => {
                    return {
                      ...makers,
                      clientSchedule: makers.clientSchedule.filter(v => {
                        return data.value.includes(v.clientName);
                      }),
                    };
                  });
                  setPlan(result);
                }
                if (exelPlan) {
                  const result = exelStatic?.filter((makers, i) => {
                    if (i === 0) return true;
                    return data.value.includes(makers.clientName);
                  });
                  setExelPlan(result);
                }
              } else {
                if (plan) {
                  setPlan(calendarData?.data?.items);
                }
                if (exelPlan) {
                  setExelPlan(exelStatic);
                }
              }
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
            options={optionsDiningStatus}
            value={selectDiningStatus}
            onChange={(e, data) => {
              setSelectDiningStatus(data.value);
              if (data.value.length !== 0) {
                const result = calendarData?.data?.items?.filter(makers => {
                  return data.value.includes(makers.scheduleStatus);
                });
                setPlan(result);
              } else {
                setPlan(calendarData?.data?.items);
              }
            }}
          />
        </DropBox>
      </FilterContainer>
      {exelPlan && <PlanExelTable />}
      {plan && (
        <PlanTable count={count} testData={plan} setTestData={setPlan} />
      )}
    </PageWrapper>
  );
};

export default Plans;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const DeadLineWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 400px;
`;
const DatePickerBox = styled.div`
  display: flex;
  align-items: center;
  width: 200px;
  cursor: pointer;
  justify-content: space-between;
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
  gap: 20px;
`;
