import {useAtom} from 'jotai';
import React, {useEffect, useState} from 'react';
import {Button, Table, Dropdown} from 'semantic-ui-react';
import styled from 'styled-components';
import {TableWrapper} from '../../../style/common.style';
import {formattedTime, formattedWeekDate} from '../../../utils/dateFormatter';
import {
  foodCompleteStatusData,
  scheduleFormatted,
  scheduleFormatted2,
} from '../../../utils/statusFormatter';
import {exelCompletePlanAtom, exelPlanAtom} from '../../../utils/store';

const PlanExelTable = () => {
  const [key, setKey] = useState();
  const [exelPlan, setExelPlan] = useAtom(exelCompletePlanAtom);
  useEffect(() => {
    if (exelPlan) setKey(Object.keys(exelPlan[0]));
  }, [exelPlan]);
  return (
    <TableWrapper>
      <Table celled>
        {exelPlan.map((p, i) => {
          console.log(p);
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
                      if (k === 'dailyFoodStatus') {
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
                                  foodCompleteStatusData.filter(
                                    v => v.value === p[k],
                                  )[0].value
                                }
                                options={foodCompleteStatusData}
                                onChange={(e, data) => {
                                  setExelPlan(
                                    exelPlan.map((plan, pid) => {
                                      if (pid === i) {
                                        return {
                                          ...plan,
                                          dailyFoodStatus: data.value,
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
