import useModal from '../../hooks/useModal';
import React, {useCallback, useEffect, useState} from 'react';
import {Button, Dropdown, Label, Table} from 'semantic-ui-react';
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
import {
  useGetCalendar,
  useGetRecommandCalendar,
  usePostCalendar,
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
  const [reCommandPlan, setReCommandPlan] = useAtom(recommandPlanAtom);
  const [selectMakers, setSelectMakers] = useState([]);
  const [selectClient, setSelectClient] = useState([]);
  const [selectDiningStatus, setSelectDiningStatus] = useState([]);
  const [count, setCount] = useState(0);
  const {mutateAsync: postCalendar} = usePostCalendar();
  const {data: calendarData, isSuccess} = useGetCalendar(10, 1);
  const [recommandStartDate, setRecommandStartDate] = useState(new Date());
  const [options, setOption] = useState([]);
  const [optionsClient, setOptionsClient] = useState([]);
  const {data: calendarRecommandData, refetch: recommandRefetch} =
    useGetRecommandCalendar(formattedWeekDate(recommandStartDate), 10, 1);
  const [startDate, setStartDate] = useState(
    new Date().setDate(new Date().getDate() + 1),
  );
  const recommandData = () => {
    setReCommandPlan();
    setExelPlan();
    setStaticPlan();
    setPlan();
    setReCommandPlan(calendarRecommandData?.data.items?.presetScheduleList);
  };

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
              foodScheduleStatus: scheduleFormatted2(food.scheduleStatus),
              foodName: food.foodName,
              foodStatus: food.foodStatus,
              foodCapacity: food.foodCapacity,
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
    if (reCommandPlan) {
      const reqArray = [];
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
            foodScheduleStatus: scheduleFormatted2(makers.scheduleStatus),
            foodName: makers.foodName,
            foodStatus: makers.foodStatus,
            foodCapacity: makers.foodCapacity,
            leftFoodCapacity: makers.foodCapacity,
          };
          reqArray.push(result);
        }
      });

      await postCalendar({
        deadline: formattedFullDate(startDate, '-'),
        excelDataList: [...reqArray],
      });
      alert('식사를 요청했습니다.');
    }
  };
  useEffect(() => {
    recommandRefetch();
  }, [recommandRefetch, recommandStartDate]);
  useEffect(() => {
    if (!exelPlan && !reCommandPlan) {
      if (isSuccess) {
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
  return (
    <PageWrapper>
      <Wrapper>
        <DeadLineWrapper>
          <Button
            color="blue"
            content="추천 가져오기"
            onClick={recommandData}
          />
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
        </DeadLineWrapper>
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
                if (plan && !exelPlan && !reCommandPlan) {
                  const result =
                    calendarData?.data?.items?.presetScheduleList?.filter(
                      makers => {
                        return data.value.includes(makers.makersName);
                      },
                    );
                  setPlan(result);
                }
                if (exelPlan && !plan && !reCommandPlan) {
                  const result = exelStatic?.filter((makers, i) => {
                    if (i === 0) return true;
                    return data.value.includes(makers.makersName);
                  });
                  setExelPlan(result);
                }
              } else {
                if (plan && !exelPlan && !reCommandPlan) {
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
              console.log(data.value);
              if (data.value.length !== 0) {
                if (plan && !exelPlan && !reCommandPlan) {
                  const result =
                    calendarData?.data?.items?.presetScheduleList?.map(
                      makers => {
                        return {
                          ...makers,
                          clientSchedule: makers.clientSchedule.filter(v => {
                            return data.value.includes(v.clientName);
                          }),
                        };
                      },
                    );
                  setPlan(result);
                }
                if (exelPlan && !plan && !reCommandPlan) {
                  const result = exelStatic?.filter((makers, i) => {
                    if (i === 0) return true;
                    return data.value.includes(makers.clientName);
                  });
                  setExelPlan(result);
                }
              } else {
                if (plan) {
                  setPlan(calendarData?.data?.items?.presetScheduleList);
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
                if (plan && !exelPlan && !reCommandPlan) {
                  const result =
                    calendarData?.data?.items?.presetScheduleList?.filter(
                      makers => {
                        return data.value.includes(makers.scheduleStatus);
                      },
                    );
                  setPlan(result);
                }
                if (exelPlan && !plan && !reCommandPlan) {
                  const result = exelStatic?.filter((makers, i) => {
                    if (i === 0) return true;
                    return data.value.includes(makers.scheduleStatus);
                  });
                  setExelPlan(result);
                }
                if (reCommandPlan && !exelPlan && !plan) {
                  const result =
                    calendarData?.data?.items?.presetScheduleList?.filter(
                      makers => {
                        return data.value.includes(makers.scheduleStatus);
                      },
                    );
                  setReCommandPlan(result);
                }
              } else {
                if (plan) {
                  setPlan(calendarData?.data?.items?.presetScheduleList);
                }
                if (exelPlan) {
                  setExelPlan(exelStatic);
                }
                if (reCommandPlan) {
                  setReCommandPlan(
                    calendarRecommandData?.data.items?.presetScheduleList,
                  );
                }
              }
            }}
          />
        </DropBox>
      </FilterContainer>
      {exelPlan && <PlanExelTable />}
      {plan && (
        <PlanTable count={count} testData={plan} setTestData={setPlan} />
      )}
      {reCommandPlan && (
        <PlanTable
          count={count}
          testData={reCommandPlan}
          setTestData={setReCommandPlan}
        />
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
  cursor: pointer;
  justify-content: space-between;
  width: 200px;
`;
const RecoDatePickerBox = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  justify-content: space-between;
  width: 100px;
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

const res = {
  deadline: '2023-02-24 12:40:06',
  excelDataList: [
    {
      makersName: '라무진',
      makersScheduleStatus: 1,
      serviceDate: '2023-02-25',
      diningType: '점심',
      makersCapacity: 100,
      pickupTime: '11:20:00',
      groupName: '달리셔스',
      groupCapacity: 5,
      foodScheduleStatus: 1,
      foodName: '1++ 양갈비(200g)',
      foodStatus: '판매대기',
      foodCapacity: 20,
    },
    {
      makersName: '라무진',
      makersScheduleStatus: 1,
      serviceDate: '2023-02-25',
      diningType: '점심',
      makersCapacity: 100,
      pickupTime: '11:20:00',
      groupName: '달리셔스',
      groupCapacity: 5,
      foodScheduleStatus: 1,
      foodName: '마늘밥',
      foodStatus: '판매중지',
      foodCapacity: 100,
    },
    {
      makersName: '라무진',
      makersScheduleStatus: 1,
      serviceDate: '2023-02-25',
      diningType: '점심',
      makersCapacity: 100,
      pickupTime: '11:20:00',
      groupName: '달리셔스',
      groupCapacity: 5,
      foodScheduleStatus: 1,
      foodName: '오뎅탕',
      foodStatus: '판매중',
      foodCapacity: 100,
    },
    {
      makersName: '라무진',
      makersScheduleStatus: 1,
      serviceDate: '2023-02-25',
      diningType: '점심',
      makersCapacity: 100,
      pickupTime: '11:20:00',
      groupName: '달리셔스',
      groupCapacity: 5,
      foodScheduleStatus: 1,
      foodName: '1++ 양갈비(500g)',
      foodStatus: '판매대기',
      foodCapacity: 100,
    },
    {
      makersName: '라무진',
      makersScheduleStatus: 1,
      serviceDate: '2023-02-25',
      diningType: '점심',
      makersCapacity: 100,
      pickupTime: '11:20:00',
      groupName: '위시티자이아파트',
      groupCapacity: 13,
      foodScheduleStatus: 1,
      foodName: '1++ 양갈비(200g)',
      foodStatus: '판매대기',
      foodCapacity: 20,
    },
    {
      makersName: '라무진',
      makersScheduleStatus: 1,
      serviceDate: '2023-02-25',
      diningType: '점심',
      makersCapacity: 100,
      pickupTime: '11:20:00',
      groupName: '위시티자이아파트',
      groupCapacity: 13,
      foodScheduleStatus: 1,
      foodName: '마늘밥',
      foodStatus: '판매중지',
      foodCapacity: 100,
    },
    {
      makersName: '라무진',
      makersScheduleStatus: 1,
      serviceDate: '2023-02-25',
      diningType: '점심',
      makersCapacity: 100,
      pickupTime: '11:20:00',
      groupName: '위시티자이아파트',
      groupCapacity: 13,
      foodScheduleStatus: 1,
      foodName: '오뎅탕',
      foodStatus: '판매중',
      foodCapacity: 100,
    },
    {
      makersName: '라무진',
      makersScheduleStatus: 1,
      serviceDate: '2023-02-25',
      diningType: '점심',
      makersCapacity: 100,
      pickupTime: '11:20:00',
      groupName: '위시티자이아파트',
      groupCapacity: 13,
      foodScheduleStatus: 1,
      foodName: '1++ 양갈비(500g)',
      foodStatus: '판매대기',
      foodCapacity: 100,
    },
    {
      makersName: '민디도시락',
      makersScheduleStatus: 1,
      serviceDate: '2023-02-25',
      diningType: '점심',
      makersCapacity: 100,
      pickupTime: '11:20:00',
      groupName: '달리셔스',
      groupCapacity: 5,
      foodScheduleStatus: 1,
      foodName: '한정식 도시락',
      foodStatus: '판매중지',
      foodCapacity: 100,
    },
    {
      makersName: '마라하오',
      makersScheduleStatus: 1,
      serviceDate: '2023-02-25',
      diningType: '점심',
      makersCapacity: 100,
      pickupTime: '11:20:00',
      groupName: '위시티자이아파트',
      groupCapacity: 13,
      foodScheduleStatus: 1,
      foodName: '마라샹궈',
      foodStatus: '판매중',
      foodCapacity: 20,
    },
    {
      makersName: '마라하오',
      makersScheduleStatus: 1,
      serviceDate: '2023-02-25',
      diningType: '점심',
      makersCapacity: 100,
      pickupTime: '11:20:00',
      groupName: '위시티자이아파트',
      groupCapacity: 13,
      foodScheduleStatus: 1,
      foodName: '마라탕',
      foodStatus: '판매대기',
      foodCapacity: 100,
    },
    {
      makersName: '라무진',
      makersScheduleStatus: 1,
      serviceDate: '2023-02-26',
      diningType: '점심',
      makersCapacity: 100,
      pickupTime: '11:20:00',
      groupName: '달리셔스',
      groupCapacity: 5,
      foodScheduleStatus: 1,
      foodName: '1++ 양갈비(200g)',
      foodStatus: '판매대기',
      foodCapacity: 20,
    },
    {
      makersName: '라무진',
      makersScheduleStatus: 1,
      serviceDate: '2023-02-26',
      diningType: '점심',
      makersCapacity: 100,
      pickupTime: '11:20:00',
      groupName: '달리셔스',
      groupCapacity: 5,
      foodScheduleStatus: 1,
      foodName: '마늘밥',
      foodStatus: '판매중지',
      foodCapacity: 100,
    },
    {
      makersName: '라무진',
      makersScheduleStatus: 1,
      serviceDate: '2023-02-26',
      diningType: '점심',
      makersCapacity: 100,
      pickupTime: '11:20:00',
      groupName: '달리셔스',
      groupCapacity: 5,
      foodScheduleStatus: 1,
      foodName: '오뎅탕',
      foodStatus: '판매중',
      foodCapacity: 100,
    },
    {
      makersName: '라무진',
      makersScheduleStatus: 1,
      serviceDate: '2023-02-26',
      diningType: '점심',
      makersCapacity: 100,
      pickupTime: '11:20:00',
      groupName: '달리셔스',
      groupCapacity: 5,
      foodScheduleStatus: 1,
      foodName: '1++ 양갈비(500g)',
      foodStatus: '판매대기',
      foodCapacity: 100,
    },
  ],
};
