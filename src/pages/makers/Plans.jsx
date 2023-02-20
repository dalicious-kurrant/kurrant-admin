import useModal from '../../hooks/useModal';
import React, {useEffect, useState} from 'react';
import {Button, Table} from 'semantic-ui-react';
import {BtnWrapper, PageWrapper, TableWrapper} from '../../style/common.style';
import {exelPlanAtom, planAtom} from '../../utils/store';
import {useAtom} from 'jotai';
import styled from 'styled-components';
import { formattedDateType, formattedWeekDate } from '../../utils/dateFormatter';
import PlanExelTable from './components/PlanExelTable';
import PlanTable from './components/PlanTable';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import SelectDatePicker from './components/SelectDatePicker';
const makersCalendar = [
  {
    "presetMakersId" : 1,
    "scheduleStatus" : 0,
    "serviceDate" : "2023-02-24",
    "diningType": "아침",
    "makersCapacity" : 100,
    "leftmakersCapacity" : 80,
    "deadline" : "2023/02/30 18:00:00",
    "clientSchedule" : [
       {
           "pickupTime" : "07:50",
           "clientName" : "달리셔스",
           "clientCapacity" : 20,
           "foodSchedule" : [
                {
                    "presetFoodId" : 9,
                    "foodName" : "음식",
                    "foodStatus" : "판매중",
                    "foodCapacity" : 100,
                    "scheduleStatus" : 2,
                },
                {
                  "presetFoodId" : 10,
                  "foodName" : "음식",
                  "foodStatus" : "판매중",
                  "foodCapacity" : 100,
                  "scheduleStatus" : 2,
              }
           ]
       }
    ]
},
{
  "presetMakersId" : 2,
  "scheduleStatus" : 1,
  "serviceDate" : "2023-02-24",
  "diningType": "아침",
  "makersCapacity" : 100,
  "deadline" : "2023/02/30 18:00:00",
  "clientSchedule" : [
     {
         "pickupTime" : "07:50",
         "clientName" : "달리셔스",
         "clientCapacity" : 20,
         "foodSchedule" : [
              {
                  "presetFoodId" : 1,
                  "foodName" : "음식",
                  "foodStatus" : "판매중",
                  "foodCapacity" : 100,
                  "scheduleStatus" : 0,
              },
              {
                "presetFoodId" : 8,
                "foodName" : "음식",
                "foodStatus" : "판매중",
                "foodCapacity" : 100,
                "scheduleStatus" : 0,
            }
         ]
     }
  ]
},
{
  "presetMakersId" : 3,
  "scheduleStatus" : 0,
  "serviceDate" : "2023-02-24",
  "diningType": "아침",
  "makersCapacity" : 100,
  "deadline" : "2023/02/30 18:00:00",
  "clientSchedule" : [
     {
         "pickupTime" : "07:50",
         "clientName" : "달리셔스",
         "clientCapacity" : 20,
         "foodSchedule" : [
              {
                  "presetFoodId" : 2,
                  "foodName" : "음식",
                  "foodStatus" : "판매중",
                  "foodCapacity" : 100,
                  "scheduleStatus" : 0,
              },
              {
                "presetFoodId" : 3,
                "foodName" : "음식",
                "foodStatus" : "판매중",
                "foodCapacity" : 100,
                "scheduleStatus" : 0,
            },
            {
              "presetFoodId" : 4,
              "foodName" : "음식",
              "foodStatus" : "판매중",
              "foodCapacity" : 100,
              "scheduleStatus" : 0,
          }
         ]
     }
  ]
},
{
  "presetMakersId" : 4,
  "scheduleStatus" : 2,
  "serviceDate" : "2023-02-24",
  "diningType": "아침",
  "makersCapacity" : 100,
  "deadline" : "2023/02/30 18:00:00",
  "clientSchedule" : [
     {
         "pickupTime" : "07:50",
         "clientName" : "달리셔스",
         "clientCapacity" : 20,
         "foodSchedule" : [
              {
                  "presetFoodId" : 5,
                  "foodName" : "음식",
                  "foodStatus" : "판매중",
                  "foodCapacity" : 100,
                  "scheduleStatus" : 0,
              },
              {
                "presetFoodId" : 6,
                "foodName" : "음식",
                "foodStatus" : "판매중",
                "foodCapacity" : 100,
                "scheduleStatus" : 0,
            },
            {
              "presetFoodId" : 7,
              "foodName" : "음식",
              "foodStatus" : "판매중",
              "foodCapacity" : 100,
              "scheduleStatus" : 0,
          }
         ]
     }
  ]
}
];
// 메이커스 정보 페이지
const Plans = () => {
  const {onActive} = useModal();
  const [exelPlan,setExelPlan] = useAtom(exelPlanAtom);
  const [plan,setPlan] = useAtom(planAtom);
  const [startDate, setStartDate] = useState(new Date().setDate(new Date().getDate()+1));
  const recommandData = ()=>{
    setExelPlan();
    setPlan(makersCalendar)
  }
  const [count, setCount] = useState(0);


  useEffect(() => {
    setPlan(makersCalendar)
    setCount(
      makersCalendar.map((v, i) => {
        let num = 0;
        v.clientSchedule.map((s, si) => {
          return  s.foodSchedule.map((d, di) => {
            return num++;
          });
        });
        return num;
      }),
    );
  }, []);
 
  return (
    <PageWrapper>
      <Wrapper>
        <Button color="blue" content="추천 가져오기" onClick={recommandData} />
      </Wrapper>
      <ContentWrapper>
      <BtnWrapper>
        <DeadLineWrapper>
          <Button color="blue" content="식사요청" onClick={onActive} />
          {/* <Button color="grey" content="2023-02-20" icon="calendar" onClick={onActive} /> */}
          <DatePickerBox>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              timeInputLabel="Time:"
              dateFormat="yyyy-MM-dd aa h:mm"
              showTimeInput
              customInput={<SelectDatePicker />}
            />
          </DatePickerBox>
        </DeadLineWrapper>
      </BtnWrapper>

      <BtnWrapper>
        <Button color="blue" content="식단 완료" onClick={onActive} />
      </BtnWrapper>
      </ContentWrapper>
      {exelPlan && <PlanExelTable plan={exelPlan}/>}
      {plan && <PlanTable count={count} testData={plan} setTestData={setPlan} />}
    </PageWrapper>
  );
};

export default Plans;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const DeadLineWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 400px;
`
const DatePickerBox = styled.div`
  display: flex;
  align-items: center;
  width: 200px;
  cursor:pointer;
  justify-content: space-between;
`
const Wrapper = styled.div`
  margin-bottom: 10px;
`