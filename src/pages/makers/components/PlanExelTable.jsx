import React, { useEffect, useState } from "react";
import { Button, Table,Dropdown } from "semantic-ui-react";
import styled from "styled-components";
import { TableWrapper } from "../../../style/common.style";
import { formattedTime, formattedWeekDate } from "../../../utils/dateFormatter";
const foodStatusData = [
    {
        key: "판매 대기",
        text: "판매 대기",
        value: "판매 대기",
    },
    {
        key: "판매중",
        text: "판매중",
        value: "판매중",
    },
    {
        key: "품절",
        text: "품절",
        value: "품절",
    },
    {
        key: "취소불가품",
        text: "취소불가품",
        value: "취소불가품",
    },
    {
        key: "판매 중지",
        text: "판매 중지",
        value: "판매 중지",
    },
    
    
    
    
     
]
const PlanExelTable = ({plan})=>{
  const [key, setKey] = useState();
  useEffect(() => {
     if (plan) setKey(Object.keys(plan[0]));
   }, [plan]);
    return(
        <TableWrapper>
        <Table celled>
          {plan.map((p, i) => {
                console.log(p)
              const HeaderData = Object.values(p);
              if (i === 0) {
                return (
                  <Table.Header key={p.makersName + i}>
                    <Table.Row>
                      {HeaderData.map((h, i) => {
                        return (
                          <Table.HeaderCell key={h + i}>{h}</Table.HeaderCell>
                        );
                      })}
                    </Table.Row>
                  </Table.Header>
                );
              } else {
                return (
                  <Table.Body key={p.makersName + i}>
                    <Table.Row>
                      {key &&
                        key.map((k, i) => {
                          if(k === "serviceDate"){
                              return(
                                <Table.Cell key={k + i}>
                                <FlexBox>{formattedWeekDate(p[k])}</FlexBox>
                              </Table.Cell>
                              )
                          }
                          if(k === "pickupTime"){
                              return(
                                <Table.Cell key={k + i}>
                                <FlexBox>{formattedTime(p[k])}</FlexBox>
                              </Table.Cell>
                              )
                          }
                          if(k.includes("scheduleStatus")){
                            return(
                                <Table.Cell key={k + i}>
                                     <Button
                                        toggle
                                        color={ p[k] === "대기"? "grey": p[k] === "승인" ? "green":"red" }
                                        //   onClick={()=>{setTestData(testData.map((makers)=>{
                                        //     return {...makers ,clientSchedule:makers.clientSchedule.map((client)=>{
                                        //       return {...client,foodSchedule:client.foodSchedule.map((food)=>{
                                        //         if(food.presetFoodId === d.presetFoodId){
                                        //             return {...food,scheduleStatus:d.scheduleStatus === 0? 1:d.scheduleStatus===1 ? 2:0}
                                        //         }
                                        //         return food;
                                        //       })}
                                        //     })}
                                        // }))}}
                                        >
                                        {p[k]}
                                    </Button>                            
                              </Table.Cell>
                              )
                           
                          }
                          if(k==="foodStatus"){
                            return(
                                <Table.Cell key={k + i}>
                                    <DropdownBox>
                                    <Dropdown item text={foodStatusData.filter((v)=>v.text ===p[k])[0].value}>
                                        <Dropdown.Menu>
                                            {foodStatusData?.map(b => (
                                            <Dropdown.Item
                                                key={`${b.key}`}>
                                                {b.text}
                                            </Dropdown.Item>
                                            ))}
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    {/* <Dropdown
                                        placeholder='판매상태'
                                        fluid
                                        selection
                                        defaultValue={foodStatusData.filter((v)=>v.text ===p[k])[0].value}
                                        options={foodStatusData}
                                    />            */}
                                    </DropdownBox> 
                              </Table.Cell>
                              )
                           
                          }
                          return (
                            
                            <Table.Cell key={k + i}>
                              <FlexBox>{p[k]}</FlexBox>
                            </Table.Cell>
                          );
                        })}
                    </Table.Row>
                  </Table.Body>
                );
              }
            })}
        </Table>
      </TableWrapper>
    )
}

export default PlanExelTable

const FlexBox = styled.div`
  display: flex;
  white-space: nowrap;
`;

const DropdownBox = styled.div`
    width: 150px;
`;