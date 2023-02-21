import {useAtom} from 'jotai';
import React, {useEffect, useState} from 'react';
import {Button, Table, Dropdown} from 'semantic-ui-react';
import styled from 'styled-components';
import {TableWrapper} from '../../../style/common.style';
import {formattedTime, formattedWeekDate} from '../../../utils/dateFormatter';
import {
  foodStatusData,
  scheduleFormatted,
  scheduleFormatted2,
} from '../../../utils/statusFormatter';
import {exelPlanAtom} from '../../../utils/store';

const PlanExelTable = ({plan, selectMakers, selectDiningStatus}) => {
  const [key, setKey] = useState();
  const [exelPlan, setExelPlan] = useAtom(exelPlanAtom);
  useEffect(() => {
    if (plan) setKey(Object.keys(plan[0]));
  }, [plan]);
  return (
    <TableWrapper>
      <Table celled>
        {plan.map((p, i) => {
          const HeaderData = Object.values(p);
          if (i === 0) {
            return (
              <Table.Header key={p.makersName + i}>
                <Table.Row>
                  {HeaderData.map((h, i) => {
                    return <Table.HeaderCell key={h + i}>{h}</Table.HeaderCell>;
                  })}
                </Table.Row>
              </Table.Header>
            );
          } else {
            if (
              (selectMakers.length === 0 ||
                selectMakers.includes(p.makersName)) &&
              (selectDiningStatus.length === 0 ||
                selectDiningStatus.includes(p.scheduleStatus) ||
                selectDiningStatus.includes(
                  scheduleFormatted2(p.scheduleStatus),
                ))
            ) {
              return (
                <Table.Body key={p.makersName + i}>
                  <Table.Row>
                    {key &&
                      key.map((k, kid) => {
                        if (k === 'serviceDate') {
                          return (
                            <Table.Cell key={k + kid}>
                              <FlexBox>{formattedWeekDate(p[k])}</FlexBox>
                            </Table.Cell>
                          );
                        }
                        if (k === 'pickupTime') {
                          return (
                            <Table.Cell key={k + kid}>
                              <FlexBox>{formattedTime(p[k])}</FlexBox>
                            </Table.Cell>
                          );
                        }
                        if (k.includes('scheduleStatus')) {
                          return (
                            <Table.Cell key={k + kid}>
                              <Button
                                toggle
                                color={
                                  p[k] === '대기'
                                    ? 'grey'
                                    : p[k] === '승인'
                                    ? 'green'
                                    : 'red'
                                }>
                                {p[k]}
                              </Button>
                            </Table.Cell>
                          );
                        }
                        if (k === 'foodStatus') {
                          console.log(exelPlan);
                          return (
                            <Table.Cell key={k + kid}>
                              <DropdownBox>
                                {/* <Dropdown
                                item
                                text={
                                  foodStatusData.filter(v => v.text === p[k])[0]
                                    .value
                                }>
                                <Dropdown.Menu>
                                  {foodStatusData?.map(b => (
                                    <Dropdown.Item
                                      key={`${b.key}`}
                                      onClick={() => {
                                        
                                      }}>
                                      {b.text}
                                    </Dropdown.Item>
                                  ))}
                                </Dropdown.Menu>
                              </Dropdown> */}
                                <Dropdown
                                  placeholder="판매상태"
                                  fluid
                                  selection
                                  defaultValue={
                                    foodStatusData.filter(
                                      v => v.text === p[k],
                                    )[0].value
                                  }
                                  options={foodStatusData}
                                  onChange={(e, data) => {
                                    setExelPlan(
                                      exelPlan.map((plan, pid) => {
                                        if (pid === i) {
                                          return {
                                            ...plan,
                                            foodStatus: data.value,
                                          };
                                        }
                                        return plan;
                                      }),
                                    );
                                  }}
                                />
                              </DropdownBox>
                            </Table.Cell>
                          );
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
          }
        })}
      </Table>
    </TableWrapper>
  );
};

export default PlanExelTable;

const FlexBox = styled.div`
  display: flex;
  white-space: nowrap;
`;

const DropdownBox = styled.div`
  width: 150px;
`;
